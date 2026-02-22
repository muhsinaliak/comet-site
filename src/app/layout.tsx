import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cometcontrol.com";

export const metadata: Metadata = {
  title: {
    default: "Comet Control | Akıllı HVAC & IoT Kontrol Çözümleri",
    template: "%s | Comet Control",
  },
  description:
    "Comet Control - HVAC ve IoT sektöründe yenilikçi kontrol çözümleri. Akıllı damper aktüatörleri, oda sensörleri, IoT gateway ve bina otomasyon kontrolörleri.",
  keywords: [
    "HVAC",
    "IoT",
    "kontrol",
    "otomasyon",
    "damper",
    "aktüatör",
    "sensör",
    "gateway",
    "bina otomasyonu",
  ],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    siteName: "Comet Control",
    locale: "tr_TR",
    alternateLocale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
