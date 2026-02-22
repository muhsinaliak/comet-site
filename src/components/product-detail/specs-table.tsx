"use client";

import { useLocale } from "next-intl";
import type { SpecificationGroup, Locale } from "@/types/product";
import { cn } from "@/lib/utils";

export function SpecsTable({ specs }: { specs: SpecificationGroup[] }) {
  const locale = useLocale() as Locale;

  return (
    <div className="space-y-6">
      {specs.map((group, gi) => (
        <div key={gi}>
          <h4 className="font-display text-sm font-700 uppercase tracking-wider text-brand-blue dark:text-brand-green mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-[1px] bg-brand-green" />
            {group.group[locale]}
          </h4>
          <div className="rounded-xl border border-border dark:border-dark-border overflow-hidden">
            <table className="w-full">
              <tbody>
                {group.items.map((item, ii) => (
                  <tr
                    key={ii}
                    className={cn(
                      "border-b border-border/50 dark:border-dark-border/50 last:border-b-0",
                      ii % 2 === 0
                        ? "bg-surface dark:bg-dark-surface"
                        : "bg-surface-secondary dark:bg-dark-surface-secondary"
                    )}
                  >
                    <td className="px-4 py-3 text-sm text-text-secondary dark:text-dark-text-secondary w-1/2">
                      {item.label[locale]}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                      {item.value}
                      {item.unit && (
                        <span className="ml-1 text-text-tertiary dark:text-dark-text-tertiary font-normal">
                          {item.unit}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
