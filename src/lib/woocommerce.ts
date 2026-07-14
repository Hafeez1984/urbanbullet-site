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
