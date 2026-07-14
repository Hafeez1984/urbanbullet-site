import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Initialize the WooCommerce API client
// This client should only be used server-side since it relies on server-side environment variables
const woocommerceUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

if (!woocommerceUrl) {
  console.warn("Warning: NEXT_PUBLIC_WORDPRESS_URL is not set in environment variables.");
}

// Check for server-side key existence
const isServer = typeof window === "undefined";
if (isServer && (!consumerKey || !consumerSecret || consumerKey === "INSERT_KEY_HERE" || consumerSecret === "INSERT_SECRET_HERE")) {
  console.warn("Warning: WooCommerce Consumer Key or Secret is not configured or is using placeholder values.");
}

// Create the API client instance
// Note: We use the default export of @woocommerce/woocommerce-rest-api.
// Because it's a CommonJS package, we handle both default and namespace imports.
// @ts-ignore
const WooCommerceClientClass = WooCommerceRestApi.default || WooCommerceRestApi;

export const wcApi = new WooCommerceClientClass({
  url: woocommerceUrl || "https://ub-engine.urbanbullet.in",
  consumerKey: consumerKey || "INSERT_KEY_HERE",
  consumerSecret: consumerSecret || "INSERT_SECRET_HERE",
  version: "wc/v3"
});
