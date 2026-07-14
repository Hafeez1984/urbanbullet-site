import React from 'react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import ProductDetailClient from '@/components/ProductDetailClient';

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];

  return <ProductDetailClient product={product} />;
}
