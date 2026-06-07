"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from sqlalchemy import or_
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Review, CartItem, Order, OrderItem, SupportTicket, Claim, Favorite, Message
from api.utils import generate_sitemap, APIException
from sqlalchemy import func

from flask_cors import CORS

import os
from pathlib import Path
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import stripe
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash
from datetime import datetime


from datetime import datetime, timedelta, timezone

# Cargar el archivo .env desde la raíz del proyecto.
# routes.py está en src/api/routes.py, por eso subimos 2 niveles.
BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env", override=True)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
)

# Configurar Stripe con la secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


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

    query = request.args.get("q", "").strip()

    products = Product.query.filter(
        or_(
            Product.name.ilike(f"%{query}%"),
            Product.description.ilike(f"%{query}%"),
            Product.category.ilike(f"%{query}%")
        ),
        Product.status == "active"
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


@api.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    current_user_id = int(get_jwt_identity())

    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"}), 404

    if product.seller_id != current_user_id:
        return jsonify({"error": "Unauthorized"}), 403

    body = request.get_json()

    product.name = body.get("name", product.name)
    product.description = body.get("description", product.description)
    product.price = float(body.get("price", product.price))
    product.stock = int(body.get("stock", product.stock))
    product.image_url = body.get("image_url", product.image_url)
    product.category = body.get("category", product.category)

    db.session.commit()

    return jsonify(product.serialize()), 200


@api.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):

    current_user_id = int(get_jwt_identity())

    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"}), 404

    if product.seller_id != current_user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(product)
    db.session.commit()

    return jsonify({
        "message": "Product deleted successfully"
    }), 200


# ============================================
# AUTENTICACIÓN
# ============================================

@api.route('/signup', methods=['POST'])
def signup():

    body = request.get_json()

    # VALIDATE BODY
    if not body:
        return jsonify({
            "message": "Request body is required"
        }), 400

    first_name = body.get("first_name")
    last_name = body.get("last_name")
    email = body.get("email")
    password = body.get("password")

    # REQUIRED FIELDS
    if not first_name:
        return jsonify({
            "message": "First name is required"
        }), 400

    if not last_name:
        return jsonify({
            "message": "Last name is required"
        }), 400

    if not email:
        return jsonify({
            "message": "Email is required"
        }), 400

    if not password:
        return jsonify({
            "message": "Password is required"
        }), 400

    # PASSWORD VALIDATION
    if len(password) < 8:
        return jsonify({
            "message": "Password must be at least 8 characters"
        }), 400

    # CHECK IF USER EXISTS
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 400

    # CREATE USER
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
        "user": user.serialize()
    }), 200


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
    body = request.get_json() or {}

    if not stripe.api_key:
        return jsonify({
            "error": f"Stripe secret key is missing. Looking for .env here: {BASE_DIR / '.env'}"
        }), 500

    delivery_method = body.get("delivery_method", "pickup")
    shipping_address = body.get("shipping_address")

    # Validar delivery method
    if delivery_method not in ["pickup", "shipping"]:
        return jsonify({"error": "Invalid delivery method"}), 400

    # Si es shipping, validar que venga la dirección completa
    if delivery_method == "shipping":
        if not shipping_address:
            return jsonify({"error": "Shipping address is required for shipping"}), 400

        required_fields = ["full_name", "street",
                           "city", "state", "zip_code", "country"]
        for field in required_fields:
            if not shipping_address.get(field):
                return jsonify({"error": f"Missing shipping field: {field}"}), 400

    # =====================================================
    # CAMBIO IMPORTANTE:
    # Primero intentamos usar el carrito que viene desde React
    # =====================================================
    frontend_cart = body.get("cart") or body.get(
        "items") or body.get("cartItems") or []

    line_items = []

    # Si React mandó el carrito, usamos ese carrito
    if frontend_cart:
        for item in frontend_cart:
            name = item.get("name") or item.get("title") or "Product"
            description = item.get("description") or "Marine aquarium product"
            price = float(item.get("price", 0))
            quantity = int(item.get("quantity", 1))
            image_url = item.get("image_url") or item.get("image")

            if price <= 0:
                continue

            product_data = {
                "name": name,
                "description": description
            }

            if image_url:
                product_data["images"] = [image_url]

            line_items.append({
                "price_data": {
                    "currency": "usd",
                    "product_data": product_data,
                    "unit_amount": int(price * 100),
                },
                "quantity": quantity,
            })

    # Si React NO mandó carrito, entonces usamos el carrito guardado en la base de datos
    else:
        cart_items = CartItem.query.filter_by(user_id=current_user_id).all()

        if not cart_items:
            return jsonify({"error": "Cart is empty"}), 400

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
                    "unit_amount": int(item.product.price * 100),
                },
                "quantity": item.quantity,
            })

    # Si por alguna razón no hay productos válidos
    if not line_items:
        return jsonify({"error": "Cart is empty"}), 400

    # Si es shipping, agregar línea adicional de $10
    if delivery_method == "shipping":
        line_items.append({
            "price_data": {
                "currency": "usd",
                "product_data": {
                    "name": "Shipping",
                    "description": "Standard shipping 3-5 business days",
                },
                "unit_amount": 1000,
            },
            "quantity": 1,
        })

    try:
        frontend_url = os.getenv(
            "FRONTEND_URL", "http://localhost:3000").rstrip("/")

        metadata = {
            "user_id": str(current_user_id),
            "delivery_method": delivery_method
        }

        if delivery_method == "shipping" and shipping_address:
            metadata["shipping_full_name"] = shipping_address.get("full_name", "")[
                :500]
            metadata["shipping_street"] = shipping_address.get("street", "")[
                :500]
            metadata["shipping_city"] = shipping_address.get("city", "")[:500]
            metadata["shipping_state"] = shipping_address.get("state", "")[
                :500]
            metadata["shipping_zip"] = shipping_address.get("zip_code", "")[
                :500]
            metadata["shipping_country"] = shipping_address.get("country", "")[
                :500]
            metadata["shipping_phone"] = shipping_address.get("phone", "")[
                :500]

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url=f"{frontend_url}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{frontend_url}/checkout/cancel",
            metadata=metadata
        )

        return jsonify({
            "url": checkout_session.url,
            "session_id": checkout_session.id
        }), 200

    except stripe.error.StripeError as e:
        return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


