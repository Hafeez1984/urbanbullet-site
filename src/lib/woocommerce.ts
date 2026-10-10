import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { MOCK_PRODUCTS, Product } from "./mockData";

const woocommerceUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

const isServer = typeof window === "undefined";
const hasCredentials = 
  consumerKey && 
  consumerSecret && 
  consumerKey !== "INSERT_KEY_HERE" && 
  consumerSecret !== "INSERT_SECRET_HERE";

// Initialize WooCommerce API client safely
// Note: We handle both ES default import and CommonJS namespace
// @ts-ignore
const WooCommerceClientClass = WooCommerceRestApi.default || WooCommerceRestApi;

export const wcApi = new WooCommerceClientClass({
  url: woocommerceUrl || "https://ub-engine.urbanbullet.in",
  consumerKey: consumerKey || "INSERT_KEY_HERE",
  consumerSecret: consumerSecret || "INSERT_SECRET_HERE",
  version: "wc/v3"
});

/**
 * Helper to fetch a category ID by its slug from WooCommerce
 */
export async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  if (!isServer || !hasCredentials) return null;
  try {
    const response = await wcApi.get("products/categories", {
      slug: slug,
    });
    if (response.data && response.data.length > 0) {
      return response.data[0].id;
    }
  } catch (error) {
    console.error(`Failed to get category ID for slug ${slug}:`, error);
  }
  return null;
}

/**
 * Baseline server-side data-fetching utility to fetch the latest 20 products from WooCommerce products endpoint.
 */
export async function getLatestProducts(limit = 20): Promise<Product[]> {
  if (!isServer || !hasCredentials) {
    console.info("WooCommerce REST API credentials not configured. Falling back to high-fidelity mock data.");
    return MOCK_PRODUCTS.slice(0, limit);
  }

  try {
    const response = await wcApi.get("products", {
      per_page: limit,
      status: "publish",
    });

    if (!response || !response.data) {
      console.warn("No data returned from WooCommerce REST API. Falling back to mock data.");
      return MOCK_PRODUCTS.slice(0, limit);
    }

    const wcProducts: any[] = response.data;

    return wcProducts.map((product) => {
      // Clean HTML tags from descriptions
      const cleanDesc = product.short_description
        ? product.short_description.replace(/<[^>]*>/g, "").trim()
        : product.description
        ? product.description.replace(/<[^>]*>/g, "").substring(0, 100).trim()
        : "Premium Streetwear Drop";

      // Extract image URL and alt text
      const imageSrc = product.images?.[0]?.src || "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80";
      const imageAlt = product.images?.[0]?.alt || product.name;

      // Extract price formatting (defaults to INR ₹ symbol, but customizable)
      const formattedPrice = product.price ? `₹${product.price}` : "Contact for Price";
      const formattedRegularPrice = product.regular_price ? `₹${product.regular_price}` : null;
      const formattedSalePrice = product.sale_price ? `₹${product.sale_price}` : null;

      return {
        id: String(product.id),
        databaseId: product.id,
        name: product.name,
        slug: product.slug,
        price: formattedPrice,
        regularPrice: formattedRegularPrice,
        salePrice: formattedSalePrice,
        onSale: product.on_sale || false,
        isNew: new Date(product.date_created).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000,
        image: {
          sourceUrl: imageSrc,
          altText: imageAlt,
        },
        shortDescription: cleanDesc,
        averageRating: parseFloat(product.average_rating) || 5,
        reviewCount: product.rating_count || 0,
      };
    });
  } catch (error) {
    console.error("Failed to fetch products from WooCommerce REST API:", error);
    return MOCK_PRODUCTS.slice(0, limit);
  }
}

/**
 * General purpose product fetcher (maintains backward compatibility with components)
 */
