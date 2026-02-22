import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ProductPrice } from "@/types/product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  TRY: "₺",
  USD: "$",
  EUR: "€",
};

export function formatPrice(price: ProductPrice | null | undefined): string {
  if (!price) return "";
  const symbol = CURRENCY_SYMBOLS[price.currency] || price.currency;
  const formatted = price.amount.toLocaleString("en-US");
  return `${symbol}${formatted}`;
}

export function formatDiscountedPrice(price: ProductPrice): string | null {
  if (!price.discountedAmount) return null;
  const symbol = CURRENCY_SYMBOLS[price.currency] || price.currency;
  const formatted = price.discountedAmount.toLocaleString("en-US");
  return `${symbol}${formatted}`;
}