# ============================================
# STRIPE WEBHOOK
# ============================================

@api.route('/stripe-webhook', methods=['POST'])
def stripe_webhook():
    """
    Endpoint que recibe notificaciones de Stripe cuando suceden eventos.
    El evento que nos interesa es 'checkout.session.completed' (pago exitoso).
    """
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    webhook_secret = os.environ.get('STRIPE_WEBHOOK_SECRET')

    if not webhook_secret:
        return jsonify({"error": "Webhook secret not configured"}), 500

    # 1. Verificar que el evento viene realmente de Stripe (anti-suplantación)
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )

    except ValueError:
        return jsonify({"error": "Invalid payload"}), 400
    except stripe.error.SignatureVerificationError:
        return jsonify({"error": "Invalid signature"}), 400

    # 2. Manejar el evento de pago completado
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        session_id = session.get('id')

        # Idempotencia: si ya procesamos esta sesión, no la creamos otra vez
        existing_order = Order.query.filter_by(
            stripe_session_id=session_id).first()
        if existing_order:
            print(f"⚠️ Order ya existe para session {session_id}")
            return jsonify({"received": True}), 200

        # Extraer metadata
        metadata = session.get('metadata', {})
        user_id = metadata.get('user_id')
        delivery_method = metadata.get('delivery_method', 'pickup')

        if not user_id:
            print(f"❌ No user_id in session {session_id}")
            return jsonify({"error": "Missing user_id in metadata"}), 400

        # Obtener el total pagado (Stripe lo devuelve en centavos)
        total = session.get('amount_total', 0) / 100

        try:
            # 3. Crear la Order
            new_order = Order(
                buyer_id=int(user_id),
                order_status='paid',
                total=total,
                stripe_session_id=session_id,
                delivery_method=delivery_method
            )

            # Si fue shipping, guardar la dirección
            if delivery_method == 'shipping':
                new_order.shipping_full_name = metadata.get(
                    'shipping_full_name')
                new_order.shipping_street = metadata.get('shipping_street')
                new_order.shipping_city = metadata.get('shipping_city')
                new_order.shipping_state = metadata.get('shipping_state')
                new_order.shipping_zip = metadata.get('shipping_zip')
                new_order.shipping_country = metadata.get('shipping_country')
                new_order.shipping_phone = metadata.get('shipping_phone')

            db.session.add(new_order)
            db.session.flush()  # Para obtener el order.id antes del commit

            # 4. Crear los OrderItems desde el carrito del usuario
            cart_items = CartItem.query.filter_by(user_id=int(user_id)).all()

            for cart_item in cart_items:
                if not cart_item.product:
                    continue

                order_item = OrderItem(
                    order_id=new_order.id,
                    product_id=cart_item.product_id,
                    quantity=cart_item.quantity,
                    unit_price=cart_item.product.price
                )
                db.session.add(order_item)

                # 5. Descontar stock del producto
                cart_item.product.stock -= cart_item.quantity
                if cart_item.product.stock <= 0:
                    cart_item.product.status = 'sold_out'

            # 6. Vaciar el carrito del usuario
            CartItem.query.filter_by(user_id=int(user_id)).delete()

            db.session.commit()
            print(
                f"✅ Order #{new_order.id} created for user {user_id} - ${total}")

        except Exception as e:
            db.session.rollback()
            print(f"❌ Error creating order: {str(e)}")
            return jsonify({"error": f"Database error: {str(e)}"}), 500

    return jsonify({"received": True}), 200


