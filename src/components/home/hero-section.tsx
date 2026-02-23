"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Play, Zap, Shield, Wifi } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const floatingIcons = [
  { Icon: Zap, x: "85%", y: "18%", delay: 0, size: 18 },
  { Icon: Shield, x: "78%", y: "65%", delay: 0.8, size: 16 },
  { Icon: Wifi, x: "92%", y: "42%", delay: 1.6, size: 20 },
];

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Large gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/[0.04] dark:bg-brand-blue/[0.08] rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-green/[0.03] dark:bg-brand-green/[0.06] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4" />

      {/* Animated pixel scatter */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {[
          { x: "72%", y: "20%", size: 6, delay: 0, opacity: 0.7 },
          { x: "80%", y: "32%", size: 4, delay: 0.4, opacity: 0.5 },
          { x: "76%", y: "48%", size: 5, delay: 0.8, opacity: 0.6 },
          { x: "88%", y: "28%", size: 3, delay: 1.2, opacity: 0.4 },
          { x: "84%", y: "58%", size: 3, delay: 1.6, opacity: 0.35 },
          { x: "68%", y: "70%", size: 4, delay: 2, opacity: 0.45 },
          { x: "92%", y: "50%", size: 2, delay: 0.6, opacity: 0.3 },
          { x: "78%", y: "75%", size: 2, delay: 1, opacity: 0.25 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute bg-brand-green rounded-[1px]"
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
            }}
            animate={{
              opacity: [dot.opacity * 0.4, dot.opacity, dot.opacity * 0.4],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating feature icons */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {floatingIcons.map(({ Icon, x, y, delay, size }, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 + delay, ease }}
          >
            <motion.div
              className="w-12 h-12 rounded-xl bg-white/80 dark:bg-dark-surface-secondary/80 backdrop-blur-sm border border-border/50 dark:border-dark-border/50 flex items-center justify-center shadow-lg shadow-black/5 dark:shadow-black/20"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon size={size} className="text-brand-blue dark:text-brand-green" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/[0.06] dark:bg-brand-green/[0.08] border border-brand-blue/10 dark:border-brand-green/15">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-brand-green" />
                <div className="absolute w-2 h-2 rounded-full bg-brand-green animate-ping" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue dark:text-brand-green">
                HVAC & IoT Control
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
            className="mt-8 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-[900] tracking-[-0.03em] leading-[0.92] text-text-primary dark:text-dark-text-primary"
          >
            {t("heroTitle").split("&").map((part, i) =>
              i === 0 ? (
                <span key={i}>
                  {part}
                  <span className="text-brand-blue dark:text-brand-green">&amp;</span>
                </span>
              ) : (
                <span key={i} className="text-gradient-brand block sm:inline">
                  {part}
                </span>
              )
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-6 text-lg sm:text-xl text-text-secondary dark:text-dark-text-secondary max-w-lg leading-relaxed"
          >
            {t("heroSubtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.38, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue-light transition-all duration-300 shadow-lg shadow-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/25 hover:-translate-y-0.5"
            >
              {t("heroCta")}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-border/80 dark:border-dark-border text-text-primary dark:text-dark-text-primary font-semibold text-sm hover:border-brand-blue/40 dark:hover:border-brand-green/40 hover:bg-brand-blue/[0.03] dark:hover:bg-brand-green/[0.03] transition-all duration-300"
            >
              <Play size={14} className="text-brand-green fill-brand-green/20" />
              {t("heroCtaSecondary")}
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-14 flex items-center gap-6"
          >
            {[
              { value: "500+", label: "Projects" },
              { value: "12+", label: "Countries" },
              { value: "99.9%", label: "Uptime" },
            ].map(({ value, label }, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && (
                  <div className="w-px h-8 bg-border/50 dark:bg-dark-border/50" />
                )}
                <div>
                  <div className="font-display text-lg font-[800] text-text-primary dark:text-dark-text-primary">
                    {value}
                  </div>
                  <div className="text-[11px] text-text-tertiary dark:text-dark-text-tertiary uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right side: Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
          className="hidden lg:flex lg:justify-end"
        >
          <div className="relative w-80 h-[360px]">
            {/* Main device card */}
            <div className="absolute inset-4 rounded-2xl bg-white/60 dark:bg-dark-surface-secondary/60 backdrop-blur-md border border-border/60 dark:border-dark-border/50 shadow-2xl shadow-brand-blue/5 dark:shadow-black/30 overflow-hidden">
              {/* Top bar */}
              <div className="px-5 pt-4 pb-3 border-b border-border/40 dark:border-dark-border/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-green" />
                    <span className="text-[10px] font-mono font-semibold text-text-tertiary dark:text-dark-text-tertiary uppercase tracking-wider">
                      System Active
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[0.3, 0.6, 1].map((op, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-brand-green" style={{ opacity: op }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Dashboard preview */}
              <div className="p-5 space-y-4">
                {/* Temperature chart */}
                <div>
                  <div className="text-[10px] text-text-tertiary dark:text-dark-text-tertiary mb-1.5 uppercase tracking-wider font-medium">Temperature</div>
                  <div className="flex items-end gap-1 h-8">
                    {[40, 55, 45, 70, 65, 80, 75, 60, 85, 78, 72, 68].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-sm bg-brand-blue/20 dark:bg-brand-green/20"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.8, delay: 0.8 + i * 0.05, ease }}
                      />
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Airflow", value: "2.4 m/s" },
                    { label: "Humidity", value: "45%" },
                  ].map(({ label, value }, i) => (
                    <div key={i} className="rounded-lg bg-surface-secondary/80 dark:bg-dark-surface-tertiary/60 p-3">
                      <div className="text-[9px] text-text-tertiary dark:text-dark-text-tertiary uppercase tracking-wider mb-1">{label}</div>
                      <div className="font-display text-sm font-[700] text-text-primary dark:text-dark-text-primary">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-brand-green/[0.06] dark:bg-brand-green/[0.08] border border-brand-green/10 dark:border-brand-green/15">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  <span className="text-[10px] font-semibold text-brand-green-muted dark:text-brand-green">
                    All systems operational
                  </span>
                </div>
              </div>
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 360">
              <motion.line
                x1="0" y1="120" x2="16" y2="120"
                stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"
                className="text-brand-green/30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              />
              <motion.line
                x1="0" y1="240" x2="16" y2="240"
                stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"
                className="text-brand-blue/30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              />
              <motion.line
                x1="304" y1="180" x2="320" y2="180"
                stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"
                className="text-brand-green/30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
              />
            </svg>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
