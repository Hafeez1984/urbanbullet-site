import React from 'react';
import { Metadata } from 'next';
import { getProductBySlugOrId } from '@/lib/woocommerce';
import ProductDetailClient from '@/components/ProductDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugOrId(slug);

  return {
    title: `${product.name} | URBANBULLET Streetwear`,
    description: product.shortDescription || `Shop ${product.name} at Urban Bullet. Authentic Cyberpunk & Techwear drops with pan-India express delivery.`,
    openGraph: {
      title: `${product.name} | URBANBULLET`,
      description: product.shortDescription,
      images: product.images[0]?.sourceUrl ? [{ url: product.images[0].sourceUrl }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlugOrId(slug);

  return <ProductDetailClient product={product} />;
}
