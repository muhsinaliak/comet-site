export type Locale = "tr" | "en";
export type LocalizedString = Record<Locale, string>;

export type ProductCategory =
  | "hvac"
  | "industrial-iot"
  | "building-automation"
  | "accessories";

export interface Product {
  id: string;
  slug: string;
  sku: string;
  category: ProductCategory;
  subcategory: string;
  featured: boolean;
  name: LocalizedString;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;
  images: ProductImage[];
  model3d: Model3D | null;
  specifications: SpecificationGroup[];
  documents: ProductDocument[];
  software: SoftwareDownload[];
  accessories: AccessoryReference[];
  videos: ProductVideo[];
  tags: string[];
  status: "active" | "discontinued" | "coming-soon";
  price: ProductPrice | null;
}

export interface ProductPrice {
  amount: number;
  currency: "TRY" | "USD" | "EUR";
  discountedAmount?: number;
}

export interface ProductImage {
  src: string;
  alt: LocalizedString;
}

export interface Model3D {
  glb: string;
  poster: string;
}

export interface SpecificationGroup {
  group: LocalizedString;
  items: SpecificationItem[];
}

export interface SpecificationItem {
  label: LocalizedString;
  value: string;
  unit: string;
}

export interface ProductDocument {
  type:
    | "datasheet"
    | "installation-guide"
    | "certificate"
    | "brochure"
    | "manual";
  title: LocalizedString;
  file: string;
  fileSize: string;
  language: string;
}

export interface SoftwareDownload {
  name: string;
  version: string;
  description: LocalizedString;
  file: string;
  fileSize: string;
  platform: string;
  releaseDate: string;
}

export interface AccessoryReference {
  productId: string;
  relationship: "compatible" | "required" | "recommended";
}

export interface ProductVideo {
  title: LocalizedString;
  url: string;
  thumbnail: string;
  duration: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, LocalizedString> = {
  hvac: { tr: "HVAC Kontrol", en: "HVAC Control" },
  "industrial-iot": { tr: "Endüstriyel IoT", en: "Industrial IoT" },
  "building-automation": {
    tr: "Bina Otomasyonu",
    en: "Building Automation",
  },
  accessories: { tr: "Aksesuarlar", en: "Accessories" },
};