# ============================================
# MIS ÓRDENES (Historial del usuario)
# ============================================

@api.route('/my-orders', methods=['GET'])
@jwt_required()
def get_my_orders():

    current_user_id = int(get_jwt_identity())

    orders = Order.query.filter_by(
        buyer_id=current_user_id
    ).order_by(
        Order.created_at.desc()
    ).all()

    return jsonify([
        order.serialize()
        for order in orders
    ]), 200

# ============================================
# MIS PRODUCTOS (Historial del usuario)
# ============================================


@api.route("/my-products", methods=["GET"])
@jwt_required()
def get_my_products():
    current_user_id = get_jwt_identity()

    products = Product.query.filter_by(
        seller_id=current_user_id
    ).all()

    return jsonify([
        product.serialize()
        for product in products
    ]), 200


# ============================================
# USER DASHBOARD PROFILE
# ============================================

@api.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    if not user:
        return jsonify({
            "msg": "User not found"
        }), 404

    body = request.get_json()

    user.first_name = body.get(
        "first_name",
        user.first_name
    )

    user.last_name = body.get(
        "last_name",
        user.last_name
    )

    user.email = body.get(
        "email",
        user.email
    )

    db.session.commit()

    return jsonify({
        "msg": "Profile updated",
        "user": user.serialize()
    }), 200


@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    if not user:
        return jsonify({
            "msg": "User not found"
        }), 404

    return jsonify(user.serialize()), 200


@api.route("/profile", methods=["DELETE"])
@jwt_required()
def delete_profile():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        "msg": "Account deleted successfully"
    }), 200


# ============================================
# REVIEWS (Reseñas de productos)
# ============================================

@api.route('/products/<int:product_id>/reviews', methods=['GET'])
def get_product_reviews(product_id):
    """
    Devuelve todas las reseñas de un producto, con info del usuario que las hizo.
    """
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    reviews = Review.query.filter_by(product_id=product_id).order_by(
        Review.created_at.desc()).all()

    reviews_data = []
    for review in reviews:
        user = User.query.get(review.user_id)
        reviews_data.append({
            "id": review.id,
            "user_id": review.user_id,
            "user_name": f"{user.first_name} {user.last_name}" if user else "Anonymous",
            "product_id": review.product_id,
            "rating": review.rating,
            "comment": review.comment,
            "created_at": review.created_at.isoformat() if review.created_at else None
        })

    return jsonify(reviews_data), 200


@api.route('/products/<int:product_id>/reviews', methods=['POST'])
@jwt_required()
def create_review(product_id):
    """
    Crea una nueva reseña para un producto.
    Reglas:
    - El usuario debe estar logueado.
    - Debe haber comprado el producto (tener una Order con OrderItem de ese producto).
    - No puede haber reseñado el mismo producto antes.
    """
    current_user_id = get_jwt_identity()
    body = request.get_json() or {}

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    rating = body.get('rating')
    comment = body.get('comment', '').strip()

    if rating is None:
        return jsonify({"error": "Rating is required"}), 400

    try:
        rating = int(rating)
    except (ValueError, TypeError):
        return jsonify({"error": "Rating must be a number"}), 400

    if rating < 1 or rating > 5:
        return jsonify({"error": "Rating must be between 1 and 5"}), 400

    if not comment:
        return jsonify({"error": "Comment is required"}), 400

    if len(comment) > 500:
        return jsonify({"error": "Comment must be 500 characters or less"}), 400

    has_purchased = db.session.query(OrderItem).join(Order).filter(
        Order.buyer_id == current_user_id,
        OrderItem.product_id == product_id,
        Order.order_status == 'paid'
    ).first()

    if not has_purchased:
        return jsonify({"error": "You can only review products you have purchased"}), 403

    existing = Review.query.filter_by(
        user_id=current_user_id,
        product_id=product_id
    ).first()

    if existing:
        return jsonify({"error": "You have already reviewed this product"}), 409

    new_review = Review(
        user_id=current_user_id,
        product_id=product_id,
        rating=rating,
        comment=comment
    )

    db.session.add(new_review)
    db.session.commit()

    user = User.query.get(current_user_id)
    return jsonify({
        "id": new_review.id,
        "user_id": new_review.user_id,
        "user_name": f"{user.first_name} {user.last_name}" if user else "Anonymous",
        "product_id": new_review.product_id,
        "rating": new_review.rating,
        "comment": new_review.comment,
        "created_at": new_review.created_at.isoformat()
    }), 201


