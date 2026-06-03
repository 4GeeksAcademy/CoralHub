from app import app
from api.models import db, User
from werkzeug.security import generate_password_hash

users = [

    User(
        first_name="Ana",
        last_name="Lopez",
        email="ana@coralhub.com",
        password=generate_password_hash("12345678"),
        role="seller"
    ),

    User(
        first_name="John",
        last_name="Reefer",
        email="john@coralhub.com",
        password=generate_password_hash("12345678"),
        role="seller"
    ),

    User(
        first_name="Juan",
        last_name="Masis",
        email="juan@coralhub.com",
        password=generate_password_hash("12345678"),
        role="seller"
    ),

    User(
        first_name="Pedro",
        last_name="Chavez",
        email="pedro@coralhub.com",
        password=generate_password_hash("12345678"),
        role="seller"
    ),

    User(
        first_name="David",
        last_name="ReefMaster",
        email="david@coralhub.com",
        password=generate_password_hash("12345678"),
        role="seller"
    )

]

with app.app_context():

    existing = User.query.filter(
        User.email.in_([
            "ana@coralhub.com",
            "john@coralhub.com",
            "sarah@coralhub.com",
            "mike@coralhub.com",
            "david@coralhub.com"
        ])
    ).all()

    if not existing:

        db.session.add_all(users)
        db.session.commit()

        print("Users created successfully!")

    else:

        print("Users already exist")