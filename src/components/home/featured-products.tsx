"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product, Locale } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";
import { ProductIllustration } from "@/components/shared/product-illustration";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Box } from "lucide-react";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const t = useTranslations("home");
  const tp = useTranslations("common");
  const locale = useLocale() as Locale;

  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader title={t("featuredTitle")} subtitle={t("featuredSubtitle")} />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.1}>
              <Link
                href={`/products/${product.slug}`}
                className="group block h-full"
              >
                <div className="card-hover h-full rounded-2xl border border-border/80 dark:border-dark-border bg-surface dark:bg-dark-surface-secondary overflow-hidden">
                  {/* Product illustration area */}
                  <div className="relative h-44 bg-gradient-to-br from-surface-secondary to-surface-tertiary/80 dark:from-dark-surface-tertiary/40 dark:to-dark-surface-secondary flex items-center justify-center overflow-hidden">
                    <ProductIllustration
                      category={product.category}
                      className="w-full h-full text-brand-blue dark:text-brand-green opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    />

                    {/* 3D badge */}
                    {product.model3d && (
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-charcoal/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider">
                        <Box size={9} />
                        3D
                      </div>
                    )}

                    {/* Category label */}
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-brand-blue/90 dark:bg-brand-green/90 text-white dark:text-brand-charcoal text-[9px] font-bold uppercase tracking-wider">
                      {CATEGORY_LABELS[product.category]?.[locale]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-[15px] font-[700] text-text-primary dark:text-dark-text-primary group-hover:text-brand-blue dark:group-hover:text-brand-green transition-colors duration-300 leading-snug">
                      {product.name[locale]}
                    </h3>

                    <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary line-clamp-2 leading-relaxed">
                      {product.shortDescription[locale]}
                    </p>

                    {/* Price, SKU & Arrow */}
                    <div className="mt-4 pt-3 border-t border-border/40 dark:border-dark-border/40 flex items-center justify-between">
                      <div>
                        {product.price ? (
                          <span className="text-sm font-bold text-brand-blue dark:text-brand-green">
                            {formatPrice(product.price)}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-text-tertiary dark:text-dark-text-tertiary tracking-wider">
                            {product.sku}
                          </span>
                        )}
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-text-tertiary group-hover:text-brand-blue dark:group-hover:text-brand-green transition-all duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border/80 dark:border-dark-border text-sm font-semibold text-text-primary dark:text-dark-text-primary hover:border-brand-blue/40 dark:hover:border-brand-green/40 hover:text-brand-blue dark:hover:text-brand-green transition-all duration-300"
            >
              {tp("viewDetails")}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