@api.route('/reviews/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    """
    Borra una reseña. Solo el dueño de la reseña puede borrarla.
    """
    current_user_id = get_jwt_identity()

    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "Review not found"}), 404

    if review.user_id != current_user_id:
        return jsonify({"error": "You can only delete your own reviews"}), 403

    db.session.delete(review)
    db.session.commit()

    return jsonify({"msg": "Review deleted successfully"}), 200


# ============================================
# SUPPORT TICKETS (Contactar administradores)
# ============================================

@api.route('/support-tickets', methods=['POST'])
@jwt_required()
def create_support_ticket():
    """
    Crea un ticket de soporte. El usuario debe estar logueado.
    Puede ser general (sin order_id) o sobre una orden específica.
    """
    current_user_id = get_jwt_identity()
    body = request.get_json() or {}

    subject = body.get('subject', '').strip()
    message = body.get('message', '').strip()
    order_id = body.get('order_id')

    if not subject:
        return jsonify({"error": "Subject is required"}), 400
    if len(subject) > 200:
        return jsonify({"error": "Subject must be 200 characters or less"}), 400
    if not message:
        return jsonify({"error": "Message is required"}), 400
    if len(message) > 1000:
        return jsonify({"error": "Message must be 1000 characters or less"}), 400

    if order_id:
        order = Order.query.get(order_id)
        if not order:
            return jsonify({"error": "Order not found"}), 404
        if order.buyer_id != int(current_user_id):
            return jsonify({"error": "This order does not belong to you"}), 403

    new_ticket = SupportTicket(
        user_id=current_user_id,
        order_id=order_id if order_id else None,
        subject=subject,
        message=message,
        status="open"
    )

    db.session.add(new_ticket)
    db.session.commit()

    return jsonify(new_ticket.serialize()), 201


@api.route('/support-tickets', methods=['GET'])
@jwt_required()
def get_my_support_tickets():
    """
    Devuelve todos los tickets del usuario logueado, más reciente primero.
    """
    current_user_id = get_jwt_identity()
    tickets = SupportTicket.query.filter_by(user_id=current_user_id).order_by(
        SupportTicket.created_at.desc()).all()

    return jsonify([ticket.serialize() for ticket in tickets]), 200


@api.route('/admin/support-tickets', methods=['GET'])
@jwt_required()
def get_all_support_tickets():
    """
    Devuelve TODOS los tickets de soporte. Solo para admins.
    """
    current_user_id = get_jwt_identity()
    admin_user = User.query.get(current_user_id)

    if not admin_user:
        return jsonify({"error": "User not found"}), 404
    if admin_user.role != "admin":
        return jsonify({"error": "Access denied. Admins only."}), 403

    tickets = SupportTicket.query.order_by(
        SupportTicket.created_at.desc()).all()

    result = []
    for ticket in tickets:
        ticket_data = ticket.serialize()
        user = User.query.get(ticket.user_id)
        ticket_data["user_name"] = f"{user.first_name} {user.last_name}" if user else "Unknown"
        ticket_data["user_email"] = user.email if user else None
        result.append(ticket_data)

    return jsonify(result), 200


@api.route('/admin/support-tickets/<int:ticket_id>', methods=['PUT'])
@jwt_required()
def respond_support_ticket(ticket_id):
    """
    El admin responde un ticket y/o cambia su estado. Solo para admins.
    """
    current_user_id = get_jwt_identity()
    admin_user = User.query.get(current_user_id)

    if not admin_user:
        return jsonify({"error": "User not found"}), 404
    if admin_user.role != "admin":
        return jsonify({"error": "Access denied. Admins only."}), 403

    ticket = SupportTicket.query.get(ticket_id)
    if not ticket:
        return jsonify({"error": "Ticket not found"}), 404

    body = request.get_json() or {}
    admin_response = body.get('admin_response', '').strip()
    status = body.get('status')

    if admin_response:
        if len(admin_response) > 1000:
            return jsonify({"error": "Response must be 1000 characters or less"}), 400
        ticket.admin_response = admin_response
        ticket.responded_at = datetime.utcnow()
        ticket.responded_by = current_user_id
        if not status:
            ticket.status = "closed"

    if status:
        if status not in ["open", "in_progress", "closed"]:
            return jsonify({"error": "Invalid status"}), 400
        ticket.status = status

    db.session.commit()

    return jsonify(ticket.serialize()), 200


# ============================================
# CLAIMS (Reclamos buyer ↔ seller)
# ============================================

@api.route('/claims', methods=['POST'])
@jwt_required()
def create_claim():
    """
    El buyer crea un reclamo sobre un producto que compró (un OrderItem).
    """
    current_user_id = int(get_jwt_identity())
    body = request.get_json() or {}

    order_item_id = body.get('order_item_id')
    subject = body.get('subject', '').strip()
    message = body.get('message', '').strip()

    if not order_item_id:
        return jsonify({"error": "order_item_id is required"}), 400
    if not subject:
        return jsonify({"error": "Subject is required"}), 400
    if len(subject) > 200:
        return jsonify({"error": "Subject must be 200 characters or less"}), 400
    if not message:
        return jsonify({"error": "Message is required"}), 400
    if len(message) > 1000:
        return jsonify({"error": "Message must be 1000 characters or less"}), 400

    order_item = OrderItem.query.get(order_item_id)
    if not order_item:
        return jsonify({"error": "Order item not found"}), 404

    order = Order.query.get(order_item.order_id)
    if not order or order.buyer_id != current_user_id:
        return jsonify({"error": "This purchase does not belong to you"}), 403

    product = order_item.product
    if not product:
        return jsonify({"error": "Product not found for this item"}), 404

    seller_id = product.seller_id

    if seller_id == current_user_id:
        return jsonify({"error": "You cannot file a claim on your own product"}), 400

    new_claim = Claim(
        order_item_id=order_item_id,
        buyer_id=current_user_id,
        seller_id=seller_id,
        subject=subject,
        message=message,
        status="open"
    )

    db.session.add(new_claim)
    db.session.commit()

    return jsonify(new_claim.serialize()), 201


@api.route('/claims/buyer', methods=['GET'])
@jwt_required()
def get_buyer_claims():
    current_user_id = int(get_jwt_identity())
    claims = Claim.query.filter_by(buyer_id=current_user_id).order_by(
        Claim.created_at.desc()).all()

    return jsonify([claim.serialize() for claim in claims]), 200


@api.route('/claims/seller', methods=['GET'])
@jwt_required()
def get_seller_claims():
    current_user_id = int(get_jwt_identity())
    claims = Claim.query.filter_by(seller_id=current_user_id).order_by(
        Claim.created_at.desc()).all()

    return jsonify([claim.serialize() for claim in claims]), 200


@api.route('/claims/<int:claim_id>', methods=['PUT'])
@jwt_required()
def respond_claim(claim_id):
    current_user_id = int(get_jwt_identity())

    claim = Claim.query.get(claim_id)
    if not claim:
        return jsonify({"error": "Claim not found"}), 404

    if claim.seller_id != current_user_id:
        return jsonify({"error": "Access denied. This claim is not addressed to you."}), 403

    body = request.get_json() or {}
    seller_response = body.get('seller_response', '').strip()
    status = body.get('status')

    if seller_response:
        if len(seller_response) > 1000:
            return jsonify({"error": "Response must be 1000 characters or less"}), 400
        claim.seller_response = seller_response
        claim.responded_at = datetime.utcnow()
        if not status:
            claim.status = "responded"

    if status:
        if status not in ["open", "responded", "resolved"]:
            return jsonify({"error": "Invalid status"}), 400
        claim.status = status

    db.session.commit()

    return jsonify(claim.serialize()), 200


# =====================================================================
# ENDPOINTS PARA EL ADMINISTRADOR
# =====================================================================

@api.route('/admin/dashboard-stats', methods=['GET'])
@jwt_required()
def get_admin_stats():
    current_user_id = int(get_jwt_identity())

    user = User.query.get(current_user_id)

    if not user or user.role != 'admin':
        return jsonify({
            "error": "Access denied. Admins only."
        }), 403

    total_users = User.query.count()
    total_products = Product.query.count()
    total_orders = Order.query.count()
    total_tickets = SupportTicket.query.count()

    return jsonify({
        "users_count": total_users,
        "products_count": total_products,
        "orders_count": total_orders,
        "tickets_count": total_tickets
    }), 200

@api.route('/admin/users', methods=['GET'])
@jwt_required()
def admin_get_all_users():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)

    if not user or user.role != 'admin':
        return jsonify({"error": "Access denied. Admins only."}), 403

    users = User.query.all()
    return jsonify([u.serialize() for u in users]), 200


@api.route('/admin/users/<int:user_id>/role', methods=['PUT'])
@jwt_required()
def admin_update_user_role(user_id):
    current_user_id = int(get_jwt_identity())
    admin_user = User.query.get(current_user_id)

    if not admin_user or admin_user.role != 'admin':
        return jsonify({"error": "Access denied. Admins only."}), 403

    user_to_modify = User.query.get(user_id)
    if not user_to_modify:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json() or {}
    new_role = body.get('role')

    if new_role not in ['buyer', 'seller', 'admin']:
        return jsonify({"error": "Invalid role. Must be 'buyer', 'seller', or 'admin'"}), 400

    user_to_modify.role = new_role
    db.session.commit()

    return jsonify({
        "message": f"User {user_to_modify.id} role updated to {new_role}",
        "user": user_to_modify.serialize()
    }), 200


@api.route('/admin/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def admin_delete_user(user_id):
    current_user_id = int(get_jwt_identity())
    admin_user = User.query.get(current_user_id)

    if not admin_user or admin_user.role != 'admin':
        return jsonify({"error": "Access denied. Admins only."}), 403

    if current_user_id == user_id:
        return jsonify({"error": "You cannot delete your own admin account."}), 400

    user_to_delete = User.query.get(user_id)
    if not user_to_delete:
        return jsonify({"error": "User not found"}), 404

    try:
        db.session.delete(user_to_delete)
        db.session.commit()
        return jsonify({"message": f"User {user_id} deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": f"Could not delete user. It might be linked to other data. Error: {str(e)}"
        }), 500


# ============================================
# CATEGORIES (Vistas de categorias)
# ============================================

@api.route("/products/category/<string:category>", methods=["GET"])
def get_products_by_category(category):
    products = Product.query.filter(
        func.lower(Product.category) == category.lower()
    ).all()

    return jsonify(
        [product.serialize() for product in products]
    ), 200


# ============================================
# FAVORITES
# ============================================

@api.route("/favorites", methods=["POST"])
@jwt_required()
def add_favorite():
    current_user_id = int(get_jwt_identity())

    body = request.get_json()

    product_id = body.get("product_id")

    if not product_id:
        return jsonify({
            "error": "product_id is required"
        }), 400

    product = Product.query.get(product_id)

    if not product:
        return jsonify({
            "error": "Product not found"
        }), 404

    existing = Favorite.query.filter_by(
        user_id=current_user_id,
        product_id=product_id
    ).first()

    if existing:
        return jsonify({
            "msg": "Already in favorites"
        }), 200

    favorite = Favorite(
        user_id=current_user_id,
        product_id=product_id
    )

    db.session.add(favorite)
    db.session.commit()

    return jsonify(
        favorite.serialize()
    ), 201


@api.route("/favorites", methods=["GET"])
@jwt_required()
def get_favorites():
    current_user_id = int(get_jwt_identity())

    favorites = Favorite.query.filter_by(
        user_id=current_user_id
    ).all()

    return jsonify([
        favorite.serialize()
        for favorite in favorites
    ]), 200


@api.route("/favorites/<int:product_id>", methods=["DELETE"])
@jwt_required()
def remove_favorite(product_id):
    current_user_id = int(get_jwt_identity())

    favorite = Favorite.query.filter_by(
        user_id=current_user_id,
        product_id=product_id
    ).first()

    if not favorite:
        return jsonify({
            "error": "Favorite not found"
        }), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({
        "msg": "Favorite removed"
    }), 200


@api.route("/favorites/top", methods=["GET"])
def top_favorites():
    results = db.session.query(
        Product,
        func.count(Favorite.id).label("favorites_count")
    )\
        .join(Favorite, Favorite.product_id == Product.id)\
        .group_by(Product.id)\
        .order_by(func.count(Favorite.id).desc())\
        .limit(4)\
        .all()

    response = []

    for product, favorites_count in results:
        product_data = product.serialize()
        product_data["favorites_count"] = favorites_count
        response.append(product_data)

    return jsonify(response), 200


@api.route("/favorites/all", methods=["GET"])
def all_favorites():
    results = db.session.query(
        Product,
        func.count(Favorite.id).label("favorites_count")
    )\
        .join(Favorite, Favorite.product_id == Product.id)\
        .group_by(Product.id)\
        .order_by(func.count(Favorite.id).desc())\
        .all()

    response = []

    for product, favorites_count in results:
        product_data = product.serialize()
        product_data["favorites_count"] = favorites_count
        response.append(product_data)

    return jsonify(response), 200
# =================================================================
# ENDPOINT: SOLICITAR CÓDIGO DE RECUPERACIÓN
# =================================================================


@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    body = request.get_json()
    email = body.get("email")

    if not email:
        return jsonify({"message": "El email es requerido"}), 400

    user = User.query.filter_by(email=email).first()

    # Por seguridad, si el email no existe, devolvemos el mismo mensaje de éxito.
    # Así evitamos que atacantes comprueben qué correos están registrados.
    if not user:
        return jsonify({"message": "Si el correo existe, hemos enviado un código a tu correo."}), 200

    # Generar un código de 6 dígitos aleatorio
    code = f"{random.randint(100000, 999999)}"

    # Guardar en base de datos con expiración de 15 minutos
    user.reset_code = code
    user.reset_code_expires = datetime.utcnow() + timedelta(minutes=15)
    db.session.commit()

    # Configuración de Mailtrap desde variables de entorno
    smtp_server = os.environ.get("MAILTRAP_SMTP_SERVER")
    smtp_port = os.environ.get("MAILTRAP_SMTP_PORT")
    smtp_user = os.environ.get("MAILTRAP_SMTP_USER")
    smtp_password = os.environ.get("MAILTRAP_SMTP_PASSWORD")

    # Crear el mensaje de correo electrónico
    msg = MIMEMultipart()
    msg['From'] = 'no-reply@coralhub.com'
    msg['To'] = user.email
    msg['Subject'] = 'Código de Recuperación de Contraseña - CoralHub'

    html_content = f"""
    <html>
        <body>
            <h2>Restablece tu contraseña de CoralHub</h2>
            <p>Hola, {user.first_name}. Has solicitado restablecer tu contraseña.</p>
            <p>Tu código de verificación de 6 dígitos es el siguiente:</p>
            <h1 style="color: #4CAF50; letter-spacing: 5px;">{code}</h1>
            <p>Este código vencerá en 15 minutos.</p>
            <p>Si no solicitaste este cambio, puedes ignorar este correo de manera segura.</p>
        </body>
    </html>
    """
    msg.attach(MIMEText(html_content, 'html'))

    # Enviar el correo usando SMTP
    try:
        with smtplib.SMTP(smtp_server, int(smtp_port)) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(msg['From'], msg['To'], msg.as_string())
    except Exception as e:
        return jsonify({"message": "Error al enviar el correo electrónico.", "error": str(e)}), 500

    return jsonify({"message": "Hemos enviado un código a tu correo."}), 200


# =================================================================
# ENDPOINT: RESTABLECER LA CONTRASEÑA CON EL CÓDIGO
# =================================================================
@api.route('/reset-password', methods=['POST'])
def reset_password():
    body = request.get_json()
    email = body.get("email")
    code = body.get("code")
    new_password = body.get("password")  # El frontend lo manda como 'password'

    if not email or not code or not new_password:
        return jsonify({"message": "Todos los campos son obligatorios"}), 400

    # Buscar usuario que coincida con el email y el código, y cuya expiración sea mayor al tiempo actual
    user = User.query.filter_by(email=email, reset_code=code).first()

    if not user:
        return jsonify({"message": "Código o email inválido."}), 400

    if user.reset_code_expires < datetime.utcnow():
        return jsonify({"message": "El código ha expirado. Solicita uno nuevo."}), 400

    # IMPORTANTE: Asegúrate de que este método de hash sea el mismo que usas al registrar usuarios
    # Si usas bcrypt: user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    # Si usas werkzeug (por defecto en plantillas de 4Geeks):
    user.password = generate_password_hash(new_password)

    # Limpiar los campos del código de recuperación para que no vuelvan a ser utilizados
    user.reset_code = None
    user.reset_code_expires = None

    db.session.commit()

    return jsonify({"message": "Contraseña cambiada con éxito. Redirigiendo al login..."}), 200


@api.route('/create-order-from-session', methods=['POST'])
@jwt_required()
def create_order_from_session():
    current_user_id = int(get_jwt_identity())
    body = request.get_json() or {}

    session_id = body.get("session_id")
    cart = body.get("cart", [])
    delivery_method = body.get("delivery_method", "pickup")
    shipping_address = body.get("shipping_address")

    if not session_id:
        return jsonify({"error": "session_id is required"}), 400

    if not cart:
        return jsonify({"error": "Cart is empty"}), 400

    existing_order = Order.query.filter_by(
        stripe_session_id=session_id
    ).first()

    if existing_order:
        return jsonify(existing_order.serialize()), 200

    try:
        session = stripe.checkout.Session.retrieve(session_id)

        if session.payment_status != "paid":
            return jsonify({"error": "Payment not completed"}), 400

        total = session.amount_total / 100

        new_order = Order(
            buyer_id=current_user_id,
            order_status="paid",
            total=total,
            stripe_session_id=session_id,
            delivery_method=delivery_method
        )

        if delivery_method == "shipping" and shipping_address:
            new_order.shipping_full_name = shipping_address.get("full_name")
            new_order.shipping_street = shipping_address.get("street")
            new_order.shipping_city = shipping_address.get("city")
            new_order.shipping_state = shipping_address.get("state")
            new_order.shipping_zip = shipping_address.get("zip_code")
            new_order.shipping_country = shipping_address.get("country")
            new_order.shipping_phone = shipping_address.get("phone")

        db.session.add(new_order)
        db.session.flush()

        for item in cart:
            product_id = item.get("id")
            quantity = int(item.get("quantity", 1))

            product = Product.query.get(product_id)

            if not product:
                continue

            order_item = OrderItem(
                order_id=new_order.id,
                product_id=product.id,
                quantity=quantity,
                unit_price=product.price
            )

            db.session.add(order_item)

            product.stock -= quantity

            if product.stock <= 0:
                product.status = "sold_out"

        db.session.commit()

        return jsonify(new_order.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": f"Could not create order: {str(e)}"
        }), 500


@api.route("/messages", methods=["POST"])
@jwt_required()
def send_message():
    body = request.get_json()

    sender_id = get_jwt_identity()
    receiver_id = body.get("receiver_id")
    content = body.get("content")

    print("SENDER:", sender_id)
    print("RECEIVER:", receiver_id)
    print("CONTENT:", content)

    if not receiver_id or not content:
        return jsonify({"error": "receiver_id and content are required"}), 400

    new_message = Message(
        sender_id=sender_id,
        receiver_id=receiver_id,
        content=content
    )

    db.session.add(new_message)
    db.session.commit()

    return jsonify(new_message.serialize()), 201


@api.route("/messages/conversations", methods=["GET"])
@jwt_required()
def get_conversations():

    current_user_id = int(get_jwt_identity())

    messages = Message.query.filter(
        db.or_(
            Message.sender_id == current_user_id,
            Message.receiver_id == current_user_id
        )
    ).order_by(
        Message.created_at.desc()
    ).all()

    conversations = {}

    for message in messages:

        other_user = (
            message.receiver
            if message.sender_id == current_user_id
            else message.sender
        )

        if other_user.id not in conversations:

            conversations[other_user.id] = {
                "id": other_user.id,
                "name": f"{other_user.first_name} {other_user.last_name}",
                "last_message": message.content,
                "created_at": message.created_at.isoformat()
            }

    return jsonify(
        list(conversations.values())
    ), 200


@api.route("/messages/<int:user_id>", methods=["GET"])
@jwt_required()
def get_conversation(user_id):

    current_user_id = int(get_jwt_identity())

    unread_messages = Message.query.filter_by(
        sender_id=user_id,
        receiver_id=current_user_id,
        is_read=False
    ).all()

    for message in unread_messages:
        message.is_read = True

    db.session.commit()

    messages = Message.query.filter(
        db.or_(
            db.and_(
                Message.sender_id == current_user_id,
                Message.receiver_id == user_id
            ),
            db.and_(
                Message.sender_id == user_id,
                Message.receiver_id == current_user_id
            )
        )
    ).order_by(
        Message.created_at.asc()
    ).all()

    return jsonify([
        message.serialize()
        for message in messages
    ]), 200


@api.route("/messages/unread-count", methods=["GET"])
@jwt_required()
def get_unread_messages_count():

    current_user_id = int(get_jwt_identity())

    unread_count = Message.query.filter_by(
        receiver_id=current_user_id,
        is_read=False
    ).count()

    return jsonify({
        "unread_count": unread_count
    }), 200


@api.route('/admin/orders', methods=['GET'])
@jwt_required()
def admin_get_orders():

    current_user_id = int(get_jwt_identity())

    admin_user = User.query.get(current_user_id)

    if not admin_user or admin_user.role != 'admin':
        return jsonify({
            "error": "Access denied. Admins only."
        }), 403

    orders = Order.query.order_by(
        Order.created_at.desc()
    ).all()

    return jsonify([
        order.serialize()
        for order in orders
    ]), 200


@api.route('/admin/orders/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def admin_update_order_status(order_id):

    current_user_id = int(get_jwt_identity())

    admin_user = User.query.get(current_user_id)

    if not admin_user or admin_user.role != 'admin':
        return jsonify({
            "error": "Access denied. Admins only."
        }), 403

    order = Order.query.get(order_id)

    if not order:
        return jsonify({
            "error": "Order not found"
        }), 404

    body = request.get_json() or {}

    new_status = body.get("order_status")

    valid_statuses = [
        "pending",
        "paid",
        "shipped",
        "delivered",
        "cancelled"
    ]

    if new_status not in valid_statuses:
        return jsonify({
            "error": "Invalid status"
        }), 400

    order.order_status = new_status

    db.session.commit()

    return jsonify({
        "message": "Order updated successfully",
        "order": order.serialize()
    }), 200