export async function getProducts(categorySlug?: string, limit = 6): Promise<Product[]> {
  if (!isServer || !hasCredentials) {
    console.info("WooCommerce REST API credentials not configured. Falling back to high-fidelity mock data.");
    return MOCK_PRODUCTS.slice(0, limit);
  }

  try {
    const params: any = {
      per_page: limit,
      status: "publish",
    };

    if (categorySlug && categorySlug !== "all") {
      const categoryId = await getCategoryIdBySlug(categorySlug);
      if (categoryId) {
        params.category = categoryId;
      }
    }

    const response = await wcApi.get("products", params);

    if (!response || !response.data) {
      return MOCK_PRODUCTS.slice(0, limit);
    }

    const wcProducts: any[] = response.data;

    return wcProducts.map((product) => {
      const cleanDesc = product.short_description
        ? product.short_description.replace(/<[^>]*>/g, "").trim()
        : product.description
        ? product.description.replace(/<[^>]*>/g, "").substring(0, 100).trim()
        : "Premium Streetwear Drop";

      const imageSrc = product.images?.[0]?.src || "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80";
      const imageAlt = product.images?.[0]?.alt || product.name;

      return {
        id: String(product.id),
        databaseId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price ? `₹${product.price}` : "Contact for Price",
        regularPrice: product.regular_price ? `₹${product.regular_price}` : null,
        salePrice: product.sale_price ? `₹${product.sale_price}` : null,
        onSale: product.on_sale || false,
        image: {
          sourceUrl: imageSrc,
          altText: imageAlt,
        },
        shortDescription: cleanDesc,
        averageRating: parseFloat(product.average_rating) || 5,
        reviewCount: product.rating_count || 0,
      };
    });
  } catch (error) {
    console.error(`Failed to fetch products for category ${categorySlug}:`, error);
    return MOCK_PRODUCTS.slice(0, limit);
  }
}

export interface DetailedProduct {
  id: string;
  databaseId?: number;
  name: string;
  slug: string;
  sku: string;
  price: string;
  numericPrice: number;
  regularPrice?: string | null;
  salePrice?: string | null;
  onSale: boolean;
  isNew?: boolean;
  inStock: boolean;
  stockQuantity?: number | null;
  images: Array<{ sourceUrl: string; altText: string }>;
  attributes: Array<{ name: string; options: string[] }>;
  shortDescription: string;
  description: string;
  averageRating: number;
  reviewCount: number;
}

/**
 * Fetch detailed single product by slug or ID from WooCommerce REST API with robust mock fallback.
 */
