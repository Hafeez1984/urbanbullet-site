import React from 'react';
import { getLatestProducts } from '@/lib/woocommerce';
import HomeClient from '@/components/HomeClient';

// Revalidate homepage every 60 seconds (or immediately when cache is cleared/rebuilt)
export const revalidate = 60;

export default async function HomePage() {
  const products = await getLatestProducts(20);

  return <HomeClient initialProducts={products} />;
}
