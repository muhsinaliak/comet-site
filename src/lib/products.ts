import productsData from "@/data/products.json";
import type { Product, ProductCategory } from "@/types/product";

const products = productsData.products as unknown as Product[];

export function getAllProducts(): Product[] {
  return products.filter((p) => p.status === "active");
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(
    (p) => p.category === category && p.status === "active"
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.status === "active");
}

export function searchProducts(query: string, locale: "tr" | "en"): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.status === "active" &&
      (p.name[locale].toLowerCase().includes(q) ||
        p.shortDescription[locale].toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.sku.toLowerCase().includes(q))
  );
}

export function getRelatedProducts(productId: string): Product[] {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  const accessoryIds = product.accessories.map((a) => a.productId);
  return products.filter(
    (p) => accessoryIds.includes(p.id) && p.status === "active"
  );
}

export function getCategories(): ProductCategory[] {
  return [...new Set(products.map((p) => p.category))];
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}
