"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-base", gap: "gap-1.5" },
    md: { icon: 34, text: "text-xl", gap: "gap-2" },
    lg: { icon: 44, text: "text-3xl", gap: "gap-3" },
  };

  const s = sizes[size];

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      {/* Pixel icon - matching the brand logo */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rounded square background */}
        <rect width="40" height="40" rx="10" fill="#00389e" />

        {/* Main green block (bottom-left area) */}
        <rect x="8" y="18" width="10" height="10" rx="1.5" fill="#00f26f" />
        <rect x="12" y="14" width="10" height="10" rx="1.5" fill="#00c746" opacity="0.9" />

        {/* Scatter pixels - emanating from top-right */}
        <rect x="20" y="12" width="5" height="5" rx="1" fill="#00f26f" opacity="0.9" />
        <rect x="26" y="8" width="4" height="4" rx="1" fill="#00f26f" opacity="0.7" />
        <rect x="24" y="16" width="3" height="3" rx="0.75" fill="#00f26f" opacity="0.6" />
        <rect x="30" y="13" width="3" height="3" rx="0.75" fill="#00f26f" opacity="0.45" />
        <rect x="28" y="20" width="2.5" height="2.5" rx="0.5" fill="#00f26f" opacity="0.35" />
        <rect x="32" y="8" width="2" height="2" rx="0.5" fill="#00f26f" opacity="0.25" />
        <rect x="22" y="22" width="2" height="2" rx="0.5" fill="#00f26f" opacity="0.5" />
        <rect x="16" y="10" width="3" height="3" rx="0.75" fill="#00f26f" opacity="0.55" />
        <rect x="20" y="7" width="2.5" height="2.5" rx="0.5" fill="#00f26f" opacity="0.4" />

        {/* Extra small particles */}
        <rect x="33" y="17" width="1.5" height="1.5" rx="0.5" fill="#00f26f" opacity="0.2" />
        <rect x="14" y="7" width="2" height="2" rx="0.5" fill="#00f26f" opacity="0.3" />
      </svg>

      {/* Text */}
      <div className="flex items-baseline">
        <span
          className={cn(
            "font-display font-[800] tracking-tight leading-none text-brand-blue dark:text-white",
            s.text
          )}
        >
          Comet
        </span>
        <span
          className={cn(
            "font-display font-[800] leading-none text-brand-green",
            s.text
          )}
        >
          .
        </span>
      </div>
    </div>
  );
}

export function LogoIcon({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" fill="#00389e" />
      <rect x="8" y="18" width="10" height="10" rx="1.5" fill="#00f26f" />
      <rect x="12" y="14" width="10" height="10" rx="1.5" fill="#00c746" opacity="0.9" />
      <rect x="20" y="12" width="5" height="5" rx="1" fill="#00f26f" opacity="0.9" />
      <rect x="26" y="8" width="4" height="4" rx="1" fill="#00f26f" opacity="0.7" />
      <rect x="24" y="16" width="3" height="3" rx="0.75" fill="#00f26f" opacity="0.6" />
      <rect x="30" y="13" width="3" height="3" rx="0.75" fill="#00f26f" opacity="0.45" />
      <rect x="28" y="20" width="2.5" height="2.5" rx="0.5" fill="#00f26f" opacity="0.35" />
      <rect x="32" y="8" width="2" height="2" rx="0.5" fill="#00f26f" opacity="0.25" />
      <rect x="22" y="22" width="2" height="2" rx="0.5" fill="#00f26f" opacity="0.5" />
      <rect x="16" y="10" width="3" height="3" rx="0.75" fill="#00f26f" opacity="0.55" />
      <rect x="20" y="7" width="2.5" height="2.5" rx="0.5" fill="#00f26f" opacity="0.4" />
      <rect x="33" y="17" width="1.5" height="1.5" rx="0.5" fill="#00f26f" opacity="0.2" />
      <rect x="14" y="7" width="2" height="2" rx="0.5" fill="#00f26f" opacity="0.3" />
    </svg>
  );
}
