import { getTranslations } from "next-intl/server";
import { SolutionsPageClient } from "./solutions-page-client";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default function SolutionsPage() {
  return <SolutionsPageClient />;
}
