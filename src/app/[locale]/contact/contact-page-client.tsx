"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Clock,
} from "lucide-react";

export function ContactPageClient() {
  const t = useTranslations("contact");
  const tf = useTranslations("footer");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch { /* ignore */ }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <PageHeader title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info cards */}
          <div className="space-y-4">
            <ScrollReveal>
              <div className="p-6 rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary">
                <h3 className="font-display text-lg font-700 text-text-primary dark:text-dark-text-primary mb-5">
                  {t("officeTitle")}
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, text: tf("address") },
                    { icon: Phone, text: tf("phone") },
                    { icon: Mail, text: tf("email") },
                    { icon: Clock, text: "09:00 - 18:00 (GMT+3)" },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/5 dark:bg-brand-green/10 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-brand-blue dark:text-brand-green" />
                      </div>
                      <span className="text-sm text-text-secondary dark:text-dark-text-secondary pt-1.5">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.1}>
              {submitted ? (
                <div className="p-12 rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-brand-green" />
                  </div>
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    {t("successMessage")}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-secondary"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "formName", name: "name", type: "text", full: false },
                      { key: "formEmail", name: "email", type: "email", full: false },
                      { key: "formSubject", name: "subject", type: "text", full: true },
                    ].map(({ key, name, type, full }) => (
                      <div key={name} className={full ? "sm:col-span-2" : ""}>
                        <label className="block text-xs font-semibold text-text-secondary dark:text-dark-text-secondary mb-1.5 uppercase tracking-wider">
                          {t(key)}
                        </label>
                        <input
                          type={type}
                          required
                          value={form[name as keyof typeof form]}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, [name]: e.target.value }))
                          }
                          className={cn(
                            "w-full px-4 py-3 rounded-xl text-sm",
                            "bg-surface-secondary dark:bg-dark-surface-tertiary",
                            "border border-border dark:border-dark-border",
                            "text-text-primary dark:text-dark-text-primary",
                            "focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green/50",
                            "transition-all duration-200"
                          )}
                        />
                      </div>
                    ))}

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-text-secondary dark:text-dark-text-secondary mb-1.5 uppercase tracking-wider">
                        {t("formMessage")}
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        className={cn(
                          "w-full px-4 py-3 rounded-xl text-sm resize-none",
                          "bg-surface-secondary dark:bg-dark-surface-tertiary",
                          "border border-border dark:border-dark-border",
                          "text-text-primary dark:text-dark-text-primary",
                          "focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green/50",
                          "transition-all duration-200"
                        )}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue-light transition-all duration-300 shadow-lg shadow-brand-blue/20"
                  >
                    <Send size={16} />
                    {t("formSubmit")}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
