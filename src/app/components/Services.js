'use client';

import Heading from "./UI/Heading";
import CtaButton from "./UI/CtaButton";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- Custom Service Component (Logic Preserved) ---
const ServiceCard = ({ service, isActive, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            onClick={onClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative border-b border-solid border-[rgba(0,0,0,0.1)] overflow-hidden cursor-pointer group"
            initial={{ backgroundColor: "rgba(255,255,255,0)" }}
        >
            {/* 1. Hover State Background & Image Zoom */}
            <AnimatePresence>
                {isHovered && !isActive && (
                    <motion.div
                        // Added overflow-hidden so the image respects the border-radius
                        className="absolute inset-0 z-0 overflow-hidden"

                        // Start with opacity 0 and rounded corners
                        initial={{ opacity: 0, borderRadius: "36px" }}

                        // Stay rounded while hovering
                        animate={{ opacity: 1, borderRadius: "36px" }}

                        // Turn SQUARISH (0px) as it fades out/exits to active state
                        exit={{ opacity: 0, borderRadius: "36px" }}

                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <motion.div
                            className="relative w-full h-full"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.05 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <Image
                                src={service.img}
                                alt={service.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-10 p-(--c-sp-lt) md:py-[28px] md:px-[35px]">
                <motion.h3
                    className="text-h4"
                    animate={{
                        color: isHovered && !isActive ? "#FFFFFF" : "#000000"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {service.title}
                </motion.h3>

                {/* 2. Active State Content */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="pt-[21px] flex flex-col md:flex-row gap-[21px] items-start">
                                <p className="text-p2 max-w-[70ch] text-black-lt leading-[1.5] tracking-[0.02em] flex-1">
                                    {service.desc}
                                </p>
                                <div className="relative w-full md:w-[240px] lg:w-[280px] xl:w-[320px] shrink-0 aspect-[1.45/1] overflow-hidden rounded-[12px]">
                                    <Image
                                        src={service.img}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

function Services({
    services = [
        {
            title: "Individual Therapy",
            desc: "We provide individual therapy to help you overcome your mental health issues. Our therapists are licensed and experienced in treating various mental health conditions. We offer a variety of therapies, including cognitive-behavioral therapy, psychotherapy, and family therapy.",
            img: "/assets/service-1.jpg",
        },
        {
            title: "Couple Therapy",
            desc: "We offer couple therapy to help you and your partner overcome your mental health issues. Our therapists are licensed and experienced in treating various mental health conditions. We offer a variety of therapies, including cognitive-behavioral therapy, psychotherapy, and family therapy.",
            img: "/assets/service-1.jpg",
        },
        {
            title: "Online Therapy",
            desc: "Our online therapy sessions are convenient and accessible. You can schedule your sessions at any time, and we provide a variety of therapies, including cognitive-behavioral therapy, psychotherapy, and family therapy.",
            img: "/assets/service-1.jpg",
        },
        {
            title: "Relationship Therapy",
            desc: "We offer relationship therapy to help you and your partner overcome your mental health issues. Our therapists are licensed and experienced in treating various mental health conditions. We offer a variety of therapies, including cognitive-behavioral therapy, psychotherapy, and family therapy.",
            img: "/assets/service-1.jpg",
        },
        {
            title: "PTSD Support",
            desc: "We provide PTSD support to help you overcome your trauma. Our therapists are licensed and experienced in treating PTSD. We offer a variety of therapies, including cognitive-behavioral therapy, psychotherapy, and family therapy.",
            img: "/assets/service-1.jpg",
        }
    ],
    problems = [
        "Pain",
        "PTSD",
        "Anger",
        "Worry",
        "Grief",
        "Trauma",
        "Anxiety",
        "Bullying",
        "Self Harm",
        "Depression",
        "Complex Trauma",
        "Adjustment Issues",
        "Behavioural Issues",
        "Psychological Injury",
    ]
}) {
    const heading = "Our \\img \n Services";
    const [activeIdx, setActiveIdx] = useState(null);

    const handleServiceClick = (index) => {
        setActiveIdx(prev => prev === index ? null : index);
    }

    return (
        // Reverted to original classes exactly
        <section className="w-full max-w-(--c-mx-w) mx-auto flex flex-col lg:flex-row justify-center items-start px-(--c-sp-lt) md:px-(--c-sp-md) gap-y-(--c-sp-md) lg:gap-x-(--c-sp-md)" aria-label="Our Services">
            {/* Left Column: Heading & Intro */}
            <div className="w-full lg:w-[40%] lg:max-w-[430px] mb-(--c-sp-md) lg:mb-0 flex flex-col gap-y-(--c-sp-lt) lg:pr-(--c-sp-lg) self-start lg:sticky lg:top-[100px]">
                <Heading className="" text={heading} level={2} img="/assets/services.jpg" alt="services" />
                <p className="text-p1 leading-[1.3] text-black-lt">feel the right kind of support for whatever you&apos;re facing</p>
                <div className="flex flex-wrap gap-[7px]">
                    {
                        problems.map((problem, i) => (
                            <div className="p-[4px_14px] shadow-[0_0_2px_0] rounded-full text-[14px]" key={i}>
                                <span>{problem}</span>
                            </div>
                        ))
                    }
                </div>

                <CtaButton className="mt-(--c-sp-lt)" href="/">Get Help</CtaButton>
            </div>

            {/* Right Column: Service List */}
            <div className="w-full lg:flex-1 flex flex-col border-l-0 lg:border-l border-solid border-[rgba(0,0,0,0.1)] pl-0 lg:pl-(--c-sp-md) py-(--c-sp-lt) lg:py-(--c-sp-md)">
                {
                    services.map((service, i) => (
                        <ServiceCard
                            key={i}
                            service={service}
                            isActive={activeIdx === i}
                            onClick={() => handleServiceClick(i)}
                        />
                    ))
                }
            </div>

        </section>
    );

}

export default Services;