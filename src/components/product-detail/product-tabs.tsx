"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { Product, Locale } from "@/types/product";
import { cn } from "@/lib/utils";
import {
  FileText,
  Download,
  Monitor,
  Puzzle,
  PlayCircle,
  ExternalLink,
} from "lucide-react";

const DOC_TYPE_LABELS: Record<string, { tr: string; en: string }> = {
  datasheet: { tr: "Veri Sayfası", en: "Datasheet" },
  "installation-guide": { tr: "Montaj Kılavuzu", en: "Installation Guide" },
  certificate: { tr: "Sertifika", en: "Certificate" },
  brochure: { tr: "Broşür", en: "Brochure" },
  manual: { tr: "Kullanım Kılavuzu", en: "Manual" },
};

export function ProductTabs({ product }: { product: Product }) {
  const t = useTranslations("products");
  const locale = useLocale() as Locale;

  const tabs = [
    {
      id: "documents",
      label: t("documents"),
      icon: FileText,
      count: product.documents.length,
    },
    {
      id: "software",
      label: t("software"),
      icon: Monitor,
      count: product.software.length,
    },
    {
      id: "accessories",
      label: t("accessories"),
      icon: Puzzle,
      count: product.accessories.length,
    },
    {
      id: "videos",
      label: t("videos"),
      icon: PlayCircle,
      count: product.videos.length,
    },
  ].filter((tab) => tab.count > 0);

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "documents");

  if (tabs.length === 0) return null;

  return (
    <div>
      {/* Tab headers */}
      <div className="flex gap-1 border-b border-border dark:border-dark-border overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-[1px] transition-colors",
              activeTab === id
                ? "border-brand-blue dark:border-brand-green text-brand-blue dark:text-brand-green"
                : "border-transparent text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary"
            )}
          >
            <Icon size={16} />
            {label}
            <span
              className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                activeTab === id
                  ? "bg-brand-blue/10 text-brand-blue dark:bg-brand-green/10 dark:text-brand-green"
                  : "bg-surface-tertiary dark:bg-dark-surface-tertiary text-text-tertiary dark:text-dark-text-tertiary"
              )}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        {activeTab === "documents" && (
          <div className="space-y-2">
            {product.documents.map((doc, i) => (
              <a
                key={i}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-border dark:border-dark-border hover:border-brand-blue/30 dark:hover:border-brand-green/30 bg-surface dark:bg-dark-surface-secondary transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <FileText size={18} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                      {doc.title[locale]}
                    </p>
                    <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-0.5">
                      {DOC_TYPE_LABELS[doc.type]?.[locale]} &middot;{" "}
                      {doc.fileSize} &middot; {doc.language.toUpperCase()}
                    </p>
                  </div>
                </div>
                <Download
                  size={16}
                  className="text-text-tertiary group-hover:text-brand-blue dark:group-hover:text-brand-green transition-colors"
                />
              </a>
            ))}
          </div>
        )}

        {activeTab === "software" && (
          <div className="space-y-3">
            {product.software.map((sw, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Monitor
                        size={16}
                        className="text-brand-blue dark:text-brand-green"
                      />
                      <h4 className="font-display text-sm font-700 text-text-primary dark:text-dark-text-primary">
                        {sw.name}
                      </h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green">
                        v{sw.version}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                      {sw.description[locale]}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                      <span>{sw.platform}</span>
                      <span>&middot;</span>
                      <span>{sw.fileSize}</span>
                      <span>&middot;</span>
                      <span>{sw.releaseDate}</span>
                    </div>
                  </div>
                  <a
                    href={sw.file}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-light transition-colors"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "accessories" && (
          <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
            {product.accessories.map((acc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary mb-2"
              >
                <Puzzle
                  size={16}
                  className="text-brand-blue dark:text-brand-green"
                />
                <span>Product ID: {acc.productId}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-surface-tertiary dark:bg-dark-surface-tertiary">
                  {acc.relationship}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.videos.map((video, i) => (
              <div
                key={i}
                className="rounded-xl border border-border dark:border-dark-border overflow-hidden bg-surface dark:bg-dark-surface-secondary"
              >
                <div className="aspect-video bg-brand-charcoal">
                  <iframe
                    src={video.url}
                    title={video.title[locale]}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                    {video.title[locale]}
                  </span>
                  <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                    {video.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
