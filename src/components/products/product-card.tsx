"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product, Locale } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";
import { ProductIllustration } from "@/components/shared/product-illustration";
import { cn, formatPrice, formatDiscountedPrice } from "@/lib/utils";
import { ArrowRight, Box } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as Locale;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block h-full"
    >
      <div className="card-hover h-full rounded-2xl border border-border/80 dark:border-dark-border bg-surface dark:bg-dark-surface-secondary overflow-hidden">
        {/* Image area with illustration */}
        <div className="relative h-52 bg-gradient-to-br from-surface-secondary to-surface-tertiary dark:from-dark-surface-tertiary/50 dark:to-dark-surface-secondary flex items-center justify-center overflow-hidden">
          {/* Product illustration */}
          <ProductIllustration
            category={product.category}
            className="w-full h-full text-brand-blue dark:text-brand-green opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
          />

          {/* 3D badge */}
          {product.model3d && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-charcoal/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              <Box size={10} />
              3D
            </div>
          )}

          {/* Category badge */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-brand-blue/90 dark:bg-brand-green/90 text-white dark:text-brand-charcoal text-[10px] font-bold uppercase tracking-wider">
            {CATEGORY_LABELS[product.category]?.[locale]}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/5 to-transparent dark:from-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-display text-base font-[700] text-text-primary dark:text-dark-text-primary group-hover:text-brand-blue dark:group-hover:text-brand-green transition-colors duration-300 leading-snug">
                {product.name[locale]}
              </h3>
              <p className="mt-1 text-xs font-mono text-text-tertiary dark:text-dark-text-tertiary tracking-wider">
                {product.sku}
              </p>
            </div>
          </div>

          <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary line-clamp-2 leading-relaxed">
            {product.shortDescription[locale]}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                  "bg-surface-tertiary/80 dark:bg-dark-surface-tertiary/80",
                  "text-text-tertiary dark:text-dark-text-tertiary"
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom: Price & Arrow */}
          <div className="mt-4 pt-3 border-t border-border/40 dark:border-dark-border/40 flex items-center justify-between">
            {product.price ? (
              <div className="flex items-baseline gap-1.5">
                {product.price.discountedAmount ? (
                  <>
                    <span className="text-sm font-bold text-brand-blue dark:text-brand-green">
                      {formatDiscountedPrice(product.price)}
                    </span>
                    <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-bold text-brand-blue dark:text-brand-green">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary italic">
                {locale === "tr" ? "Fiyat için teklif alın" : "Request quote"}
              </span>
            )}
            <ArrowRight
              size={14}
              className="text-text-tertiary group-hover:text-brand-blue dark:group-hover:text-brand-green transition-all duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
