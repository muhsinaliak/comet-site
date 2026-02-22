import type { LocalizedString, ProductPrice } from "./product";

export interface QuoteItem {
  productId: string;
  productSlug: string;
  productName: LocalizedString;
  productSku: string;
  productImage: string;
  unitPrice: ProductPrice | null;
  quantity: number;
  notes: string;
}

export interface QuoteContact {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  position: string;
  projectDescription: string;
  preferredContactMethod: "email" | "phone";
  deadline: string;
}

export interface QuoteRequest {
  items: QuoteItem[];
  contact: QuoteContact;
}
