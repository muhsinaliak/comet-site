"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useQuoteStore } from "@/stores/quote-store";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { FileText, Check, Plus, Minus } from "lucide-react";

export function AddToQuote({ product }: { product: Product }) {
  const t = useTranslations("products");
  const addItem = useQuoteStore((s) => s.addItem);
  const items = useQuoteStore((s) => s.items);
  const updateQuantity = useQuoteStore((s) => s.updateQuantity);
  const [mounted, setMounted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => setMounted(true), []);

  const existingItem = mounted
    ? items.find((i) => i.productId === product.id)
    : null;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      productSku: product.sku,
      productImage: product.images[0]?.src || "",
      unitPrice: product.price,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  if (existingItem) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-border dark:border-dark-border rounded-lg overflow-hidden">
          <button
            onClick={() =>
              updateQuantity(product.id, existingItem.quantity - 1)
            }
            className="px-3 py-2.5 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="px-4 py-2.5 text-sm font-semibold min-w-[3rem] text-center border-x border-border dark:border-dark-border">
            {existingItem.quantity}
          </span>
          <button
            onClick={() =>
              updateQuantity(product.id, existingItem.quantity + 1)
            }
            className="px-3 py-2.5 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-brand-green">
          <Check size={14} />
          {t("addedToQuote")}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
        justAdded
          ? "bg-brand-green text-brand-charcoal"
          : "bg-brand-blue text-white hover:bg-brand-blue-light shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/30"
      )}
    >
      {justAdded ? (
        <>
          <Check size={16} />
          {t("addedToQuote")}
        </>
      ) : (
        <>
          <FileText size={16} />
          {t("addToQuote")}
        </>
      )}
    </button>
  );
}
