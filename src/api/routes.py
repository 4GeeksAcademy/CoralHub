"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Review, CartItem, Order, OrderItem, SupportTicket, Claim, Favorite
from api.utils import generate_sitemap, APIException
from sqlalchemy import func

from flask_cors import CORS

import os
from pathlib import Path
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import stripe
from datetime import datetime

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
    body = request.get_json() or {}

    # Asegura que Stripe lea la secret key desde el .env
    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

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

    # 1. Obtener los items del carrito del usuario
    cart_items = CartItem.query.filter_by(user_id=current_user_id).all()

    if not cart_items:
        return jsonify({"error": "Cart is empty"}), 400

    # 2. Construir line_items de los productos
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
                "unit_amount": int(item.product.price * 100),
            },
            "quantity": item.quantity,
        })

    # 3. Si es shipping, agregar línea adicional de $10
    if delivery_method == "shipping":
        line_items.append({
            "price_data": {
                "currency": "usd",
                "product_data": {
                    "name": "Shipping",
                    "description": "Standard shipping (3-5 business days)",
                },
                "unit_amount": 1000,  # $10.00 en centavos
            },
            "quantity": 1,
        })

    # 4. Crear sesión de Stripe
    try:
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

        # Preparar metadata (incluye dirección si aplica)
        metadata = {
            "user_id": str(current_user_id),
            "delivery_method": delivery_method
        }

        if delivery_method == "shipping" and shipping_address:
            # Stripe limita cada metadata value a 500 chars
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
    """
    Devuelve todas las órdenes del usuario logueado, ordenadas por más reciente primero.
    """
    current_user_id = get_jwt_identity()
    orders = Order.query.filter_by(buyer_id=current_user_id).order_by(
        Order.created_at.desc()).all()

    return jsonify([order.serialize() for order in orders]), 200

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

    # Serializar incluyendo el nombre del usuario
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

    # Validar producto existe
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Validar campos
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

    # Validar que el usuario haya comprado el producto
    has_purchased = db.session.query(OrderItem).join(Order).filter(
        Order.buyer_id == current_user_id,
        OrderItem.product_id == product_id,
        Order.order_status == 'paid'
    ).first()

    if not has_purchased:
        return jsonify({"error": "You can only review products you have purchased"}), 403

    # Validar que no haya reseñado antes
    existing = Review.query.filter_by(
        user_id=current_user_id,
        product_id=product_id
    ).first()

    if existing:
        return jsonify({"error": "You have already reviewed this product"}), 409

    # Crear la reseña
    new_review = Review(
        user_id=current_user_id,
        product_id=product_id,
        rating=rating,
        comment=comment
    )

    db.session.add(new_review)
    db.session.commit()

    # Devolver con info del usuario
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
    order_id = body.get('order_id')  # opcional

    # Validar campos
    if not subject:
        return jsonify({"error": "Subject is required"}), 400
    if len(subject) > 200:
        return jsonify({"error": "Subject must be 200 characters or less"}), 400
    if not message:
        return jsonify({"error": "Message is required"}), 400
    if len(message) > 1000:
        return jsonify({"error": "Message must be 1000 characters or less"}), 400

    # Si viene order_id, validar que la orden exista y sea del usuario
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

    # Incluir el nombre y email del usuario que creó cada ticket
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

    # Si viene respuesta, guardarla
    if admin_response:
        if len(admin_response) > 1000:
            return jsonify({"error": "Response must be 1000 characters or less"}), 400
        ticket.admin_response = admin_response
        ticket.responded_at = datetime.utcnow()
        ticket.responded_by = current_user_id
        # Si responde y no cambió status manualmente, lo marca como closed
        if not status:
            ticket.status = "closed"

    # Si viene un cambio de estado explícito, aplicarlo
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
    Reglas:
    - El usuario debe estar logueado.
    - El OrderItem debe pertenecer a una orden del buyer.
    - El seller se saca automáticamente del producto.
    """
    current_user_id = int(get_jwt_identity())
    body = request.get_json() or {}

    order_item_id = body.get('order_item_id')
    subject = body.get('subject', '').strip()
    message = body.get('message', '').strip()

    # Validar campos
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

    # Validar que el OrderItem exista
    order_item = OrderItem.query.get(order_item_id)
    if not order_item:
        return jsonify({"error": "Order item not found"}), 404

    # Validar que esa compra sea del buyer logueado
    order = Order.query.get(order_item.order_id)
    if not order or order.buyer_id != current_user_id:
        return jsonify({"error": "This purchase does not belong to you"}), 403

    # Sacar el seller del producto
    product = order_item.product
    if not product:
        return jsonify({"error": "Product not found for this item"}), 404
    seller_id = product.seller_id

    # Evitar que un buyer se reclame a sí mismo (si compró su propio producto)
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
    """
    Devuelve los reclamos que el usuario logueado hizo como buyer.
    """
    current_user_id = int(get_jwt_identity())
    claims = Claim.query.filter_by(buyer_id=current_user_id).order_by(
        Claim.created_at.desc()).all()

    return jsonify([claim.serialize() for claim in claims]), 200


@api.route('/claims/seller', methods=['GET'])
@jwt_required()
def get_seller_claims():
    """
    Devuelve los reclamos que le llegaron al usuario logueado como seller.
    """
    current_user_id = int(get_jwt_identity())
    claims = Claim.query.filter_by(seller_id=current_user_id).order_by(
        Claim.created_at.desc()).all()

    return jsonify([claim.serialize() for claim in claims]), 200


@api.route('/claims/<int:claim_id>', methods=['PUT'])
@jwt_required()
def respond_claim(claim_id):
    """
    El seller responde un reclamo y/o cambia su estado.
    Solo el seller dueño del reclamo puede responder.
    """
    current_user_id = int(get_jwt_identity())

    claim = Claim.query.get(claim_id)
    if not claim:
        return jsonify({"error": "Claim not found"}), 404

    # Solo el seller al que va dirigido el reclamo puede responder
    if claim.seller_id != current_user_id:
        return jsonify({"error": "Access denied. This claim is not addressed to you."}), 403

    body = request.get_json() or {}
    seller_response = body.get('seller_response', '').strip()
    status = body.get('status')

    # Si viene respuesta, guardarla
    if seller_response:
        if len(seller_response) > 1000:
            return jsonify({"error": "Response must be 1000 characters or less"}), 400
        claim.seller_response = seller_response
        claim.responded_at = datetime.utcnow()
        # Si responde y no cambió status manualmente, lo marca como responded
        if not status:
            claim.status = "responded"

    # Si viene un cambio de estado explícito, aplicarlo
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
    """
    Devuelve métricas globales para el dashboard de administrador.
    """
    current_user_id = int(get_jwt_identity())
    # Verificar si el usuario actual es administrador
    user = User.query.get(current_user_id)
    if not user or user.role != 'admin':
        return jsonify({"error": "Access denied. Admins only."}), 403

    # Obtener conteos totales de tus modelos
    total_users = User.query.count()
    total_products = Product.query.count()
    # Si tienes un modelo de Órdenes/Orders, descomenta y ajusta la siguiente línea:
    # total_orders = Order.query.count()
    total_orders = 0  # Temporal si no tienes el modelo mapeado aún

    return jsonify({
        "users_count": total_users,
        "products_count": total_products,
        "orders_count": total_orders
    }), 200


@api.route('/admin/users', methods=['GET'])
@jwt_required()
def admin_get_all_users():
    """
    Devuelve la lista de todos los usuarios para poder gestionar sus roles.
    """
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    if not user or user.role != 'admin':
        return jsonify({"error": "Access denied. Admins only."}), 403

    users = User.query.all()
    return jsonify([u.serialize() for u in users]), 200


@api.route('/admin/users/<int:user_id>/role', methods=['PUT'])
@jwt_required()
def admin_update_user_role(user_id):
    """
    Modifica el rol de un usuario específico (ej: cambiar de 'buyer' o 'seller' a 'admin').
    """
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

    return jsonify({"message": f"User {user_to_modify.id} role updated to {new_role}", "user": user_to_modify.serialize()}), 200

# DELETE USER


@api.route('/admin/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def admin_delete_user(user_id):
    """
    Elimina un usuario de la base de datos de forma permanente.
    """
    current_user_id = int(get_jwt_identity())
    admin_user = User.query.get(current_user_id)

    # 1. Verificar si es administrador
    if not admin_user or admin_user.role != 'admin':
        return jsonify({"error": "Access denied. Admins only."}), 403

    # 2. Evitar que se elimine a sí mismo
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
        return jsonify({"error": f"Could not delete user. It might be linked to other data. Error: {str(e)}"}), 500
# ============================================
# CATEGORIES (Vistas de categorias)
# ============================================

from sqlalchemy import func

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