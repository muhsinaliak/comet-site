"use client";

import { useTranslations, useLocale } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import type { ProductCategory, Locale } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface ProductFiltersProps {
  categories: ProductCategory[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const t = useTranslations("products");
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(currentSearch);

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== currentSearch) {
        updateParams("search", searchInput);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, currentSearch, updateParams]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary dark:text-dark-text-tertiary"
        />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className={cn(
            "w-full pl-9 pr-4 py-2.5 rounded-xl text-sm",
            "bg-surface-secondary dark:bg-dark-surface-secondary",
            "border border-border dark:border-dark-border",
            "text-text-primary dark:text-dark-text-primary",
            "placeholder:text-text-tertiary dark:placeholder:text-dark-text-tertiary",
            "focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green/50",
            "transition-all duration-200"
          )}
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams("category", "")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            !currentCategory
              ? "bg-brand-blue text-white dark:bg-brand-green dark:text-brand-charcoal"
              : "bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-secondary dark:text-dark-text-secondary hover:text-brand-blue dark:hover:text-brand-green"
          )}
        >
          {t("allCategories")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateParams("category", cat === currentCategory ? "" : cat)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              cat === currentCategory
                ? "bg-brand-blue text-white dark:bg-brand-green dark:text-brand-charcoal"
                : "bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-secondary dark:text-dark-text-secondary hover:text-brand-blue dark:hover:text-brand-green"
            )}
          >
            {CATEGORY_LABELS[cat]?.[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
