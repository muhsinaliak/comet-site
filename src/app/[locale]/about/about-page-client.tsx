"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Target, Eye, Users, Award, Lightbulb, Heart } from "lucide-react";

const team = [
  { name: "Ahmet Yılmaz", role: "CEO & Founder", icon: Award },
  { name: "Elif Demir", role: "CTO", icon: Lightbulb },
  { name: "Mehmet Kaya", role: "Head of Engineering", icon: Users },
  { name: "Zeynep Arslan", role: "Product Manager", icon: Heart },
];

export function AboutPageClient() {
  const t = useTranslations("about");

  return (
    <div className="min-h-screen">
      <PageHeader title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <SectionHeader title={t("storyTitle")} align="left" />
              <p className="text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {t("storyText")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-surface-secondary dark:bg-dark-surface-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="p-8 rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/5 dark:bg-brand-green/10 flex items-center justify-center mb-5">
                  <Eye size={24} className="text-brand-blue dark:text-brand-green" />
                </div>
                <h3 className="font-display text-xl font-700 text-text-primary dark:text-dark-text-primary mb-3">
                  {t("visionTitle")}
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {t("visionText")}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/5 dark:bg-brand-green/10 flex items-center justify-center mb-5">
                  <Target size={24} className="text-brand-blue dark:text-brand-green" />
                </div>
                <h3 className="font-display text-xl font-700 text-text-primary dark:text-dark-text-primary mb-3">
                  {t("missionTitle")}
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {t("missionText")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeader title={t("teamTitle")} />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, icon: Icon }, index) => (
              <ScrollReveal key={name} delay={index * 0.1}>
                <div className="card-hover text-center p-6 rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary">
                  <div className="w-20 h-20 rounded-full bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center mx-auto mb-4">
                    <Icon size={28} className="text-brand-blue dark:text-brand-green" />
                  </div>
                  <h4 className="font-display text-base font-700 text-text-primary dark:text-dark-text-primary">
                    {name}
                  </h4>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                    {role}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
