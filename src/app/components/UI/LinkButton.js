"use client";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/app/utils/cn";

function LinkButton({
  children,
  href = "/",
  target = "_self",
  className,
  textColor = "text-black",      // Default Base Color
  shineColor = "text-white"   // Default Shine Color
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden",
        "font-medium underline decoration-current underline-offset-4 transition-colors duration-300",
        textColor,
        className
      )}
      target={target}
    >
      {/* 1. Base Text Layer */}
      <span className="relative z-10">{children}</span>

      {/* 2. Shine Overlay Layer */}
      <motion.span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-20 pointer-events-none select-none",
          "underline decoration-current underline-offset-4",
          // --- THE FIX: Hide by default, show on group hover ---
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          shineColor
        )}
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              45px circle at ${x}px ${y}px,
              black 50%,
              transparent 100%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              45px circle at ${x}px ${y}px,
              black 50%,
              transparent 100%
            )
          `,
        }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

export default LinkButton;