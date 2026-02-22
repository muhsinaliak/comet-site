"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import {
  ChevronDown,
  FileText,
  Download,
  Monitor,
  HelpCircle,
  BookOpen,
  Search,
} from "lucide-react";

const FAQ_ITEMS = [
  {
    q: { tr: "Ürünlerin garanti süresi ne kadardır?", en: "What is the warranty period for products?" },
    a: { tr: "Tüm Comet Control ürünleri 2 yıl standart garanti ile sunulmaktadır. Ek garanti paketleri için satış ekibimizle iletişime geçebilirsiniz.", en: "All Comet Control products come with a 2-year standard warranty. Contact our sales team for extended warranty packages." },
  },
  {
    q: { tr: "Teknik destek nasıl alabilirim?", en: "How can I get technical support?" },
    a: { tr: "Teknik destek için support@cometcontrol.com adresine e-posta gönderebilir veya +90 (212) 000 00 00 numarasını arayabilirsiniz. Çalışma saatleri: Pzt-Cuma 09:00-18:00.", en: "For technical support, email support@cometcontrol.com or call +90 (212) 000 00 00. Working hours: Mon-Fri 09:00-18:00." },
  },
  {
    q: { tr: "Ürünleriniz hangi protokolleri destekliyor?", en: "Which protocols do your products support?" },
    a: { tr: "Ürünlerimiz BACnet IP/MSTP, Modbus TCP/RTU, KNX, MQTT ve REST API protokollerini desteklemektedir. Ürüne göre desteklenen protokoller farklılık gösterebilir.", en: "Our products support BACnet IP/MSTP, Modbus TCP/RTU, KNX, MQTT and REST API protocols. Supported protocols may vary by product." },
  },
  {
    q: { tr: "Siparişimi nasıl takip edebilirim?", en: "How can I track my order?" },
    a: { tr: "Sipariş onayı ile birlikte size bir takip numarası gönderilecektir. Bu numara ile kargo takibi yapabilirsiniz. Detaylar için satış ekibimizle iletişime geçin.", en: "A tracking number will be sent to you with the order confirmation. You can track your shipment with this number. Contact our sales team for details." },
  },
  {
    q: { tr: "Toplu alımlarda indirim var mı?", en: "Do you offer bulk purchase discounts?" },
    a: { tr: "Evet, toplu alımlarda özel fiyatlandırma uygulanmaktadır. Teklif almak için ürünleri sepetinize ekleyip teklif talebi gönderebilirsiniz.", en: "Yes, we offer special pricing for bulk purchases. You can add products to your cart and submit a quote request." },
  },
];

export function SupportPageClient() {
  const t = useTranslations("support");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const currentLocale = useLocale() as "tr" | "en";

  return (
    <div className="min-h-screen">
      <PageHeader title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { icon: HelpCircle, label: t("faqTitle"), color: "text-blue-500", href: "#faq" },
            { icon: BookOpen, label: t("docsTitle"), color: "text-green-500", href: "#docs" },
            { icon: Monitor, label: t("downloadsTitle"), color: "text-purple-500", href: "#downloads" },
          ].map(({ icon: Icon, label, color, href }, i) => (
            <ScrollReveal key={href} delay={i * 0.1}>
              <a
                href={href}
                className="card-hover flex items-center gap-4 p-5 rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center">
                  <Icon size={20} className={color} />
                </div>
                <span className="font-display text-sm font-700 text-text-primary dark:text-dark-text-primary">
                  {label}
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* FAQ */}
        <section id="faq" className="mb-16">
          <ScrollReveal>
            <SectionHeader title={t("faqTitle")} align="left" />
          </ScrollReveal>

          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="text-sm font-semibold text-text-primary dark:text-dark-text-primary pr-4">
                      {item.q[currentLocale]}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "shrink-0 text-text-tertiary transition-transform duration-200",
                        openFaq === i && "rotate-180"
                      )}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed border-t border-border/50 dark:border-dark-border/50 pt-3">
                      {item.a[currentLocale]}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Documents placeholder */}
        <section id="docs" className="mb-16">
          <ScrollReveal>
            <SectionHeader title={t("docsTitle")} align="left" />
          </ScrollReveal>
          <div className="p-8 rounded-2xl border border-dashed border-border dark:border-dark-border text-center">
            <FileText size={40} className="mx-auto text-text-tertiary/30 mb-3" strokeWidth={1} />
            <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
              Technical documents will be available here
            </p>
          </div>
        </section>

        {/* Downloads placeholder */}
        <section id="downloads">
          <ScrollReveal>
            <SectionHeader title={t("downloadsTitle")} align="left" />
          </ScrollReveal>
          <div className="p-8 rounded-2xl border border-dashed border-border dark:border-dark-border text-center">
            <Download size={40} className="mx-auto text-text-tertiary/30 mb-3" strokeWidth={1} />
            <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
              Software downloads will be available here
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
