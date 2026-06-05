

from app import app
from api.models import db, Product, Favorite


    # ============================================
    # CORALS
    # ============================================
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
        image_url="https://cdn11.bigcommerce.com/s-fh5tkm/images/stencil/800x800/products/14946/69649/Quantum_EQ_Homepage_680x893px_PNG__48097.1763135810.jpg?c=2",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=3,
        name="Reef Octopus Classic 150INT",
        description="Reliable internal protein skimmer.",
        price=329.99,
        stock=3,
        image_url="https://cdn.shopify.com/s/files/1/0783/0873/7322/files/reef-octopus-classic-150int-6-internal-protein-skimmer-reef-octopus-1146288815.jpg?v=1743552122&width=1500",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=4,
        name="Ecotech Vectra M2",
        description="High-performance DC return pump.",
        price=449.99,
        stock=2,
        image_url="https://www.oceanworldaquariums.com/wp-content/uploads/2023/04/B3227840-AF26-420B-AC4E-AFD12D39A11B_1_102_o.jpeg",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=5,
        name="Sicce Syncra SDC 7.0",
        description="Silent and efficient return pump.",
        price=279.99,
        stock=4,
        image_url="https://topshelfaquatics.com/cdn/shop/files/sicce-syncra-adv-7-0-water-pump-sicce-1146288498.jpg?v=1743553814&width=832",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=1,
        name="Neptune DOS",
        description="Automated dosing system.",
        price=349.99,
        stock=5,
        image_url="https://media2.cdn.bulkreefsupply.com/media/catalog/product/cache/c8225047e3f199b6e75c4a7f9e30955e/2/5/254973-mufflerproject-le.jpg",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=2,
        name="Red Sea ReefDose 4",
        description="Four-head dosing pump.",
        price=299.99,
        stock=3,
        image_url="https://vividaquariums.com/cdn/shop/files/R35320_ReefDose4_2000x2000.png?v=1692724413",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=3,
        name="Tunze Osmolator 3155",
        description="Top-off system with optical sensor.",
        price=219.99,
        stock=6,
        image_url="https://cdn11.bigcommerce.com/s-fh5tkm/images/stencil/800x800/products/11355/57331/osmolator-3-and-Box-1000x1000__90352.1731596398.jpg?c=2",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=4,
        name="Ecotech MP40 Vortech",
        description="Wireless controllable wave pump.",
        price=429.99,
        stock=4,
        image_url="https://media2.cdn.bulkreefsupply.com/media/catalog/product/cache/c8225047e3f199b6e75c4a7f9e30955e/2/1/213223-ecotechmarine-mp10-vortech-quietdrive-fr.jpg",
        status="active",
        category="Equipment"
    ),

    Product(
        seller_id=5,
        name="Nero 5 Wave Pump",
        description="Compact and powerful flow pump.",
        price=199.99,
        stock=5,
        image_url="https://media2.cdn.bulkreefsupply.com/media/catalog/product/cache/5f1ac3ab0f63743579555d03eda32114/2/3/231837-aquaillumination-nero3-submersible-pump-fr.webp",
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
        image_url="https://cdn11.bigcommerce.com/s-fh5tkm/images/stencil/800x800/products/12395/62476/EDEN80-white-angled__41892.1754506755.jpg?c=2",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=2,
        name="Waterbox 50.3",
        description="Elegant reef-ready aquarium.",
        price=1199.99,
        stock=1,
        image_url="https://cdn11.bigcommerce.com/s-fh5tkm/images/stencil/800x800/products/12395/62476/EDEN80-white-angled__41892.1754506755.jpg?c=2",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=3,
        name="Waterbox 90.3",
        description="Premium reef system.",
        price=1999.99,
        stock=1,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPBm5kLvUnP9cAmSaTPkFTvswgcX6WeIqQIw&s",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=4,
        name="Red Sea Reefer 170",
        description="Complete reef-ready aquarium.",
        price=1499.99,
        stock=1,
        image_url="https://waterboxaquariums.com/cdn/shop/files/AIO.35.2.WHITE.FW.jpg?v=1779291913",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=5,
        name="Red Sea Reefer 250",
        description="Popular reef aquarium system.",
        price=2199.99,
        stock=1,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS35hxW68HWpoBBcaMwb-5MzO9FSbTv_uUfxg&s",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=1,
        name="Innovative Marine Fusion 20",
        description="Compact all-in-one aquarium.",
        price=449.99,
        stock=2,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToVpxZtpYK15GrqiPlx0RllI28qB6K1plRFA&s",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=2,
        name="Innovative Marine Fusion 40",
        description="Mid-sized all-in-one aquarium.",
        price=699.99,
        stock=2,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToVpxZtpYK15GrqiPlx0RllI28qB6K1plRFA&s",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=3,
        name="CADE Reef 1200",
        description="Luxury reef aquarium system.",
        price=3299.99,
        stock=1,
        image_url="https://waterboxaquariums.com/cdn/shop/files/MARINEX.110.4.BLACK.ANGLED.jpg?v=1779291863&width=2000",
        status="active",
        category="Aquariums"
    ),

    Product(
        seller_id=4,
        name="Custom Rimless 120",
        description="Large custom reef aquarium.",
        price=3999.99,
        stock=1,
        image_url="https://topshelfaquatics.com/cdn/shop/files/red-sea-aquarium-drop-ship-reefer-deluxe-425-g3-114-4-gal-incl-2-x-reefled-115-red-sea-1197445487.webp?v=1760391843&width=3840",
        status="active",
        category="Aquariums"
    ),

    # ============================================

    # LIGHTING

    # ============================================

    Product(
        seller_id=5,
        name="Ecotech Radion XR15 G6 Blue",
        description="Premium reef LED lighting system.",
        price=499.99,
        stock=3,
        image_url="https://ecotechmarine.com/wp-content/uploads/2022/05/G6-Blue-Pro.webp",
        status="active",
        category="Lighting"
    ),

    Product(
        seller_id=1,
        name="Ecotech Radion XR30 G6 Blue",
        description="High-output reef LED fixture.",
        price=899.99,
        stock=2,
        image_url="https://www.lushcorals.com/cdn/shop/files/xr30blue-1.jpg?v=1740501107",
        status="active",
        category="Lighting"
    ),

    Product(
        seller_id=2,
        name="AI Prime 16HD",
        description="Popular compact reef light.",
        price=249.99,
        stock=6,
        image_url="https://topshelfaquatics.com/cdn/shop/files/aqua-illumination-prime-led-tank-mount-aqua-illumination-1146290785.jpg?v=1743607919&width=832",
        status="active",
        category="Lighting"
    ),

    Product(
        seller_id=3,
        name="AI Hydra 32HD",
        description="Advanced reef aquarium lighting.",
        price=429.99,
        stock=4,
        image_url="https://topshelfaquatics.com/cdn/shop/files/aqua-illumination-hydra-led-flex-arm-aqua-illumination-1146290739.jpg?v=1743610694&width=832",
        status="active",
        category="Lighting"
    ),

    Product(
        seller_id=4,
        name="AI Blade Grow",
        description="Supplemental reef spectrum lighting.",
        price=189.99,
        stock=5,
        image_url="https://cdn11.bigcommerce.com/s-fh5tkm/images/stencil/1280x1280/products/9452/39744/bladecoralgrow__45888.1672258213.jpg?c=2?imbypass=on",
        status="active",
        category="Lighting"
    ),

    Product(
        seller_id=5,
        name="Kessil A360X",
        description="Dense matrix LED reef lighting.",
        price=449.99,
        stock=4,
        image_url="https://kessil.com/images/product/A360X/A360X_img01.png",
        status="active",
        category="Lighting"
    ),

    Product(
        seller_id=1,
        name="Kessil AP9X",
        description="Premium reef lighting fixture.",
        price=869.99,
        stock=2,
        image_url="https://www.baybridgeaquarium.com/cdn/shop/products/Kessil-AP9X-Controllable-LED-Aquarium-Light-98_large.jpg?v=1596926665",
        status="active",
        category="Lighting"
    ),

    Product(
        seller_id=2,
        name="Red Sea ReefLED 90",
        description="Smart reef aquarium LED.",
        price=369.99,
        stock=4,
        image_url="https://www.lushcorals.com/cdn/shop/files/ReefLEDG2115.png?v=1743178628&width=1445",
        status="active",
        category="Lighting"
    ),

    Product(
        seller_id=3,
        name="Orphek Atlantik iCon",
        description="Professional reef lighting system.",
        price=999.99,
        stock=1,
        image_url="https://shop.orphek.com/cdn/shop/files/Orphek-atlantik-icon-reef-aquarium-led-lighting.jpg?v=1724594409&width=990",
        status="active",
        category="Lighting"
    ),

    # ============================================

    # USED

    # ============================================

    Product(
        seller_id=4,
        name="Used Radion XR15 G5",
        description="Pre-owned Radion in excellent condition.",
        price=299.99,
        stock=1,
        image_url="https://i.ebayimg.com/images/g/FuQAAeSw9zpp59Ge/s-l1200.jpg",
        status="active",
        category="Used"
    ),

    Product(
        seller_id=5,
        name="Used AI Prime 16HD",
        description="Used reef light with mounting arm.",
        price=149.99,
        stock=1,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMSnY0OaAfhy2Fbvb4_a1GqvEg7ptMZyosXQ&s",
        status="active",
        category="Used"
    ),

    Product(
        seller_id=1,
        name="Used MP40 Vortech",
        description="Second-hand wave pump in good condition.",
        price=220.00,
        stock=1,
        image_url="https://i.ebayimg.com/images/g/uBEAAeSwBf9ptWmu/s-l300.jpg",
        status="active",
        category="Used"
    ),

    Product(
        seller_id=2,
        name="Used Waterbox 20",
        description="Small reef aquarium, lightly used.",
        price=250.00,
        stock=1,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfOl7Y3jjNgBe7rH8IqmwTUqgaKyzgmjCazw&s",
        status="active",
        category="Used"
    ),

    Product(
        seller_id=3,
        name="Used Reef Octopus 150",
        description="Reliable skimmer, cleaned and tested.",
        price=180.00,
        stock=1,
        image_url="https://i.ebayimg.com/images/g/HIgAAeSwKuRp9Nsb/s-l1200.webp",
        status="active",
        category="Used"
    ),

    Product(
        seller_id=4,
        name="Used Kessil A360X",
        description="Great condition reef LED.",
        price=280.00,
        stock=1,
        image_url="https://i.ebayimg.com/images/g/vCYAAeSwhjZqAjMa/s-l1200.jpg",
        status="active",
        category="Used"
    ),

    Product(
        seller_id=5,
        name="Used Red Sea Reefer 250",
        description="Complete reef-ready setup.",
        price=1200.00,
        stock=1,
        image_url="https://www.reef2reef.com/data/attachments/2709/2709572-78691e7c74723303abf1e07b38bde45d.jpg",
        status="active",
        category="Used"
    ),

    Product(
        seller_id=1,
        name="Used Nero 5",
        description="Compact wave maker with controller.",
        price=120.00,
        stock=1,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGzbJQPgKGB1hqA9Zbk8VELcgLEdzoG8ueSQ&s",
        status="active",
        category="Used"
    ),

    Product(
        seller_id=2,
        name="Used Neptune DOS",
        description="Dosing system in working condition.",
        price=180.00,
        stock=1,
        image_url="https://www.terrareef.com/cdn/shop/files/PXL_20240506_162013118.jpg-used-Neptune-DOS.jpg?v=1715833659&width=2000",
        status="active",
        category="Used"
    ),


]

with app.app_context():

    Favorite.query.delete()
    db.session.commit()

    Product.query.delete()
    db.session.commit()

    db.session.bulk_save_objects(products)
    db.session.commit()

    print("Products updated successfully!")