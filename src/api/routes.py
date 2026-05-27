"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Review, CartItem, Order, OrderItem
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

import os
import cloudinary
import cloudinary.uploader
import stripe

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
)

# Configurar Stripe con la secret key
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


# ============================================
# UPLOAD IMÁGENES (Cloudinary)
# ============================================

@api.route('/upload', methods=['POST'])
def upload_image():
    file = request.files.get("image")

    if not file:
        return jsonify({"error": "the file is required"}), 400

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        result = cloudinary.uploader.upload(file)

        if 'secure_url' not in result:
            return jsonify({"error": "the image can not be uploaded"}), 400

        return jsonify({
            "image_url": result["secure_url"]
        }), 200
    except Exception as e:
        return jsonify({"error": f"Upload error: {str(e)}"}), 500


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }
    return jsonify(response_body), 200


# ============================================
# CATÁLOGO DE PRODUCTOS
# ============================================

@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.filter_by(status="active").all()
    return jsonify([p.serialize() for p in products]), 200


@api.route('/products/search', methods=['GET'])
def search_products():
    query = request.args.get("q", "")
    products = Product.query.filter(
        Product.name.ilike(f"%{query}%")
    ).all()
    return jsonify([product.serialize() for product in products]), 200


@api.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)

    if product is None:
        return jsonify({"error": "Product not found"}), 404

    return jsonify(product.serialize()), 200


@api.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    body = request.get_json()

    if not body:
        return jsonify({"error": "Request body is required"}), 400

    required_fields = ["name", "price", "category"]
    for field in required_fields:
        if field not in body or not body[field]:
            return jsonify({"error": f"'{field}' is required"}), 400

    if not body.get("image_url"):
        return jsonify({"error": "image_url is required"}), 400

    current_user_id = get_jwt_identity()

    try:
        new_product = Product(
            seller_id=current_user_id,
            name=body["name"],
            description=body.get("description"),
            price=float(body["price"]),
            stock=int(body.get("stock", 0)),
            image_url=body.get("image_url"),
            category=body["category"]
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify(new_product.serialize()), 201
    except ValueError as e:
        return jsonify({"error": f"Invalid data type: {str(e)}"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error creating product: {str(e)}"}), 500


# ============================================
# AUTENTICACIÓN
# ============================================

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()

    first_name = body.get("first_name")
    last_name = body.get("last_name")
    email = body.get("email")
    password = body.get("password")

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 400

    hashed_password = generate_password_hash(password)

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully"
    }), 201


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify({"msg": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "token": access_token,
        "user": user.serialize()}), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()

    return jsonify({
        "msg": "Access granted",
        "user_id": current_user_id
    }), 200


# ============================================
# ADMINISTRACIÓN DE USUARIOS
# ============================================

@api.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user_id = get_jwt_identity()
    admin_user = User.query.get(current_user_id)

    if not admin_user:
        return jsonify({"msg": "User not found"}), 404

    if admin_user.role != "admin":
        return jsonify({"msg": "Access denied. Admins only."}), 403

    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


# ============================================
# CART (Carrito de compras)
# ============================================

@api.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    current_user_id = get_jwt_identity()
    items = CartItem.query.filter_by(user_id=current_user_id).all()

    total = sum(item.product.price *
                item.quantity for item in items if item.product)

    return jsonify({
        "items": [item.serialize() for item in items],
        "total": round(total, 2),
        "count": sum(item.quantity for item in items)
    }), 200


@api.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    current_user_id = get_jwt_identity()
    body = request.get_json()

    if not body or 'product_id' not in body:
        return jsonify({"error": "product_id is required"}), 400

    product_id = body['product_id']
    quantity = int(body.get('quantity', 1))

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    if product.status != 'active':
        return jsonify({"error": "Product is not available"}), 400
    if product.stock < quantity:
        return jsonify({"error": f"Only {product.stock} units available"}), 400

    existing = CartItem.query.filter_by(
        user_id=current_user_id,
        product_id=product_id
    ).first()

    if existing:
        new_qty = existing.quantity + quantity
        if new_qty > product.stock:
            return jsonify({"error": f"Only {product.stock} units available"}), 400
        existing.quantity = new_qty
        db.session.commit()
        return jsonify(existing.serialize()), 200

    new_item = CartItem(
        user_id=current_user_id,
        product_id=product_id,
        quantity=quantity
    )
    db.session.add(new_item)
    db.session.commit()

    return jsonify(new_item.serialize()), 201


@api.route('/cart/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    current_user_id = get_jwt_identity()
    body = request.get_json()

    item = CartItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Cart item not found"}), 404
    if item.user_id != current_user_id:
        return jsonify({"error": "Unauthorized"}), 403

    new_quantity = int(body.get('quantity', 1))
    if new_quantity < 1:
        return jsonify({"error": "Quantity must be at least 1"}), 400
    if new_quantity > item.product.stock:
        return jsonify({"error": f"Only {item.product.stock} units available"}), 400

    item.quantity = new_quantity
    db.session.commit()

    return jsonify(item.serialize()), 200


@api.route('/cart/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(item_id):
    current_user_id = get_jwt_identity()

    item = CartItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Cart item not found"}), 404
    if item.user_id != current_user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(item)
    db.session.commit()

    return jsonify({"msg": "Item removed from cart"}), 200


@api.route('/cart', methods=['DELETE'])
@jwt_required()
def clear_cart():
    current_user_id = get_jwt_identity()
    CartItem.query.filter_by(user_id=current_user_id).delete()
    db.session.commit()
    return jsonify({"msg": "Cart cleared"}), 200


# ============================================
# STRIPE CHECKOUT
# ============================================

@api.route('/create-checkout-session', methods=['POST'])
@jwt_required()
def create_checkout_session():
    current_user_id = get_jwt_identity()

    # 1. Obtener los items del carrito del usuario desde la BD
    cart_items = CartItem.query.filter_by(user_id=current_user_id).all()

    if not cart_items:
        return jsonify({"error": "Cart is empty"}), 400

    # 2. Construir la lista de line_items en el formato que Stripe entiende
    line_items = []
    for item in cart_items:
        if not item.product:
            continue

        # Validar stock antes de proceder
        if item.product.stock < item.quantity:
            return jsonify({
                "error": f"Not enough stock for {item.product.name}. Available: {item.product.stock}"
            }), 400

        line_items.append({
            "price_data": {
                "currency": "usd",
                "product_data": {
                    "name": item.product.name,
                    "description": item.product.description or "Marine aquarium product",
                    "images": [item.product.image_url] if item.product.image_url else [],
                },
                # Stripe usa centavos, no dólares (por eso multiplicamos x 100)
                "unit_amount": int(item.product.price * 100),
            },
            "quantity": item.quantity,
        })

    # 3. Crear la sesión de Stripe
    try:
        frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:3000")

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url=f"{frontend_url}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{frontend_url}/checkout/cancel",
            # Guardamos el user_id para identificar al comprador en el webhook
            metadata={
                "user_id": str(current_user_id)
            }
        )

        return jsonify({
            "url": checkout_session.url,
            "session_id": checkout_session.id
        }), 200

    except stripe.error.StripeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500
