"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Mail,
  MessageCircle,
  ArrowUpRight,
  Calendar,
  Monitor,
  MapPin,
  Linkedin,
  Copy,
  Check,
  Sparkles,
  Send,
  Sun,
  Moon,
  Laptop
} from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "./utils/cn";

// --- Theme Hook ---
function useTheme() {
  const [theme, setTheme] = useState("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const activeTheme = theme === "system" ? systemTheme : theme;

    if (activeTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  return { theme, setTheme, mounted };
}

// --- Components ---

function Card({ className, children, href, noHover = false, onClick }) {
  const Component = href ? Link : motion.div;
  const props = href ? { href, target: "_blank" } : { onClick };

  return (
    <Component
      {...props}
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-3xl p-6",
        // --- Light Mode Styles (Refined) ---
        "bg-white/70 border border-neutral-200/60 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.1)]",
        !noHover && "hover:border-neutral-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1",

        // --- Dark Mode Styles ---
        "dark:bg-neutral-900/50 dark:border-white/5 dark:shadow-none",
        !noHover && "dark:hover:bg-neutral-900/80 dark:hover:border-white/10 dark:hover:shadow-2xl dark:hover:shadow-black/50",

        // --- Common Transitions ---
        "backdrop-blur-xl transition-all duration-500 ease-in-out",
        className
      )}
    >
      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-overlay transition-opacity duration-500"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </Component>
  );
}

