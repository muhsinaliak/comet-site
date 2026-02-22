"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import {
  Thermometer,
  Radio,
  Building2,
  ArrowRight,
  Wifi,
  BarChart3,
  Shield,
  Zap,
  Gauge,
  Cloud,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

const solutions = [
  {
    key: "hvac",
    slug: "hvac",
    icon: Thermometer,
    gradient: "from-blue-600 to-cyan-500",
    features: [
      { icon: Gauge, label: "Precise Temperature Control" },
      { icon: Zap, label: "Energy Optimization" },
      { icon: Wifi, label: "Remote Monitoring" },
      { icon: BarChart3, label: "Analytics Dashboard" },
    ],
  },
  {
    key: "iot",
    slug: "industrial-iot",
    icon: Radio,
    gradient: "from-green-600 to-emerald-400",
    features: [
      { icon: Cloud, label: "Cloud Integration" },
      { icon: Shield, label: "Secure Protocols" },
      { icon: BarChart3, label: "Real-time Data" },
      { icon: Zap, label: "Edge Computing" },
    ],
  },
  {
    key: "building",
    slug: "building-automation",
    icon: Building2,
    gradient: "from-purple-600 to-indigo-400",
    features: [
      { icon: Wifi, label: "BACnet/KNX/Modbus" },
      { icon: Shield, label: "Access Control" },
      { icon: Gauge, label: "HVAC Integration" },
      { icon: BarChart3, label: "Energy Management" },
    ],
  },
];

export function SolutionsPageClient() {
  const t = useTranslations("solutions");
  const tc = useTranslations("common");

  return (
    <div className="min-h-screen">
      <PageHeader title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      {/* Solutions */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {solutions.map(({ key, slug, icon: Icon, gradient, features }, index) => (
          <ScrollReveal key={key} delay={index * 0.1}>
            <div className="group rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary overflow-hidden hover:border-brand-blue/30 dark:hover:border-brand-green/30 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Left: gradient area */}
                <div
                  className={`relative p-8 lg:p-10 bg-gradient-to-br ${gradient} flex flex-col justify-between min-h-[250px]`}
                >
                  <div>
                    <Icon size={40} className="text-white/90 mb-4" />
                    <h2 className="font-display text-2xl font-800 text-white">
                      {t(key)}
                    </h2>
                  </div>
                  <Link
                    href={`/solutions/${slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors mt-6"
                  >
                    {tc("learnMore")}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Right: description + features */}
                <div className="lg:col-span-2 p-8 lg:p-10">
                  <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed mb-6">
                    {t(`${key}Desc`)}
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-green mb-4">
                    {t("features")}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {features.map(({ icon: FIcon, label }, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-surface-tertiary"
                      >
                        <FIcon
                          size={16}
                          className="text-brand-blue dark:text-brand-green shrink-0"
                        />
                        <span className="text-sm text-text-primary dark:text-dark-text-primary">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
