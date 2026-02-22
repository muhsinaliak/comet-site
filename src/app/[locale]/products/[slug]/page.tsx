import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { ProductDetailClient } from "./product-detail-client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not Found" };

  const loc = locale as "tr" | "en";
  return {
    title: product.name[loc],
    description: product.shortDescription[loc],
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
