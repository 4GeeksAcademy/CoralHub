
from app import app
from api.models import db, Product


products = [

    Product(
        seller_id=5,
        name="Holy Grail Torch Coral",
        description="Ultra rare torch coral with gold and green coloration.",
        price=349.99,
        stock=5,
        image_url="https://topshelfaquatics.com/cdn/shop/files/top-shelf-aquatics-tsa-holy-grail-cotton-candy-torch-coral-1207511940.jpg?v=1763575318&width=832",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=5,
        name="Rainbow Hammer Coral",
        description="Beautiful rainbow hammer coral perfect for reef tanks.",
        price=529.99,
        stock=4,
        image_url="https://candycorals.ca/cdn/shop/files/Hammer_01_copy.png?v=1721855686&width=832",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=5,
        name="Dragon Soul Favia",
        description="Bright orange and green favia coral with intense colors.",
        price=89.99,
        stock=5,
        image_url="https://tidalgardens.com/media/catalog/product/9/8/9841-stock.jpg?width=1250&height=1000&store=default&image-type=image",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=5,
        name="Miami Hurricane Chalice",
        description="Collector chalice coral with neon orange eyes.",
        price=559.99,
        stock=5,
        image_url="https://topshelfaquatics.com/cdn/shop/files/top-shelf-aquatics-jf-my-miami-chalice-coral-1197002893.jpg?v=1760045995&width=832",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=5,
        name="Utter Chaos Zoanthids",
        description="Popular zoanthids with vibrant orange patterns.",
        price=69.99,
        stock=50,
        image_url="https://zoanthids.com/cdn/shop/files/Utter-Chaos-Zoanthids_9edea627-e2d1-4640-95c3-c3a2a16fcc74.jpg?v=1695920844&width=600",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=5,
        name="Purple Stylophora",
        description="Hardy SPS coral ideal for established reef aquariums.",
        price=79.99,
        stock=3,
        image_url="https://vividaquariums.com/cdn/shop/products/PurpleStylophora_82392800-8fc2-4145-b013-c2532cf0db70_896x896.jpg?v=1647120818",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=5,
        name="Green Star Polyps",
        description="Easy beginner coral with bright green movement.",
        price=39.99,
        stock=8,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL77f__4y60y7YZE_E2eq3qpNeD3v-Oyw9yQ&s",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=5,
        name="Jawbreaker Mushroom",
        description="High-end mushroom coral with unique coloration.",
        price=599.99,
        stock=5,
        image_url="https://zeeaquarium-winkel.nl/content/Products/discosoma-eclectus-jawbreaker-mastergrade-148592585.png",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=5,
        name="Acan Lord Colony",
        description="Colorful acan coral colony with multiple heads.",
        price=519.99,
        stock=5,
        image_url="https://cdn.shopify.com/s/files/1/0095/4993/8784/files/Acan_Brain_LPS_Coral_Acanthastrea_echinata_d8833f91-0683-48ef-b6fd-a594633771eb.jpg?v=1664453185",
        status="active",
        category="Corals"
    )

]

with app.app_context():

    Product.query.delete()
    db.session.commit()

    db.session.bulk_save_objects(products)
    db.session.commit()

    print("Products updated successfully!")