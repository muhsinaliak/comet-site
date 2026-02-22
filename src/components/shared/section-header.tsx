"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Pixel dot decoration */}
      <div
        className={cn(
          "flex items-center gap-1.5 mb-4",
          align === "center" && "justify-center"
        )}
      >
        <div className="w-2 h-2 rounded-[2px] bg-brand-green" />
        <div className="w-1.5 h-1.5 rounded-[1px] bg-brand-green opacity-50" />
        <div className="w-1 h-1 rounded-[1px] bg-brand-green opacity-25" />
      </div>

      <h2 className="font-display text-3xl sm:text-4xl font-[800] tracking-[-0.02em] text-text-primary dark:text-dark-text-primary">
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed",
            align === "center" && "max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
