"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggle = () => {
    const nextLocale = locale === "tr" ? "en" : "tr";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-2 rounded-lg transition-colors duration-200",
        "hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary",
        "text-text-secondary dark:text-dark-text-secondary text-sm font-medium"
      )}
      aria-label="Switch language"
    >
      <Globe size={16} />
      <span className="uppercase text-xs font-semibold tracking-wider">
        {locale === "tr" ? "EN" : "TR"}
      </span>
    </button>
  );
}
