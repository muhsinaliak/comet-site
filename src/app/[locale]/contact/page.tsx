import { getTranslations } from "next-intl/server";
import { ContactPageClient } from "./contact-page-client";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
