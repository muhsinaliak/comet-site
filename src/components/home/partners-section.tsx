"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const partners = [
  "Siemens",
  "Schneider",
  "Honeywell",
  "ABB",
  "Johnson Controls",
  "Danfoss",
];

export function PartnersSection() {
  const t = useTranslations("home");

  return (
    <section className="py-16 border-y border-border/50 dark:border-dark-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary dark:text-dark-text-tertiary mb-10">
            {t("partnersTitle")}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partners.map((name, i) => (
            <ScrollReveal key={name} delay={i * 0.05}>
              <div className="flex items-center justify-center h-14 rounded-xl bg-surface-secondary/50 dark:bg-dark-surface-secondary/50 px-6 opacity-30 hover:opacity-70 transition-all duration-300 hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary">
                <span className="font-display text-sm font-[700] text-text-secondary dark:text-dark-text-secondary tracking-wider uppercase whitespace-nowrap">
                  {name}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
