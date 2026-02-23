export const dynamic = "force-dynamic";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { SolutionsPreview } from "@/components/home/solutions-preview";
import { StatsSection } from "@/components/home/stats-section";
import { PartnersSection } from "@/components/home/partners-section";
import { CtaSection } from "@/components/home/cta-section";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <SolutionsPreview />
      <StatsSection />
      <PartnersSection />
      <CtaSection />
    </>
  );
}
