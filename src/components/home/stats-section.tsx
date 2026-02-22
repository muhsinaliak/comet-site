"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";

const stats = [
  { key: "statsProducts", value: 20, suffix: "+" },
  { key: "statsProjects", value: 500, suffix: "+" },
  { key: "statsCountries", value: 12, suffix: "" },
  { key: "statsPartners", value: 30, suffix: "+" },
];

export function StatsSection() {
  const t = useTranslations("home");

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-blue" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />

      {/* Accent glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-green/10 rounded-full blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-green/5 rounded-full blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map(({ key, value, suffix }, index) => (
            <ScrollReveal key={key} delay={index * 0.1}>
              <div className="text-center relative">
                {/* Separator line between items on larger screens */}
                {index > 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
                )}
                <div className="font-display text-4xl sm:text-5xl font-[900] text-white mb-2 tracking-tight">
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>
                <div className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.15em]">
                  {t(key)}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
