"use client";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-secondary/60 dark:bg-dark-surface-secondary/60 border-b border-border/60 dark:border-dark-border/60", className)}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-brand-green/[0.02] dark:bg-brand-green/[0.04] rounded-bl-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        {/* Pixel dots */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-2 h-2 rounded-[2px] bg-brand-green" />
          <div className="w-1.5 h-1.5 rounded-[1px] bg-brand-green opacity-50" />
          <div className="w-1 h-1 rounded-[1px] bg-brand-green opacity-25" />
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-[800] tracking-[-0.02em] text-text-primary dark:text-dark-text-primary">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
