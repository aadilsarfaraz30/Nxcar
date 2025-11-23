"use client";

import useWindowDimensions from "@/components/hooks/useWindowDimension";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  animationDuration?: number;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  animationDuration = 300,
}: ModalProps) {
  const { width, height } = useWindowDimensions(); // ← dynamic screen size
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<number | null>(null);

useLayoutEffect(() => {
  if (isOpen) {
    // Clear pending closing timers
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setMounted(true);
    setClosing(false);
  } else if (mounted) {
    setClosing(true);
    timerRef.current = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
      timerRef.current = null;
    }, animationDuration);
  }
}, [isOpen, mounted, animationDuration]);


useEffect(() => {
  if (mounted) {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev ?? "";
    };
  }
}, [mounted]);


  // ----------------------------
  // ESC close
  // ----------------------------
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (mounted) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [mounted, onClose]);

  if (!mounted) return null;

  // ----------------------------
  // Dynamic Sizing Rules
  // ----------------------------

  const modalWidth =
    width < 640
      ? Math.min(width * 0.9, 380) // mobile responsive width
      : Math.min(width * 0.8, 600); // desktop width

  const modalHeight =
    height < 700
      ? Math.min(height * 0.75, 500) // small screens
      : Math.min(height * 0.85, 650); // larger screens

  const backdropClass = closing ? "animate-fadeOut" : "animate-fadeIn";
  const modalClass = closing ? "animate-scaleOut" : "animate-scaleIn";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto ${backdropClass}`}
      />

      {/* Modal wrapper */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative pointer-events-auto ${modalClass}`}
        style={{
          animationDuration: `${animationDuration}ms`,
          width: modalWidth,
          maxHeight: modalHeight,
        }}
      >
        <div
          className={`bg-white rounded-xl shadow-lg overflow-y-auto p-6 ${className}`}
          style={{
            maxHeight: modalHeight,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
