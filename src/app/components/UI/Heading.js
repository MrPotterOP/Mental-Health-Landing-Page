"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/app/utils/cn";
import Image from "next/image";
import { motion } from "framer-motion";

function Heading({ text, textMobile, className, level = 1, img, alt }) {
  const Tag = `h${level}`;
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Determine which text to display
  const displayText = isClient && isMobile && textMobile ? textMobile : text;

  // Handle hydration and resize detection
  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const textH1 = "text-center text-white text-h1 leading-[var(--lh-h1)] tracking-[var(--lts-h1)]";
  const textH2 = "text-left text-h2 leading-[var(--lh-h2)] tracking-[var(--lts-h2)]";
  const textH3 = "text-left text-h3 leading-[var(--lh-h3)]";
  const textStyle =
    level === 1 ? textH1 :
      level === 2 ? textH2 :
        textH3;

  const rawW = level === 1 ? 96 : 81;
  const rawH = level === 1 ? 66 : 56;
  const aspectRatio = rawW / rawH;
  const heightInEm = 0.85;
  const widthInEm = heightInEm * aspectRatio;

  const parts = displayText.split(/\\img/);

  const children = parts.map((part, index) => (
    <span key={index}>
      {part.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}

      {index < parts.length - 1 && img && (
        <motion.span
          className="inline-flex align-baseline relative overflow-hidden rounded-[0.1em]"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: `${widthInEm}em`, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 1.2,
            ease: [0.25, 1, 0.5, 1]
          }}
          style={{
            height: `${heightInEm}em`,
            verticalAlign: "middle",
            marginTop: "-0.15em",
          }}
        >
          <Image
            src={img}
            alt={alt || "decorative heading image"}
            width={rawW}
            height={rawH}
            className="object-cover"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </motion.span>
      )}
    </span>
  ));

  return (
    <Tag className={cn("font-serif", textStyle, className)}>
      {children}
    </Tag>
  );
}

export default Heading;