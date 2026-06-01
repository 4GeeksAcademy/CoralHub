from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


# ============================================
# USERS
# ============================================
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="buyer")  # buyer / seller / admin
    is_active = db.Column(db.Boolean(), default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # 🚀 RELACIONES CON BORRADO EN CASCADA AGREGADO 🚀
    # Al eliminar al usuario, se eliminan automáticamente todos sus registros dependientes
    products = db.relationship("Product", back_populates="seller", cascade="all, delete-orphan")
    orders = db.relationship("Order", backref="buyer", lazy=True, cascade="all, delete-orphan")
    cart_items = db.relationship("CartItem", backref="user", lazy=True, cascade="all, delete-orphan")
    favorites = db.relationship("Favorite", backref="user", lazy=True, cascade="all, delete-orphan")
    reviews = db.relationship("Review", backref="user", lazy=True, cascade="all, delete-orphan")
    
    tickets = db.relationship(
        "SupportTicket",
        backref="user",
        lazy=True,
        foreign_keys="SupportTicket.user_id",
        cascade="all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "role": self.role,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


# ============================================
# PRODUCTS
# ============================================
class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500))
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False, default=0)
    image_url = db.Column(db.String(300))
    # active / inactive / sold_out
    status = db.Column(db.String(20), default="active")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    category = db.Column(db.String(50), nullable=False)

    seller = db.relationship("User", back_populates="products")

    def serialize(self):
        review_list = [r.serialize() for r in self.reviews]

        avg_rating = (
            sum(r["rating"] for r in review_list) / len(review_list)
            if review_list else 0
        )
        

        return {
            "id": self.id,
            "seller_id": self.seller_id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "stock": self.stock,
            "image_url": self.image_url,
            "status": self.status,
            "reviews": review_list,
            "rating_average": round(avg_rating, 1),
            "reviews_count": len(review_list),
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "category": self.category,
            "seller_name": f"{self.seller.first_name} {self.seller.last_name}",
        }


# ============================================
# ORDERS
# ============================================
class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # pending / paid / shipped / delivered / cancelled
    order_status = db.Column(db.String(20), default="pending")
    total = db.Column(db.Float, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Stripe
    stripe_session_id = db.Column(db.String(255), unique=True)

    # Delivery
    delivery_method = db.Column(
        db.String(20), default="pickup")  # pickup / shipping
    shipping_full_name = db.Column(db.String(120))
    shipping_street = db.Column(db.String(200))
    shipping_city = db.Column(db.String(100))
    shipping_state = db.Column(db.String(100))
    shipping_zip = db.Column(db.String(20))
    shipping_country = db.Column(db.String(100))
    shipping_phone = db.Column(db.String(50))

    # También agregamos cascada a los elementos de una orden si la orden llega a borrarse
    items = db.relationship("OrderItem", backref="order", lazy=True, cascade="all, delete-orphan")
    tickets = db.relationship("SupportTicket", backref="order", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "buyer_id": self.buyer_id,
            "order_status": self.order_status,
            "total": self.total,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "stripe_session_id": self.stripe_session_id,
            "delivery_method": self.delivery_method,
            "shipping_address": {
                "full_name": self.shipping_full_name,
                "street": self.shipping_street,
                "city": self.shipping_city,
                "state": self.shipping_state,
                "zip_code": self.shipping_zip,
                "country": self.shipping_country,
                "phone": self.shipping_phone
            } if self.delivery_method == "shipping" else None,
            "items": [item.serialize() for item in self.items]
        }


# ============================================
# ORDER ITEMS
# ============================================
class OrderItem(db.Model):
    __tablename__ = "order_items"
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(
        "orders.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        "products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    unit_price = db.Column(db.Float, nullable=False)

    product = db.relationship("Product", backref="order_items", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "unit_price": self.unit_price,
            "product": self.product.serialize() if self.product else None
        }


# ============================================
# CART ITEMS
# ============================================
class CartItem(db.Model):
    __tablename__ = "cart_items"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        "products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    product = db.relationship("Product", backref="cart_items", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "product": self.product.serialize() if self.product else None
        }


# ============================================
# FAVORITES
# ============================================
class Favorite(db.Model):
    __tablename__ = "favorites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        "products.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    product = db.relationship("Product", backref="favorited_by", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "product": self.product.serialize() if self.product else None
        }


# ============================================
# REVIEWS
# ============================================
class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        "products.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # 1-5
    comment = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    product = db.relationship("Product", backref="reviews", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "rating": self.rating,
            "comment": self.comment,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


# ============================================
# SUPPORT TICKETS
# ============================================
class SupportTicket(db.Model):
    __tablename__ = "support_tickets"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.String(1000), nullable=False)
    # open / in_progress / closed
    status = db.Column(db.String(20), default="open")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Admin response
    admin_response = db.Column(db.String(1000))
    responded_at = db.Column(db.DateTime)
    responded_by = db.Column(db.Integer, db.ForeignKey("users.id"))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "order_id": self.order_id,
            "subject": self.subject,
            "message": self.message,
            "status": self.status,
            "admin_response": self.admin_response,
            "responded_at": self.responded_at.isoformat() if self.responded_at else None,
            "responded_by": self.responded_by,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


# ============================================
# CLAIMS (Buyer ↔ Seller disputes)
# ============================================
class Claim(db.Model):
    __tablename__ = "claims"
    id = db.Column(db.Integer, primary_key=True)

    order_item_id = db.Column(
        db.Integer, db.ForeignKey("order_items.id"), nullable=False)
    buyer_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    seller_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)

    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.String(1000), nullable=False)

    # open / responded / resolved
    status = db.Column(db.String(20), default="open")

    seller_response = db.Column(db.String(1000))
    responded_at = db.Column(db.DateTime)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relaciones
    order_item = db.relationship("OrderItem", backref="claims", lazy=True)
    buyer = db.relationship("User", foreign_keys=[buyer_id], lazy=True)
    seller = db.relationship("User", foreign_keys=[seller_id], lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "order_item_id": self.order_item_id,
            "buyer_id": self.buyer_id,
            "seller_id": self.seller_id,
            "subject": self.subject,
            "message": self.message,
            "status": self.status,
            "seller_response": self.seller_response,
            "responded_at": self.responded_at.isoformat() if self.responded_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "product_name": self.order_item.product.name if self.order_item and self.order_item.product else None,
            "buyer_name": f"{self.buyer.first_name} {self.buyer.last_name}" if self.buyer else None,
            "seller_name": f"{self.seller.first_name} {self.seller.last_name}" if self.seller else None
        }