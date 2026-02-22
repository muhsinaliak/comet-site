"use client";

import type { ReactNode } from "react";
import type { ProductCategory } from "@/types/product";

const illustrations: Record<ProductCategory | string, ReactNode> = {
  hvac: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="40" y="50" width="120" height="100" rx="12" fill="currentColor" opacity="0.06" />
      <rect x="50" y="60" width="100" height="80" rx="8" fill="currentColor" opacity="0.04" />
      {/* Actuator body */}
      <rect x="65" y="70" width="70" height="55" rx="6" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <rect x="75" y="80" width="50" height="12" rx="3" fill="currentColor" opacity="0.08" />
      <circle cx="100" cy="97" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      <circle cx="100" cy="97" r="4" fill="#00f26f" opacity="0.6" />
      {/* Connector */}
      <rect x="93" y="125" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <circle cx="100" cy="135" r="3" fill="currentColor" opacity="0.15" />
      {/* Status LED */}
      <circle cx="125" cy="78" r="3" fill="#00f26f" opacity="0.5" />
      {/* Data lines */}
      <line x1="70" y1="110" x2="130" y2="110" stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
      <line x1="70" y1="115" x2="120" y2="115" stroke="currentColor" strokeWidth="0.75" opacity="0.08" />
    </svg>
  ),
  "industrial-iot": (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="40" y="50" width="120" height="100" rx="12" fill="currentColor" opacity="0.06" />
      {/* Gateway box */}
      <rect x="60" y="65" width="80" height="60" rx="6" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      {/* Ports */}
      <rect x="68" y="108" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <rect x="80" y="108" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      {/* LEDs */}
      <circle cx="72" cy="75" r="2.5" fill="#00f26f" opacity="0.5" />
      <circle cx="80" cy="75" r="2.5" fill="#00f26f" opacity="0.35" />
      <circle cx="88" cy="75" r="2.5" fill="currentColor" opacity="0.15" />
      {/* Screen area */}
      <rect x="68" y="82" width="64" height="20" rx="3" fill="currentColor" opacity="0.05" />
      <rect x="72" y="87" width="30" height="2" rx="1" fill="#00f26f" opacity="0.3" />
      <rect x="72" y="92" width="20" height="2" rx="1" fill="currentColor" opacity="0.12" />
      {/* Antenna */}
      <line x1="130" y1="65" x2="130" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <circle cx="130" cy="47" r="3" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      {/* Signal waves */}
      <path d="M135 55 C140 50, 140 42, 135 37" stroke="#00f26f" strokeWidth="1" opacity="0.25" fill="none" />
      <path d="M138 58 C146 50, 146 38, 138 30" stroke="#00f26f" strokeWidth="1" opacity="0.15" fill="none" />
    </svg>
  ),
  "building-automation": (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="40" y="50" width="120" height="100" rx="12" fill="currentColor" opacity="0.06" />
      {/* Controller box */}
      <rect x="55" y="60" width="90" height="75" rx="6" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      {/* DIN rail clips */}
      <rect x="55" y="135" width="12" height="8" rx="1" fill="currentColor" opacity="0.1" />
      <rect x="133" y="135" width="12" height="8" rx="1" fill="currentColor" opacity="0.1" />
      {/* Terminal blocks top */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={62 + i * 10} y="63" width="6" height="8" rx="1" fill="currentColor" opacity="0.12" />
      ))}
      {/* Display */}
      <rect x="65" y="78" width="70" height="22" rx="3" fill="currentColor" opacity="0.05" />
      <rect x="70" y="83" width="40" height="2.5" rx="1" fill="#00f26f" opacity="0.35" />
      <rect x="70" y="89" width="25" height="2" rx="1" fill="currentColor" opacity="0.12" />
      {/* LEDs row */}
      <circle cx="72" cy="108" r="2" fill="#00f26f" opacity="0.5" />
      <circle cx="80" cy="108" r="2" fill="#00f26f" opacity="0.3" />
      <circle cx="88" cy="108" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="96" cy="108" r="2" fill="currentColor" opacity="0.15" />
      {/* Ethernet port */}
      <rect x="110" y="103" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    </svg>
  ),
  accessories: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="40" y="50" width="120" height="100" rx="12" fill="currentColor" opacity="0.06" />
      {/* Power supply body */}
      <rect x="70" y="60" width="60" height="80" rx="5" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      {/* DIN rail slot */}
      <rect x="85" y="140" width="30" height="6" rx="1" fill="currentColor" opacity="0.1" />
      {/* Input/output labels */}
      <rect x="78" y="68" width="22" height="8" rx="2" fill="currentColor" opacity="0.08" />
      <rect x="78" y="118" width="22" height="8" rx="2" fill="currentColor" opacity="0.08" />
      {/* LED */}
      <circle cx="115" cy="72" r="3" fill="#00f26f" opacity="0.5" />
      {/* Ventilation slots */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="80" y={88 + i * 6} width="40" height="2" rx="1" fill="currentColor" opacity="0.06" />
      ))}
    </svg>
  ),
};

export function ProductIllustration({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {illustrations[category] || illustrations["accessories"]}
    </div>
  );
}
