"use client";
import { cn } from "@/app/utils/cn";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

function Button({ className, icon, href, type, children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [dimensions, setDimensions] = useState({ width: 200, height: 48 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setDimensions({
      width: rect.width,
      height: rect.height,
    });
  };

  // Calculate spotlight radius responsively - scales with button size
  // For small buttons (~200px): ~65px, for large buttons (~500px): ~150px
  const avgDimension = (dimensions.width + dimensions.height) / 2;
  const spotlightRadius = Math.max(65, Math.min(avgDimension * 0.35, 180));

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-full",
        "px-4 py-3.5 flex justify-center items-center",
        "text-p2 font-medium transition-colors duration-300",
        // Base Styles based on type
        type === "outlined"
          ? "bg-transparent text-black border border-black/20 hover:bg-black/4"
          : type === "white"
            ? "bg-bg text-black shadow-lg hover:bg-zinc-200"
            : "bg-black text-white shadow-[inset_0px_4px_4px_rgba(255,255,255,0.25)]",
        // Layout
        icon && "flex-row gap-3.5",
        className
      )}
    >
      {/* Black Button - Dynamic Spotlight */}
      {type !== "outlined" && type !== "white" && (
        <>
          {/* Main spotlight glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  ${spotlightRadius}px circle at ${x}px ${y}px,
                  rgba(255, 255, 255, 0.4),
                  rgba(255, 255, 255, 0.1) 60%,
                  transparent 85%
                )
              `,
            }}
          />

          {/* Secondary softer glow for depth */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-60"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  ${spotlightRadius * 1.5}px circle at ${x}px ${y}px,
                  rgba(255, 255, 255, 0.08),
                  transparent 70%
                )
              `,
            }}
          />

          {/* Noise texture overlay */}
          <div
            className="absolute top-0 left-0 w-full h-full rounded-[var(--rd-md)]
            pointer-events-none opacity-[0.8] mix-blend-overlay
            bg-[url('/assets/grain.png')] bg-repeat bg-[length:20px_20px]
            "
          />

        </>
      )}

      {/* White Button - Gradient edge glow + subtle inner light */}
      {type === "white" && (
        <>
          {/* Subtle inner glow on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  ${spotlightRadius * 0.8}px circle at ${x}px ${y}px,
                  rgba(255, 255, 255, 1),
                  transparent 70%
                )
              `,
            }}
          />

          {/* Noise texture overlay */}
          <div
            className="absolute top-0 left-0 w-full h-full rounded-[var(--rd-md)]
            pointer-events-none opacity-[0.7] mix-blend-overlay
            bg-[url('/assets/grain.png')] bg-repeat bg-[length:20px_20px]
            "
          />

          {/* Edge gradient glow - creates premium feel */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 rounded-full" />
          </div>

          {/* Highlight shimmer on top edge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent blur-sm" />
          </div>

          {/* Soft shadow enhancement on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full shadow-[inset_0px_2px_8px_rgba(0,0,0,0.08),inset_0px_-2px_8px_rgba(0,0,0,0.04)]" />
        </>
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.a>
  );
}

export default Button;