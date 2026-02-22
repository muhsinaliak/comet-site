"use client";

import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useGLTF, Center, Html } from "@react-three/drei";
import { RotateCcw, Maximize, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <Loader size={24} className="animate-spin text-brand-green" />
        <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
          Loading 3D...
        </span>
      </div>
    </Html>
  );
}

interface ModelViewerProps {
  glbUrl: string;
  resetLabel: string;
  fullscreenLabel: string;
}

export default function ModelViewer({
  glbUrl,
  resetLabel,
  fullscreenLabel,
}: ModelViewerProps) {
  const controlsRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-surface-secondary dark:bg-dark-surface-secondary border border-border dark:border-dark-border"
    >
      <Canvas
        camera={{ position: [3, 2, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Suspense fallback={<LoadingSpinner />}>
          <Model url={glbUrl} />
          <Environment preset="studio" />
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.3}
            scale={10}
            blur={2}
          />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          autoRotate
          autoRotateSpeed={1}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          onClick={resetCamera}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
            "bg-white/80 dark:bg-brand-charcoal/80 backdrop-blur-sm",
            "text-text-primary dark:text-dark-text-primary",
            "hover:bg-white dark:hover:bg-brand-charcoal",
            "transition-colors shadow-sm"
          )}
        >
          <RotateCcw size={12} />
          {resetLabel}
        </button>
        <button
          onClick={toggleFullscreen}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
            "bg-white/80 dark:bg-brand-charcoal/80 backdrop-blur-sm",
            "text-text-primary dark:text-dark-text-primary",
            "hover:bg-white dark:hover:bg-brand-charcoal",
            "transition-colors shadow-sm"
          )}
        >
          <Maximize size={12} />
          {fullscreenLabel}
        </button>
      </div>

      {/* 3D badge */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-charcoal/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
        3D Interactive
      </div>
    </div>
  );
}
