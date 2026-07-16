export interface Product {
  id: string;
  databaseId?: number;
  name: string;
  slug: string;
  price: string;
  regularPrice?: string | null;
  salePrice?: string | null;
  onSale: boolean;
  isNew?: boolean;
  image: {
    sourceUrl: string;
    altText: string;
  };
  shortDescription: string;
  averageRating: number;
  reviewCount: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    name: "Cyber Hoodie",
    slug: "cyber-hoodie",
    price: "₹89.99",
    regularPrice: "₹129.99",
    salePrice: "₹89.99",
    onSale: true,
    isNew: false,
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      altText: "Cyber Hoodie"
    },
    shortDescription: "Limited Edition Tech Wear",
    averageRating: 5,
    reviewCount: 12
  },
  {
    id: "prod_2",
    name: "Neon Dreams Tee",
    slug: "neon-dreams-tee",
    price: "₹49.99",
    regularPrice: null,
    salePrice: null,
    onSale: false,
    isNew: true,
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
      altText: "Neon Dreams Tee"
    },
    shortDescription: "Premium Cotton Blend",
    averageRating: 4,
    reviewCount: 8
  },
  {
    id: "prod_3",
    name: "Urban Jacket",
    slug: "urban-jacket",
    price: "₹159.99",
    regularPrice: null,
    salePrice: null,
    onSale: false,
    isNew: false,
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
      altText: "Urban Jacket"
    },
    shortDescription: "Weather Resistant Tech Fabric",
    averageRating: 5,
    reviewCount: 24
  },
  {
    id: "prod_4",
    name: "Pulse Sweatshirt",
    slug: "pulse-sweatshirt",
    price: "₹69.99",
    regularPrice: null,
    salePrice: null,
    onSale: false,
    isNew: true,
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
      altText: "Pulse Sweatshirt"
    },
    shortDescription: "Oversized Fit Design",
    averageRating: 4.5,
    reviewCount: 15
  },
  {
    id: "prod_5",
    name: "Graphic Crew Neck",
    slug: "graphic-crew-neck",
    price: "₹44.99",
    regularPrice: "₹64.99",
    salePrice: "₹44.99",
    onSale: true,
    isNew: false,
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
      altText: "Graphic Crew Neck"
    },
    shortDescription: "Bold Print Collection",
    averageRating: 4,
    reviewCount: 9
  },
  {
    id: "prod_6",
    name: "Tech Zip Hoodie",
    slug: "tech-zip-hoodie",
    price: "₹119.99",
    regularPrice: null,
    salePrice: null,
    onSale: false,
    isNew: false,
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
      altText: "Tech Zip Hoodie"
    },
    shortDescription: "Performance Streetwear",
    averageRating: 5,
    reviewCount: 31
  }
];
