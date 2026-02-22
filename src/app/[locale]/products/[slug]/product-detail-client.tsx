"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product, Locale } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";
import { formatPrice, formatDiscountedPrice } from "@/lib/utils";
import { SpecsTable } from "@/components/product-detail/specs-table";
import { ProductTabs } from "@/components/product-detail/product-tabs";
import { AddToQuote } from "@/components/product-detail/add-to-quote";
import { ModelViewerFallback } from "@/components/product-detail/model-viewer-fallback";
import { ChevronRight, Image as ImageIcon } from "lucide-react";

const ModelViewer = dynamic(
  () => import("@/components/product-detail/model-viewer"),
  {
    ssr: false,
    loading: () => <ModelViewerFallback isLoading />,
  }
);

export function ProductDetailClient({ product }: { product: Product }) {
  const t = useTranslations("products");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const [load3d, setLoad3d] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-surface-secondary dark:bg-dark-surface-secondary border-b border-border dark:border-dark-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-text-tertiary dark:text-dark-text-tertiary">
            <Link
              href="/"
              className="hover:text-brand-blue dark:hover:text-brand-green transition-colors"
            >
              {tc("home")}
            </Link>
            <ChevronRight size={12} />
            <Link
              href="/products"
              className="hover:text-brand-blue dark:hover:text-brand-green transition-colors"
            >
              {tc("products")}
            </Link>
            <ChevronRight size={12} />
            <span className="text-text-primary dark:text-dark-text-primary font-medium">
              {product.name[locale]}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Top section: 3D/Image + Product info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: 3D Viewer or Image */}
          <div className="aspect-square lg:aspect-auto lg:min-h-[500px]">
            {product.model3d ? (
              load3d ? (
                <ModelViewer
                  glbUrl={product.model3d.glb}
                  resetLabel={t("resetView")}
                  fullscreenLabel={t("fullscreen")}
                />
              ) : (
                <ModelViewerFallback
                  loadLabel={t("load3dModel")}
                  onLoad={() => setLoad3d(true)}
                />
              )
            ) : (
              <div className="w-full h-full min-h-[400px] rounded-2xl bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border flex items-center justify-center">
                <ImageIcon
                  size={64}
                  className="text-text-tertiary/30 dark:text-dark-text-tertiary/30"
                  strokeWidth={1}
                />
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <div>
            {/* Category */}
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-green mb-2">
              {CATEGORY_LABELS[product.category]?.[locale]}
            </span>

            {/* Name */}
            <h1 className="font-display text-3xl sm:text-4xl font-800 tracking-tight text-text-primary dark:text-dark-text-primary">
              {product.name[locale]}
            </h1>

            {/* SKU */}
            <p className="mt-1 text-sm font-mono text-text-tertiary dark:text-dark-text-tertiary">
              {product.sku}
            </p>

            {/* Price */}
            {product.price && (
              <div className="mt-4 flex items-baseline gap-3">
                {product.price.discountedAmount ? (
                  <>
                    <span className="font-display text-2xl font-[800] text-brand-blue dark:text-brand-green">
                      {formatDiscountedPrice(product.price)}
                    </span>
                    <span className="text-lg text-text-tertiary dark:text-dark-text-tertiary line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="font-display text-2xl font-[800] text-brand-blue dark:text-brand-green">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <p className="mt-4 text-text-secondary dark:text-dark-text-secondary leading-relaxed">
              {product.longDescription[locale]}
            </p>

            {/* Key specs preview */}
            {product.specifications[0] && (
              <div className="mt-6 p-4 rounded-xl bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-green mb-3">
                  {t("specifications")}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {product.specifications[0].items.slice(0, 4).map((item, i) => (
                    <div key={i}>
                      <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                        {item.label[locale]}
                      </p>
                      <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                        {item.value} {item.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to quote */}
            <div className="mt-6">
              <AddToQuote product={product} />
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-tertiary dark:text-dark-text-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Full specifications */}
        <div className="mb-12">
          <h3 className="font-display text-xl font-700 text-text-primary dark:text-dark-text-primary mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-[2px] bg-brand-green" />
            {t("specifications")}
          </h3>
          <SpecsTable specs={product.specifications} />
        </div>

        {/* Tabs: Documents, Software, Accessories, Videos */}
        <div className="mb-12">
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
}
