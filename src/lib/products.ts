import fs from "fs";
import path from "path";
import type { Product, ProductCategory } from "@/types/product";

const DATA_PATH = path.join(process.cwd(), "src/data/products.json");

function readProducts(): Product[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);
    return data.products as Product[];
  } catch {
    return [];
  }
}

export function getAllProducts(): Product[] {
  return readProducts().filter((p) => p.status === "active");
}

export function getProductBySlug(slug: string): Product | undefined {
  return readProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return readProducts().filter(
    (p) => p.category === category && p.status === "active"
  );
}

export function getFeaturedProducts(): Product[] {
  return readProducts().filter((p) => p.featured && p.status === "active");
}

export function searchProducts(query: string, locale: "tr" | "en"): Product[] {
  const q = query.toLowerCase();
  return readProducts().filter(
    (p) =>
      p.status === "active" &&
      (p.name[locale].toLowerCase().includes(q) ||
        p.shortDescription[locale].toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.sku.toLowerCase().includes(q))
  );
}

export function getRelatedProducts(productId: string): Product[] {
  const products = readProducts();
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  const accessoryIds = product.accessories.map((a) => a.productId);
  return products.filter(
    (p) => accessoryIds.includes(p.id) && p.status === "active"
  );
}

export function getCategories(): ProductCategory[] {
  return [...new Set(readProducts().map((p) => p.category))];
}

export function getAllSlugs(): string[] {
  return readProducts().map((p) => p.slug);
}
