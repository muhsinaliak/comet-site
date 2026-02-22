"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import type { Product, Locale, ProductCategory } from "@/types/product";
import { ProductCard } from "./product-card";
import { PackageOpen } from "lucide-react";

export function ProductGrid({ products }: { products: Product[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("products");
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const filtered = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.name[locale].toLowerCase().includes(q) ||
        p.shortDescription[locale].toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.sku.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="py-20 text-center">
        <PackageOpen
          size={48}
          className="mx-auto text-text-tertiary dark:text-dark-text-tertiary mb-4"
          strokeWidth={1}
        />
        <p className="text-text-secondary dark:text-dark-text-secondary">
          {t("noResults")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
