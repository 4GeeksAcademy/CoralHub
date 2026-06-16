from app import app
from api.models import db, User, Product, Order, OrderItem

with app.app_context():

    buyer = User.query.first()

    if not buyer:
        print("No users found")
        exit()

    products = Product.query.limit(5).all()

    if len(products) < 2:
        print("You need at least 2 products")
        exit()

    existing_orders = Order.query.filter_by(buyer_id=buyer.id).count()

    if existing_orders:
        print("Orders already exist")
        exit()

    orders_data = [
        {
            "status": "paid",
            "total": products[0].price,
            "delivery": "pickup"
        },
        {
            "status": "shipped",
            "total": products[1].price * 2,
            "delivery": "shipping"
        },
        {
            "status": "delivered",
            "total": products[2].price,
            "delivery": "shipping"
        }
    ]

    for index, order_data in enumerate(orders_data):

        order = Order(
            buyer_id=buyer.id,
            order_status=order_data["status"],
            total=order_data["total"],
            stripe_session_id=f"demo-session-{index + 1}",
            delivery_method=order_data["delivery"]
        )

        if order_data["delivery"] == "shipping":
            order.shipping_full_name = buyer.first_name + " " + buyer.last_name
            order.shipping_street = "123 Ocean Drive"
            order.shipping_city = "Margate"
            order.shipping_state = "FL"
            order.shipping_zip = "33063"
            order.shipping_country = "United States"
            order.shipping_phone = "(555) 123-4567"

        db.session.add(order)
        db.session.flush()

        product = products[index]

        item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=1 if index != 1 else 2,
            unit_price=product.price
        )

        db.session.add(item)

    db.session.commit()

    print("Demo orders created successfully")