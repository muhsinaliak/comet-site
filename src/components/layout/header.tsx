"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "../shared/logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { QuoteBadge } from "../quote/quote-badge";
import { Menu, X, ChevronRight } from "lucide-react";

const NAV_ITEMS = [
  { key: "products", href: "/products" },
  { key: "solutions", href: "/solutions" },
  { key: "about", href: "/about" },
  { key: "support", href: "/support" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-xl py-2.5 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]"
            : "bg-transparent py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="group relative">
              <Logo size="md" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 bg-surface-secondary/60 dark:bg-dark-surface-secondary/60 backdrop-blur-sm rounded-full px-1.5 py-1.5 border border-border/40 dark:border-dark-border/40">
              {NAV_ITEMS.map(({ key, href }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={key}
                    href={href}
                    className={cn(
                      "relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-300",
                      isActive
                        ? "bg-brand-blue text-white dark:bg-brand-green dark:text-brand-charcoal shadow-sm"
                        : "text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary hover:bg-surface-tertiary/80 dark:hover:bg-dark-surface-tertiary/80"
                    )}
                  >
                    {t(key)}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <div className="hidden sm:flex items-center gap-1 mr-2">
                <LocaleSwitcher />
                <ThemeToggle />
              </div>
              <QuoteBadge />

              <Link
                href="/quote"
                className="hidden lg:inline-flex items-center gap-1.5 ml-2 px-4 py-1.5 rounded-full bg-brand-green text-brand-charcoal text-[13px] font-semibold hover:bg-brand-green-muted transition-colors shadow-sm"
              >
                {t("getQuote")}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 ml-1 rounded-xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileOpen ? "visible" : "invisible pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white dark:bg-[#0a0f1c] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="pt-20 px-6">
            <nav className="space-y-1">
              {NAV_ITEMS.map(({ key, href }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={key}
                    href={href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-colors",
                      isActive
                        ? "bg-brand-blue/5 text-brand-blue dark:bg-brand-green/10 dark:text-brand-green"
                        : "text-text-secondary dark:text-dark-text-secondary hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary"
                    )}
                  >
                    {t(key)}
                    <ChevronRight size={16} className="opacity-30" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-border dark:border-dark-border space-y-3">
              <div className="flex items-center gap-2 px-4">
                <LocaleSwitcher />
                <ThemeToggle />
              </div>
              <Link
                href="/quote"
                className="flex items-center justify-center w-full px-6 py-3 rounded-xl bg-brand-green text-brand-charcoal font-semibold hover:bg-brand-green-muted transition-colors"
              >
                {t("getQuote")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
