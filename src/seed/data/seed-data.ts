interface SeedProduct {
    product_description: string;
    product_images: string[];
    product_stock: number;
    product_price: number;
    product_sizes: ValidSizes[];
    product_slug: string;
    product_tags: string[];
    product_title: string;
    product_type: ValidTypes;
    product_gender: 'men'|'women'|'kid'|'unisex';
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';

interface SeedData {
    products: SeedProduct[];
}

export const initialData: SeedData = {
    products: [
        {
            product_description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            product_images: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ],
            product_stock: 7,
            product_price: 75,
            product_sizes: ['XS','S','M','L','XL','XXL'],
            product_slug: "mens_chill_crew_neck_sweatshirt",
            product_type: 'shirts',
            product_tags: ['sweatshirt'],
            product_title: "Men’s Chill Crew Neck Sweatshirt",
            product_gender: 'men'
        },
        {
            product_description: "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
            product_images: [
                '1740507-00-A_0_2000.jpg',
                '1740507-00-A_1.jpg',
            ],
            product_stock: 5,
            product_price: 200,
            product_sizes: ['XS','S','M','XL','XXL'],
            product_slug: "men_quilted_shirt_jacket",
            product_type: 'shirts',
            product_tags: ['jacket'],
            product_title: "Men's Quilted Shirt Jacket",
            product_gender: 'men'
        },
        {
            product_description: "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
            product_images: [
                '1740250-00-A_0_2000.jpg',
                '1740250-00-A_1.jpg'
            ],
            product_stock: 10,
            product_price: 130,
            product_sizes: ['S','M','L','XL','XXL'],
            product_slug: "men_raven_lightweight_zip_up_bomber_jacket",
            product_type: 'shirts',
            product_tags: ['shirt'],
            product_title: "Men's Raven Lightweight Zip Up Bomber Jacket",
            product_gender: 'men'
        },
        {
            product_description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            product_images: [
                '1740280-00-A_0_2000.jpg',
                '1740280-00-A_1.jpg',
            ],
            product_stock: 50,
            product_price: 45,
            product_sizes: ['XS','S','M','L'],
            product_slug: "men_turbine_long_sleeve_tee",
            product_type: 'shirts',
            product_tags: ['shirt'],
            product_title: "Men's Turbine Long Sleeve Tee",
            product_gender: 'men'
        },
        {
            product_description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            product_images: [
                '1741416-00-A_0_2000.jpg',
                '1741416-00-A_1.jpg',
            ],
            product_stock: 50,
            product_price: 40,
            product_sizes: ['M','L','XL','XXL'],
            product_slug: "men_turbine_short_sleeve_tee",
            product_type: 'shirts',
            product_tags: ['shirt'],
            product_title: "Men's Turbine Short Sleeve Tee",
            product_gender: 'men'
        },
        {
            product_description: "The Women's Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            product_images: [
                '1740176-00-B_0_2000.jpg',
                '1740176-00-B_1.jpg',
            ],
            product_stock: 15,
            product_price: 75,
            product_sizes: ['XS','S','M','L','XL','XXL'],
            product_slug: "womens_chill_crew_neck_sweatshirt",
            product_type: 'shirts',
            product_tags: ['sweatshirt'],
            product_title: "Women's Chill Crew Neck Sweatshirt",
            product_gender: 'women'
        },
        {
            product_description: "The Women's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
            product_images: [
                '1740507-00-B_0_2000.jpg',
                '1740507-00-B_1.jpg',
            ],
            product_stock: 8,
            product_price: 200,
            product_sizes: ['XS','S','M','L','XL'],
            product_slug: "women_quilted_shirt_jacket",
            product_type: 'shirts',
            product_tags: ['jacket'],
            product_title: "Women's Quilted Shirt Jacket",
            product_gender: 'women'
        },
        {
            product_description: "The Kid's Tesla Hoodie is designed for comfort and style. Made from a soft cotton blend, this hoodie features a Tesla logo on the chest and a kangaroo pocket. Perfect for everyday wear.",
            product_images: [
                '1740250-00-C_0_2000.jpg',
                '1740250-00-C_1.jpg'
            ],
            product_stock: 20,
            product_price: 50,
            product_sizes: ['XS','S','M','L'],
            product_slug: "kids_tesla_hoodie",
            product_type: 'hoodies',
            product_tags: ['hoodie'],
            product_title: "Kid's Tesla Hoodie",
            product_gender: 'kid'
        },
        {
            product_description: "The Unisex Tesla Cap is perfect for any occasion. Made from 100% cotton, this cap features an adjustable strap and a Tesla logo on the front. Available in multiple colors.",
            product_images: [
                '1741416-00-D_0_2000.jpg',
                '1741416-00-D_1.jpg',
            ],
            product_stock: 30,
            product_price: 25,
            product_sizes: [],
            product_slug: "unisex_tesla_cap",
            product_type: 'hats',
            product_tags: ['cap'],
            product_title: "Unisex Tesla Cap",
            product_gender: 'unisex'
        },
        {
            product_description: "The Men's Tesla Joggers are designed for comfort and style. Made from a soft cotton blend, these joggers feature a Tesla logo on the left leg and an elastic waistband with drawstring.",
            product_images: [
                '1741416-00-E_0_2000.jpg',
                '1741416-00-E_1.jpg',
            ],
            product_stock: 25,
            product_price: 60,
            product_sizes: ['S','M','L','XL','XXL'],
            product_slug: "men_tesla_joggers",
            product_type: 'pants',
            product_tags: ['joggers'],
            product_title: "Men's Tesla Joggers",
            product_gender: 'men'
        },
        // ...continúa con el resto de los productos de la misma manera...
    ]
}