import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLatestProducts } from "@/lib/woocommerce";

export const revalidate = 0; // Disable static rendering for this test page to ensure it hits the server each time

export default async function WooCommerceTestPage() {
  const woocommerceUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  const isConfigured =
    consumerKey &&
    consumerSecret &&
    consumerKey !== "INSERT_KEY_HERE" &&
    consumerSecret !== "INSERT_SECRET_HERE";

  const products = await getLatestProducts(20);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white gradient-bg flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-6 pt-32 pb-20 flex-grow">
        {/* Page Header */}
        <div className="mb-12 border-b border-zinc-800 pb-8">
          <span className="text-xs font-mono tracking-widest neon-cyan block mb-2 uppercase">
            [ Step 1 Headless Connection Test ]
          </span>
          <h1 className="text-4xl md:text-5xl font-black orbitron mb-4">
            WOOCOMMERCE API <span className="neon-purple">VERIFICATION</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            This React Server Component (RSC) securely connects to the isolated WooCommerce database 
            backend to verify data ingestion and test server-side REST API product fetching.
          </p>
        </div>

        {/* Configuration Status Card */}
        <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 md:p-8 mb-12 shadow-2xl backdrop-blur-md">
          <h2 className="text-xl font-bold orbitron mb-6 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse"></span>
            Connection Environment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-sm">
            <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/40">
              <div className="text-xs text-zinc-500 mb-1">Target Endpoint</div>
              <div className="text-zinc-200 font-semibold truncate" title={woocommerceUrl}>
                {woocommerceUrl || "Not Configured"}
              </div>
            </div>

            <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/40">
              <div className="text-xs text-zinc-500 mb-1">Consumer Key (Server-side)</div>
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    consumerKey ? "bg-emerald-400" : "bg-red-400"
                  }`}
                ></span>
                <span className="text-zinc-200">
                  {consumerKey
                    ? consumerKey === "INSERT_KEY_HERE"
                      ? "PLACEHOLDER (INSERT_KEY_HERE)"
                      : "CONFIGURED"
                    : "MISSING"}
                </span>
              </div>
            </div>

            <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/40">
              <div className="text-xs text-zinc-500 mb-1">Consumer Secret (Server-side)</div>
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    consumerSecret ? "bg-emerald-400" : "bg-red-400"
                  }`}
                ></span>
                <span className="text-zinc-200">
                  {consumerSecret
                    ? consumerSecret === "INSERT_SECRET_HERE"
                      ? "PLACEHOLDER (INSERT_SECRET_HERE)"
                      : "CONFIGURED"
                    : "MISSING"}
                </span>
              </div>
            </div>

            <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/40">
              <div className="text-xs text-zinc-500 mb-1">Data Source Mode</div>
              <span
                className={`inline-block px-2.5 py-1 rounded text-xs font-bold ${
                  isConfigured
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {isConfigured ? "LIVE WOOCOMMERCE REST API" : "MOCK FALLBACK ACTIVE"}
              </span>
            </div>
          </div>
        </div>

        {/* Product Ingestion Test Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black orbitron uppercase">
              Ingested Products ({products.length})
            </h2>
            <span className="text-zinc-500 text-sm font-mono">Limit: 20</span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
              <p className="text-zinc-500">No products returned from API or Mock dataset.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Product Image Thumbnail */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-zinc-900 border border-zinc-800/50">
                      <img
                        src={product.image.sourceUrl}
                        alt={product.image.altText || product.name}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {product.onSale && (
                        <span className="absolute top-2 right-2 bg-rose-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          SALE
                        </span>
                      )}
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-cyan-500 text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          NEW
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold orbitron text-zinc-100 line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 min-h-[2rem] mb-4">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-900">
                    <div>
                      {product.onSale && product.regularPrice ? (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-500 line-through">
                            {product.regularPrice}
                          </span>
                          <span className="font-mono text-cyan-400 font-bold">
                            {product.salePrice}
                          </span>
                        </div>
                      ) : (
                        <span className="font-mono text-zinc-300 font-semibold">
                          {product.price}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      ID: {product.databaseId || product.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Action Buttons */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="cta-button inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold orbitron text-sm shadow-lg hover:shadow-cyan-500/20"
          >
            ← RETURN TO HOMEPAGE
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
