"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const t = useTranslations("home");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden bg-brand-charcoal p-12 sm:p-16 lg:p-20">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,242,111,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,111,0.5) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
            </div>

            {/* Gradient orbs */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-green/8 rounded-full blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px]" />

            <div className="relative text-center max-w-2xl mx-auto">
              {/* Pixel accent */}
              <div className="flex items-center justify-center gap-1.5 mb-8">
                {[0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2].map((op, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-[1px] bg-brand-green"
                    style={{ opacity: op }}
                  />
                ))}
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-[800] text-white tracking-tight leading-tight">
                {t("ctaTitle")}
              </h2>
              <p className="mt-4 text-lg text-white/50 leading-relaxed">
                {t("ctaSubtitle")}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-brand-green text-brand-charcoal font-bold text-sm hover:bg-brand-green-muted transition-all duration-300 shadow-lg shadow-brand-green/15 hover:shadow-xl hover:shadow-brand-green/20 hover:-translate-y-0.5"
                >
                  {t("ctaButton")}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 font-semibold text-sm hover:border-white/20 hover:text-white transition-all duration-300"
                >
                  {t("featuredTitle")}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
