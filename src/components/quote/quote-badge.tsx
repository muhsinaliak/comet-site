"use client";

import { useEffect, useState } from "react";
import { useQuoteStore } from "@/stores/quote-store";
import { Link } from "@/i18n/navigation";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuoteBadge() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useQuoteStore((s) => s.getItemCount());

  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/quote"
      className={cn(
        "relative p-2 rounded-lg transition-colors duration-200",
        "hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary",
        "text-text-secondary dark:text-dark-text-secondary"
      )}
      aria-label="Quote cart"
    >
      <FileText size={18} />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold text-white bg-brand-green rounded-full leading-none">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
