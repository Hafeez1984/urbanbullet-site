import React from 'react';
import { getProductBySlugOrId } from '@/lib/woocommerce';
import ProductDetailClient from '@/components/ProductDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductBySlugOrId(id);

  return <ProductDetailClient product={product} />;
}
