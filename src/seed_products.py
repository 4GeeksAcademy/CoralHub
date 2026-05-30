
from app import app
from api.models import db, Product


products = [

    Product(
        seller_id=1,
        name="Holy Grail Torch Coral",
        description="Ultra rare torch coral with gold and green coloration.",
        price=149.99,
        stock=1,
        image_url="https://topshelfaquatics.com/cdn/shop/files/top-shelf-aquatics-tsa-holy-grail-cotton-candy-torch-coral-1207511940.jpg?v=1763575318&width=832",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=1,
        name="Rainbow Hammer Coral",
        description="Beautiful rainbow hammer coral perfect for reef tanks.",
        price=129.99,
        stock=4,
        image_url="https://candycorals.ca/cdn/shop/files/Hammer_01_copy.png?v=1721855686&width=832",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=1,
        name="Dragon Soul Favia",
        description="Bright orange and green favia coral with intense colors.",
        price=89.99,
        stock=1,
        image_url="https://tidalgardens.com/media/catalog/product/9/8/9841-stock.jpg?width=1250&height=1000&store=default&image-type=image",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=1,
        name="Miami Hurricane Chalice",
        description="Collector chalice coral with neon orange eyes.",
        price=159.99,
        stock=1,
        image_url="https://topshelfaquatics.com/cdn/shop/files/top-shelf-aquatics-jf-my-miami-chalice-coral-1197002893.jpg?v=1760045995&width=832",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=1,
        name="Utter Chaos Zoanthids",
        description="Popular zoanthids with vibrant orange patterns.",
        price=69.99,
        stock=10,
        image_url="https://zoanthids.com/cdn/shop/files/Utter-Chaos-Zoanthids_9edea627-e2d1-4640-95c3-c3a2a16fcc74.jpg?v=1695920844&width=600",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=1,
        name="Purple Stylophora",
        description="Hardy SPS coral ideal for established reef aquariums.",
        price=79.99,
        stock=1,
        image_url="https://vividaquariums.com/cdn/shop/products/PurpleStylophora_82392800-8fc2-4145-b013-c2532cf0db70_896x896.jpg?v=1647120818",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=1,
        name="Green Star Polyps",
        description="Easy beginner coral with bright green movement.",
        price=19.99,
        stock=8,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL77f__4y60y7YZE_E2eq3qpNeD3v-Oyw9yQ&s",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=1,
        name="Jawbreaker Mushroom",
        description="High-end mushroom coral with unique coloration.",
        price=199.99,
        stock=1,
        image_url="https://zeeaquarium-winkel.nl/content/Products/discosoma-eclectus-jawbreaker-mastergrade-148592585.png",
        status="active",
        category="Corals"
    ),

    Product(
        seller_id=1,
        name="Acan Lord Colony",
        description="Colorful acan coral colony with multiple heads.",
        price=119.99,
        stock=1,
        image_url="https://cdn.shopify.com/s/files/1/0095/4993/8784/files/Acan_Brain_LPS_Coral_Acanthastrea_echinata_d8833f91-0683-48ef-b6fd-a594633771eb.jpg?v=1664453185",
        status="active",
        category="Corals"
    ),
    # ============================================
    # EQUIPMENT
    # ============================================

    Product(
        seller_id=2,
        name="Nyos Quantum 160",
        description="Premium protein skimmer for reef aquariums.",
        price=399.99,
        stock=2,
        image_url="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=3,
        name="Reef Octopus Classic 150INT",
        description="Reliable internal protein skimmer.",
        price=329.99,
        stock=3,
        image_url="https://images.unsplash.com/photo-1518770660439-4636190af475",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=4,
        name="Ecotech Vectra M2",
        description="High-performance DC return pump.",
        price=449.99,
        stock=2,
        image_url="https://images.unsplash.com/photo-1580894908361-967195033215",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=5,
        name="Sicce Syncra SDC 7.0",
        description="Silent and efficient return pump.",
        price=279.99,
        stock=4,
        image_url="https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=1,
        name="Neptune DOS",
        description="Automated dosing system.",
        price=349.99,
        stock=5,
        image_url="https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=2,
        name="Red Sea ReefDose 4",
        description="Four-head dosing pump.",
        price=299.99,
        stock=3,
        image_url="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=3,
        name="Tunze Osmolator 3155",
        description="Top-off system with optical sensor.",
        price=219.99,
        stock=6,
        image_url="https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=4,
        name="Ecotech MP40 Vortech",
        description="Wireless controllable wave pump.",
        price=429.99,
        stock=4,
        image_url="https://images.unsplash.com/photo-1517841905240-472988babdf9",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=5,
        name="Nero 5 Wave Pump",
        description="Compact and powerful flow pump.",
        price=199.99,
        stock=5,
        image_url="https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        status="active",
        category="Equipment"
    ),

    # ============================================
    # AQUARIUMS
    # ============================================

    Product(
        seller_id=1,
        name="Waterbox 35.2",
        description="Modern rimless reef aquarium.",
        price=799.99,
        stock=1,
        image_url="https://images.unsplash.com/photo-1520637836862-4d197d17c90a",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=2,
        name="Waterbox 50.3",
        description="Elegant reef-ready aquarium.",
        price=1199.99,
        stock=1,
        image_url="https://images.unsplash.com/photo-1571752726703-5e7d1f6a2cc1",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=3,
        name="Waterbox 90.3",
        description="Premium reef system.",
        price=1999.99,
        stock=1,
        image_url="https://images.unsplash.com/photo-1517849845537-4d257902454a",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=4,
        name="Red Sea Reefer 170",
        description="Complete reef-ready aquarium.",
        price=1499.99,
        stock=1,
        image_url="https://images.unsplash.com/photo-1520637736862-4d197d17c90a",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=5,
        name="Red Sea Reefer 250",
        description="Popular reef aquarium system.",
        price=2199.99,
        stock=1,
        image_url="https://images.unsplash.com/photo-1544551763-46a013bb70d5",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=1,
        name="Innovative Marine Fusion 20",
        description="Compact all-in-one aquarium.",
        price=449.99,
        stock=2,
        image_url="https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=2,
        name="Innovative Marine Fusion 40",
        description="Mid-sized all-in-one aquarium.",
        price=699.99,
        stock=2,
        image_url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=3,
        name="CADE Reef 1200",
        description="Luxury reef aquarium system.",
        price=3299.99,
        stock=1,
        image_url="https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=4,
        name="Custom Rimless 120",
        description="Large custom reef aquarium.",
        price=3999.99,
        stock=1,
        image_url="https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        status="active",
        category="Aquariums"
    ),

]

with app.app_context():

    Product.query.delete()
    db.session.commit()

    db.session.bulk_save_objects(products)
    db.session.commit()

    print("Products updated successfully!")
