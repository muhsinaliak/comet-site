"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "../shared/logo";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = {
  products: [
    { key: "products", href: "/products" },
    { key: "solutions", href: "/solutions" },
  ],
  company: [
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ],
  resources: [
    { key: "support", href: "/support" },
    { key: "quote", href: "/quote" },
  ],
};

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  return (
    <footer className="relative bg-brand-charcoal text-white overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal via-brand-charcoal to-[#1a1a1a]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,242,111,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,111,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Top decorative line */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Logo size="md" className="[&_span]:!text-white" />
            <p className="text-white/50 text-sm leading-relaxed mt-5 max-w-xs">
              {t("description")}
            </p>

            {/* Contact details */}
            <div className="mt-6 space-y-2.5">
              <a
                href="mailto:info@cometcontrol.com"
                className="flex items-center gap-2.5 text-sm text-white/40 hover:text-brand-green transition-colors duration-200 group"
              >
                <Mail size={14} className="shrink-0 text-brand-green/50 group-hover:text-brand-green transition-colors" />
                {t("email")}
              </a>
              <a
                href="tel:+902121234567"
                className="flex items-center gap-2.5 text-sm text-white/40 hover:text-brand-green transition-colors duration-200 group"
              >
                <Phone size={14} className="shrink-0 text-brand-green/50 group-hover:text-brand-green transition-colors" />
                {t("phone")}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/40">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-green/50" />
                {t("address")}
              </div>
            </div>
          </div>

          {/* Products & Solutions */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-4">
              {tc("products")}
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.products.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1 text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {tc(key)}
                    <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 group-hover:opacity-60 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1 text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {tc(key)}
                    <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 group-hover:opacity-60 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-4">
              {t("resources")}
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1 text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {tc(key)}
                    <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 group-hover:opacity-60 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-4">
              {t("contactInfo")}
            </h4>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-semibold hover:bg-brand-green/20 hover:border-brand-green/30 transition-all duration-300"
            >
              {tc("getQuote")}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Comet Control. {t("copyright")}
          </p>
          {/* Pixel decoration */}
          <div className="flex items-center gap-1">
            {[0.15, 0.3, 0.5, 0.8, 1, 0.8, 0.5, 0.3, 0.15].map((op, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-[1px] bg-brand-green"
                style={{ opacity: op }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
