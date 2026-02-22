"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useQuoteStore } from "@/stores/quote-store";
import type { Locale } from "@/types/product";
import { cn, formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import {
  FileText,
  Trash2,
  Plus,
  Minus,
  PackageOpen,
  ArrowRight,
  Send,
  Check,
  ShoppingCart,
} from "lucide-react";

export function QuotePageClient() {
  const t = useTranslations("quote");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const {
    items,
    removeItem,
    updateQuantity,
    updateNotes,
    clearCart,
    getItemCount,
  } = useQuoteStore();
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    position: "",
    projectDescription: "",
    preferredContactMethod: "email" as "email" | "phone",
    deadline: "",
  });

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, contact: form }),
      });
      setSubmitted(true);
      clearCart();
    } catch {
      setSubmitted(true);
      clearCart();
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-tertiary">{tc("loading")}</div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-brand-green" />
          </div>
          <h2 className="font-display text-2xl font-800 text-text-primary dark:text-dark-text-primary mb-3">
            {t("successTitle")}
          </h2>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
            {t("successMessage")}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue-light transition-colors"
          >
            {t("browseProducts")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <PackageOpen
            size={64}
            className="mx-auto text-text-tertiary/30 dark:text-dark-text-tertiary/30 mb-6"
            strokeWidth={1}
          />
          <h2 className="font-display text-xl font-700 text-text-primary dark:text-dark-text-primary mb-2">
            {t("emptyCart")}
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue-light transition-colors"
          >
            {t("browseProducts")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeader title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-700 text-text-primary dark:text-dark-text-primary flex items-center gap-2">
                <ShoppingCart size={18} />
                {t("cartSummary")} ({getItemCount()} {t("items")})
              </h3>
            </div>

            {items.map((item) => (
              <div
                key={item.productId}
                className="p-4 rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-display text-sm font-700 text-text-primary dark:text-dark-text-primary">
                      {item.productName[locale]}
                    </h4>
                    <p className="text-xs font-mono text-text-tertiary dark:text-dark-text-tertiary mt-0.5">
                      {item.productSku}
                    </p>
                    {item.unitPrice && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-brand-blue dark:text-brand-green">
                          {formatPrice(item.unitPrice)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                            x {item.quantity} = {formatPrice({ ...item.unitPrice, amount: item.unitPrice.amount * item.quantity })}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-border dark:border-dark-border rounded-lg">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="px-2.5 py-1.5 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold min-w-[2.5rem] text-center border-x border-border dark:border-dark-border">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="px-2.5 py-1.5 hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="p-2 rounded-lg text-text-tertiary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Notes */}
                <input
                  type="text"
                  value={item.notes}
                  onChange={(e) => updateNotes(item.productId, e.target.value)}
                  placeholder={t("notes")}
                  className="mt-3 w-full px-3 py-2 rounded-lg text-sm bg-surface-tertiary dark:bg-dark-surface-tertiary border-0 text-text-primary dark:text-dark-text-primary placeholder:text-text-tertiary dark:placeholder:text-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                />
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary">
              <h3 className="font-display text-lg font-700 text-text-primary dark:text-dark-text-primary mb-6">
                {t("yourInfo")}
              </h3>

              <div className="space-y-4">
                {[
                  { key: "companyName", type: "text", required: true },
                  { key: "contactPerson", type: "text", required: true },
                  { key: "email", type: "email", required: true },
                  { key: "phone", type: "tel", required: true },
                  { key: "position", type: "text", required: false },
                  { key: "deadline", type: "text", required: false },
                ].map(({ key, type, required }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-text-secondary dark:text-dark-text-secondary mb-1.5 uppercase tracking-wider">
                      {t(key)}
                      {required && <span className="text-red-500 ml-0.5">*</span>}
                    </label>
                    <input
                      type={type}
                      required={required}
                      value={form[key as keyof typeof form] as string}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      className={cn(
                        "w-full px-3 py-2.5 rounded-lg text-sm",
                        "bg-surface-secondary dark:bg-dark-surface-tertiary",
                        "border border-border dark:border-dark-border",
                        "text-text-primary dark:text-dark-text-primary",
                        "focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green/50",
                        "transition-all duration-200"
                      )}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-text-secondary dark:text-dark-text-secondary mb-1.5 uppercase tracking-wider">
                    {t("projectDescription")}
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.projectDescription}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        projectDescription: e.target.value,
                      }))
                    }
                    className={cn(
                      "w-full px-3 py-2.5 rounded-lg text-sm resize-none",
                      "bg-surface-secondary dark:bg-dark-surface-tertiary",
                      "border border-border dark:border-dark-border",
                      "text-text-primary dark:text-dark-text-primary",
                      "focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green/50",
                      "transition-all duration-200"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary dark:text-dark-text-secondary mb-1.5 uppercase tracking-wider">
                    {t("preferredContact")}
                  </label>
                  <div className="flex gap-3">
                    {(["email", "phone"] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            preferredContactMethod: method,
                          }))
                        }
                        className={cn(
                          "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                          form.preferredContactMethod === method
                            ? "bg-brand-blue text-white dark:bg-brand-green dark:text-brand-charcoal"
                            : "bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-secondary dark:text-dark-text-secondary"
                        )}
                      >
                        {method === "email" ? "E-posta" : "Telefon"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-green text-brand-charcoal font-bold text-sm hover:bg-brand-green-muted transition-all duration-300 shadow-lg shadow-brand-green/20"
              >
                <Send size={16} />
                {t("submitQuote")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
