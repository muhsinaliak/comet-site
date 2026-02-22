import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuoteItem } from "@/types/quote";
import type { LocalizedString, ProductPrice } from "@/types/product";

interface QuoteStore {
  items: QuoteItem[];
  addItem: (item: {
    productId: string;
    productSlug: string;
    productName: LocalizedString;
    productSku: string;
    productImage: string;
    unitPrice: ProductPrice | null;
  }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, unitPrice: item.unitPrice, quantity: 1, notes: "" }],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        })),
      updateNotes: (productId, notes) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, notes } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "comet-quote-cart" }
  )
);
