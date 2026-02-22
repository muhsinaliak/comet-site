"use client";

import { Box, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelViewerFallbackProps {
  isLoading?: boolean;
  loadLabel?: string;
  onLoad?: () => void;
}

export function ModelViewerFallback({
  isLoading,
  loadLabel = "Load 3D Model",
  onLoad,
}: ModelViewerFallbackProps) {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {isLoading ? (
        <div className="flex flex-col items-center gap-3">
          <Loader size={32} className="animate-spin text-brand-green" />
          <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
            Loading 3D Model...
          </span>
        </div>
      ) : (
        <button
          onClick={onLoad}
          className={cn(
            "flex flex-col items-center gap-3 p-8 rounded-2xl",
            "bg-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm",
            "border border-border dark:border-dark-border",
            "hover:border-brand-green dark:hover:border-brand-green",
            "transition-all duration-300 group cursor-pointer"
          )}
        >
          <div className="w-16 h-16 rounded-xl bg-brand-blue/5 dark:bg-brand-green/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Box
              size={28}
              className="text-brand-blue dark:text-brand-green"
            />
          </div>
          <span className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
            {loadLabel}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-text-tertiary dark:text-dark-text-tertiary">
            Interactive 3D
          </span>
        </button>
      )}
    </div>
  );
}
