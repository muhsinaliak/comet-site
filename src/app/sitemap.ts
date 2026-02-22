import type { MetadataRoute } from "next";
import productsData from "@/data/products.json";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://cometcontrol.com";

const LOCALES = ["tr", "en"] as const;

const STATIC_PAGES = [
  "",
  "/products",
  "/solutions",
  "/about",
  "/contact",
  "/quote",
  "/support",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Root redirect
  entries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  });

  // Static pages for each locale
  for (const locale of LOCALES) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 0.9 : 0.7,
      });
    }
  }

  // Product detail pages
  const products = productsData.products;
  for (const product of products) {
    if (product.status !== "active") continue;
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: product.featured ? 0.8 : 0.6,
      });
    }
  }

  return entries;
}
