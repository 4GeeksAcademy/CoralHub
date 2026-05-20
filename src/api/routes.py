"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Review
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }
    return jsonify(response_body), 200


# ============================================
# CATÁLOGO DE PRODUCTOS (User Story Juan)
# ============================================

# Listar TODOS los productos disponibles
@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.filter_by(status="active").all()
    return jsonify([p.serialize() for p in products]), 200


# Obtener UN producto por su ID
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

    current_user_id = get_jwt_identity()

    new_product = Product(
        seller_id=current_user_id,
        name=body["name"],
        description=body.get("description"),
        price=body["price"],
        stock=body.get("stock", 0),
        image_url=body.get("image_url"),
        category=body["category"]
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.serialize()), 201

@api.route('/signup', methods=['POST'])
def signup():

    body = request.get_json()

    first_name = body.get("first_name")
    last_name = body.get("last_name")
    email = body.get("email")
    password = body.get("password")

    # VALIDAR SI EL USUARIO YA EXISTE
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 400

    # HASH PASSWORD
    hashed_password = generate_password_hash(password)

    # CREAR USUARIO
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

    data= request.get_json()

    user= User.query.filter_by(email=data["email"]).first()
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