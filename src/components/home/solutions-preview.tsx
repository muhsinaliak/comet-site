"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Thermometer,
  Radio,
  Building2,
  ArrowUpRight,
} from "lucide-react";

const solutions = [
  {
    key: "hvac",
    slug: "hvac",
    icon: Thermometer,
  },
  {
    key: "iot",
    slug: "industrial-iot",
    icon: Radio,
  },
  {
    key: "building",
    slug: "building-automation",
    icon: Building2,
  },
];

export function SolutionsPreview() {
  const t = useTranslations("solutions");
  const th = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <section className="py-24 bg-surface-secondary/50 dark:bg-dark-surface-secondary/50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            title={th("solutionsTitle")}
            subtitle={th("solutionsSubtitle")}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map(({ key, slug, icon: Icon }, index) => (
            <ScrollReveal key={key} delay={index * 0.12}>
              <Link href={`/solutions/${slug}`} className="group block h-full">
                <div className="card-hover h-full rounded-2xl border border-border/60 dark:border-dark-border bg-surface dark:bg-dark-surface p-8 relative overflow-hidden transition-all duration-500 group-hover:border-brand-blue/30 dark:group-hover:border-brand-green/30">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.02] to-brand-green/[0.02] dark:from-brand-blue/[0.04] dark:to-brand-green/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/[0.03] dark:bg-brand-green/[0.05] rounded-bl-[60px] group-hover:w-32 group-hover:h-32 transition-all duration-500" />

                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-brand-blue/[0.06] dark:bg-brand-green/[0.08] flex items-center justify-center mb-6 group-hover:bg-brand-blue/[0.1] dark:group-hover:bg-brand-green/[0.12] transition-colors duration-300">
                      <Icon size={26} className="text-brand-blue dark:text-brand-green" />
                    </div>

                    <h3 className="font-display text-xl font-[700] text-text-primary dark:text-dark-text-primary mb-3">
                      {t(key)}
                    </h3>

                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                      {t(`${key}Desc`)}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-blue dark:text-brand-green">
                      {tc("learnMore")}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