export async function getProductBySlugOrId(slugOrId: string): Promise<DetailedProduct> {
  const fallbackMock = MOCK_PRODUCTS.find((p) => p.slug === slugOrId || p.id === slugOrId) || MOCK_PRODUCTS[0];

  const buildMockDetailed = (p: Product): DetailedProduct => {
    const numPrice = parseFloat(p.price.replace(/[^0-9.]/g, "")) || 99;
    return {
      id: p.id,
      databaseId: p.databaseId || 1,
      name: p.name,
      slug: p.slug,
      sku: `UB-${p.id.toUpperCase()}`,
      price: p.price.startsWith("₹") ? p.price : `₹${p.price}`,
      numericPrice: numPrice,
      regularPrice: p.regularPrice ? (p.regularPrice.startsWith("₹") ? p.regularPrice : `₹${p.regularPrice}`) : null,
      salePrice: p.salePrice ? (p.salePrice.startsWith("₹") ? p.salePrice : `₹${p.salePrice}`) : null,
      onSale: p.onSale,
      isNew: p.isNew ?? true,
      inStock: true,
      stockQuantity: 25,
      images: [
        { sourceUrl: p.image.sourceUrl, altText: p.image.altText || p.name },
        { sourceUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80", altText: `${p.name} Back` },
        { sourceUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80", altText: `${p.name} Detail` },
      ],
      attributes: [
        { name: "Size", options: ["S", "M", "L", "XL", "XXL"] },
        { name: "Color", options: ["OBSIDIAN BLACK", "NEON CYAN", "ACID MAGENTA"] },
      ],
      shortDescription: p.shortDescription || "Engineered with premium cyber-wear textiles for maximum durability and futuristic style.",
      description: "Full cyber-wear tech-fiber integration. Water-resistant microcoatings designed for modern metropolitan exploration. High-density embroidery, custom inner lining, reinforced seams.",
      averageRating: p.averageRating || 5,
      reviewCount: p.reviewCount || 12,
    };
  };

  if (!isServer || !hasCredentials) {
    return buildMockDetailed(fallbackMock);
  }

  try {
    let wcProduct: any = null;
    const isNumeric = /^\d+$/.test(slugOrId);

    if (isNumeric) {
      try {
        const response = await wcApi.get(`products/${slugOrId}`);
        if (response && response.data && response.data.id) {
          wcProduct = response.data;
        }
      } catch (err) {
        // Fallback to slug search
      }
    }

    if (!wcProduct) {
      try {
        const response = await wcApi.get("products", { slug: slugOrId });
        if (response && response.data && response.data.length > 0) {
          wcProduct = response.data[0];
        }
      } catch (err) {
        // Ignore
      }
    }

    if (!wcProduct) {
      return buildMockDetailed(fallbackMock);
    }

    const cleanShortDesc = wcProduct.short_description
      ? wcProduct.short_description.replace(/<[^>]*>/g, "").trim()
      : "Engineered with premium cyber-wear textiles for maximum durability and futuristic style.";

    const cleanDesc = wcProduct.description
      ? wcProduct.description.replace(/<[^>]*>/g, "").trim()
      : "Full cyber-wear tech-fiber integration. Water-resistant microcoatings designed for modern metropolitan exploration.";

    const rawImages: any[] = wcProduct.images || [];
    const formattedImages = rawImages.map((img: any) => ({
      sourceUrl: img.src,
      altText: img.alt || wcProduct.name,
    }));

    if (formattedImages.length === 0) {
      formattedImages.push(
        { sourceUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80", altText: wcProduct.name },
        { sourceUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80", altText: `${wcProduct.name} Back` },
        { sourceUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80", altText: `${wcProduct.name} Detail` }
      );
    } else if (formattedImages.length === 1) {
      formattedImages.push(
        { sourceUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80", altText: `${wcProduct.name} Back View` },
        { sourceUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80", altText: `${wcProduct.name} Detail View` }
      );
    }

    const rawAttributes: any[] = wcProduct.attributes || [];
    const formattedAttributes = rawAttributes
      .filter((attr: any) => attr.options && attr.options.length > 0)
      .map((attr: any) => ({
        name: attr.name,
        options: attr.options,
      }));

    if (!formattedAttributes.some((a) => a.name.toLowerCase().includes("size"))) {
      formattedAttributes.push({ name: "Size", options: ["S", "M", "L", "XL", "XXL"] });
    }
    if (!formattedAttributes.some((a) => a.name.toLowerCase().includes("color"))) {
      formattedAttributes.push({ name: "Color", options: ["OBSIDIAN BLACK", "NEON CYAN", "ACID MAGENTA"] });
    }

    const numPrice = parseFloat(wcProduct.price) || 99;
    const formattedPrice = wcProduct.price ? `₹${wcProduct.price}` : "₹99.00";
    const formattedRegPrice = wcProduct.regular_price ? `₹${wcProduct.regular_price}` : null;
    const formattedSalePrice = wcProduct.sale_price ? `₹${wcProduct.sale_price}` : null;

    return {
      id: String(wcProduct.id),
      databaseId: wcProduct.id,
      name: wcProduct.name,
      slug: wcProduct.slug,
      sku: wcProduct.sku || `UB-${wcProduct.id}`,
      price: formattedPrice,
      numericPrice: numPrice,
      regularPrice: formattedRegPrice,
      salePrice: formattedSalePrice,
      onSale: wcProduct.on_sale || false,
      isNew: new Date(wcProduct.date_created).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000,
      inStock: wcProduct.stock_status !== "outofstock",
      stockQuantity: wcProduct.stock_quantity ?? null,
      images: formattedImages,
      attributes: formattedAttributes,
      shortDescription: cleanShortDesc,
      description: cleanDesc,
      averageRating: parseFloat(wcProduct.average_rating) || 5,
      reviewCount: wcProduct.rating_count || 12,
    };
  } catch (error) {
    console.error(`Failed to fetch product by slug/ID ${slugOrId}:`, error);
    return buildMockDetailed(fallbackMock);
  }
}