function ThemeToggle({ theme, setTheme }) {
  const modes = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "system", icon: Laptop, label: "Auto" },
    { id: "dark", icon: Moon, label: "Dark" },
  ];

  return (
    <div className="fixed top-6 z-50 p-1.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-white/10 backdrop-blur-xl shadow-lg dark:shadow-black/20 flex items-center gap-1.5 transition-colors duration-500">
      {modes.map((mode) => {
        const isActive = theme === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => setTheme(mode.id)}
            className={cn(
              "relative px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-500",
              isActive
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="theme-pill"
                className="absolute inset-0 bg-neutral-200/80 dark:bg-white/10 rounded-full z-[-1] shadow-sm dark:shadow-none"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <div className="relative z-10 flex items-center gap-2">
              <mode.icon size={14} className={cn("transition-transform duration-300", isActive && "scale-110")} />
              <span className="hidden sm:block">{mode.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Dynamic variable for spotlight color to ensure it works in both modes
  const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, var(--spotlight-color), transparent 80%)`;

  return (
    <div className="fixed inset-0 z-[-1] transition-colors duration-700 ease-in-out bg-[#F2F2F2] dark:bg-[#030303]">
      <style jsx global>{`
        :root { --spotlight-color: rgba(0,0,0,0.04); }
        .dark { --spotlight-color: rgba(255,255,255,0.06); }
      `}</style>

      {/* Moving Spotlight */}
      <motion.div
        className="absolute inset-0 opacity-100"
        style={{ background }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none transition-opacity duration-700" />
    </div>
  );
}

// --- Main Page ---

export default function Home() {
  const email = "shubham.ubarhande69@gmail.com";
  const [copied, setCopied] = useState(false);
  const { theme, setTheme, mounted } = useTheme();

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0.3, duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen w-full font-sans text-neutral-900 dark:text-neutral-200 selection:bg-neutral-200 dark:selection:bg-white/20 selection:text-black dark:selection:text-white flex flex-col items-center justify-center p-(--c-sp-lt) md:p-(--c-sp-md) overflow-x-hidden transition-colors duration-700 ease-in-out">
      <Background />
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-[40px] max-w-6xl w-full h-auto md:h-full md:max-h-[min(85vh,800px)] grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,auto)] md:grid-rows-4 gap-(--c-sp-lt)"
      >

        {/* --- 1. Intro Card (2x2) --- */}
        <motion.div variants={item} className="md:col-span-2 md:row-span-2">
          <Card className="flex flex-col justify-between" noHover>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.2em]">Available for work</span>
            </div>

            <div className="space-y-2 mt-2">
              <h1 className="text-h1 font-semibold tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
                Hi, I'm <br />
                <span className="text-neutral-400 dark:text-neutral-500">Shubham.</span>
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-p1 leading-[1.3] max-w-[90%]">
                Engineering <span className="text-neutral-900 dark:text-white font-medium">digital experiences</span> with a focus on motion, precision, and aesthetics.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              <MapPin size={14} className="text-neutral-400" />
              <span>India</span>
            </div>
          </Card>
        </motion.div>

        {/* --- 2. Portfolio (2x2) --- */}
        <motion.div variants={item} className="md:col-span-2 md:row-span-2">
          <Card href="https://shubhz.vercel.app/" className="flex flex-col justify-between group">
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all duration-700" />

            <div className="relative z-10 flex justify-between items-start">
              <div className="h-10 w-10 bg-white dark:bg-neutral-800/50 rounded-xl flex items-center justify-center border border-neutral-200 dark:border-white/5 shadow-sm">
                <Monitor size={20} className="text-neutral-700 dark:text-white" />
              </div>
              <div className="px-3 py-1 rounded-full bg-white/40 dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-[10px] uppercase font-bold text-neutral-600 dark:text-neutral-300 tracking-wider flex items-center gap-2 backdrop-blur-sm">
                <Sparkles size={10} className="text-indigo-500 dark:text-indigo-400" />
                More About Me
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="text-h3 font-semibold text-neutral-900 dark:text-white tracking-tighter mb-2">Portfolio</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-p2 leading-relaxed mb-4 max-w-[85%]">
                A selection of my best work in web development and UI design.
              </p>

              <div className="mt-12 flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white group-hover:translate-x-1 transition-transform duration-300">
                <span>View Projects</span>
                <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* --- 3. LinkedIn (1x1) --- */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-1">
          <Card href="https://www.linkedin.com/in/mr-potter/" className="flex flex-col justify-between">
            <div className="h-10 w-10 bg-[#0A66C2]/10 rounded-xl flex items-center justify-center text-[#0A66C2]">
              <Linkedin size={20} />
            </div>
            <div className="mt-2">
              <h3 className="text-p1 font-medium text-neutral-900 dark:text-white tracking-tight">LinkedIn</h3>
              <p className="text-xs text-neutral-500 mt-1">Connect professionally</p>
            </div>
          </Card>
        </motion.div>

        {/* --- 4. Book a Call (2x1) --- */}
        <motion.div variants={item} className="md:col-span-2 md:row-span-1">
          <Card href="https://cal.com/shubhz/discovery" className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500 border border-orange-500/10">
                <Calendar size={22} />
              </div>
              <div className="mt-2">
                <h3 className="text-p1 font-medium text-neutral-900 dark:text-white tracking-tight">Book a call</h3>
                <p className="text-xs text-neutral-500 mt-1">Book a free discovery call</p>
              </div>
            </div>
            <div className="mt-4 h-9 w-9 rounded-full bg-neutral-200 dark:bg-white/5 flex items-center justify-center group-hover:bg-neutral-900 dark:group-hover:bg-white text-neutral-500 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
              <ArrowUpRight size={16} />
            </div>
          </Card>
        </motion.div>

        {/* --- 5. GitHub (1x1) --- */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-1">
          <Card href="https://t.me/bettercallShubh" className="flex flex-col justify-between">
            <div className="h-10 w-10 bg-neutral-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-neutral-900 dark:text-white">
              {/* <Telegram size={20} /> */}
              <Send size={20} className="text-blue-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-p1 font-medium text-neutral-900 dark:text-white tracking-tight">Telegram</h3>
              <p className="text-xs text-neutral-500 mt-1">Connect with me</p>
            </div>
          </Card>
        </motion.div>

        {/* --- 6. WhatsApp (1x1) --- */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-1">
          <Card href="https://wa.me/917498503089" className="flex flex-col justify-between">
            <div className="h-10 w-10 bg-[#25D366]/10 rounded-xl flex items-center justify-center text-[#25D366]">
              <MessageCircle size={20} />
            </div>
            <div className="mt-2">
              <h3 className="text-p1 font-medium text-neutral-900 dark:text-white tracking-tight">WhatsApp</h3>
              <p className="text-xs text-neutral-500 mt-1">Chat instantly</p>
            </div>
          </Card>
        </motion.div>

        {/* --- 7. Email / Contact Section (3x1) --- */}
        <motion.div variants={item} className="md:col-span-3 md:row-span-1">
          <Card className="flex flex-col md:flex-row md:items-center justify-between gap-6" noHover>
            <div className="flex items-center gap-5">
              <div className="h-12 w-12 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/5 shadow-inner">
                <Mail size={22} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Get in touch</p>
                <h3 className="text-p1 font-mono text-neutral-900 dark:text-white tracking-tight">{email}</h3>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="cursor-pointer group h-10 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/10 flex items-center gap-2 transition-all active:scale-95"
              >
                <div className="relative w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check size={16} className="text-emerald-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy size={16} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white">
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>

              <Link
                href={`mailto:${email}`}
                className="h-10 px-5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold flex items-center justify-center hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg shadow-black/5 dark:shadow-white/5"
              >
                Send Email
              </Link>
            </div>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  );
}