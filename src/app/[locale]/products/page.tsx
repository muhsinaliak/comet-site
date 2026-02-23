import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getAllProducts, getCategories } from "@/lib/products";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { PageHeader } from "@/components/shared/page-header";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default async function ProductsPage() {
  const t = await getTranslations("products");
  const products = getAllProducts();
  const categories = getCategories();

  return (
    <div className="min-h-screen">
      <PageHeader title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Suspense>
          <ProductFilters categories={categories} />
        </Suspense>
        <div className="mt-8">
          <Suspense>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
