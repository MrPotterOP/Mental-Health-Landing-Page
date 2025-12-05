'use client';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import Heading from "./UI/Heading";
import { ArrowRight } from "../svgs";
import TeamCard from "./UI/TeamCard";

function Team({
    team = [
        {
            name: "Alexandra Botez",
            img: "/assets/therapist-1.jpg",
            bio: "Clinical Psychologist | 10+ years experience",
            experties: ["Anxiety", "PTSD", "OCD", "General Anxiety Disorder"],
            intro: "My approach is based on the principles of cognitive-behavioral therapy. I believe that our mental health is a complex issue that requires a multifaceted approach. I have a strong background in clinical psychology and have worked with clients from diverse backgrounds, including individuals with anxiety, PTSD, and OCD. My goal is to help you manage your mental health in a way that works for you."
        },
        {
            name: "Paula Lee",
            img: "/assets/therapist-1.jpg",
            bio: "Addiction Psychologist | 7+ years experience",
            experties: ["Recovery", "Addiction", "Substance Abuse", "General Addiction Disorder", "Alcohol Use Disorder"],
            intro: "I believe that addiction is a complex issue that requires a multifaceted approach. I have a strong background in addiction psychology and have worked with clients from diverse backgrounds, including individuals with addiction, recovery, and substance abuse. My goal is to help you manage your addiction in a way that works for you."
        },
        {
            name: "Selena Anderson",
            img: "/assets/therapist-1.jpg",
            bio: "Psychiatrist | 10+ years experience",
            experties: ["Depression", "Anxiety", "General Anxiety Disorder", "General Depression Disorder"],
            intro: "I believe that mental health is a complex issue that requires a multifaceted approach. I have a strong background in psychiatry and have worked with clients from diverse backgrounds, including individuals with depression, anxiety, and general anxiety disorder. My goal is to help you manage your mental health in a way that works for you."
        },
        {
            name: "Alexandra Botez",
            img: "/assets/therapist-1.jpg",
            bio: "Clinical Psychologist | 10+ years experience",
            experties: ["Anxiety", "PTSD", "OCD", "General Anxiety Disorder"],
            intro: "My approach is based on the principles of cognitive-behavioral therapy. I believe that our mental health is a complex issue that requires a multifaceted approach. I have a strong background in clinical psychology and have worked with clients from diverse backgrounds, including individuals with anxiety, PTSD, and OCD. My goal is to help you manage your mental health in a way that works for you."
        },
        {
            name: "Paula Lee",
            img: "/assets/therapist-1.jpg",
            bio: "Addiction Psychologist | 10+ years experience",
            experties: ["Recovery", "Addiction", "Substance Abuse", "General Addiction Disorder", "Alcohol Use Disorder"],
            intro: "I believe that addiction is a complex issue that requires a multifaceted approach. I have a strong background in addiction psychology and have worked with clients from diverse backgrounds, including individuals with addiction, recovery, and substance abuse. My goal is to help you manage your addiction in a way that works for you."
        },
    ] }) {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Logic to check scroll position
    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

            // Check if we can scroll left (if scrollLeft is greater than 0)
            setCanScrollLeft(scrollLeft > 0);

            // Check if we can scroll right (allow for tiny rounding errors with -1)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    // Attach scroll listener
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScrollButtons);
            // Run once on mount to set initial state
            checkScrollButtons();

            // Run on resize in case window width changes
            window.addEventListener("resize", checkScrollButtons);
        }

        return () => {
            if (container) container.removeEventListener("scroll", checkScrollButtons);
            window.removeEventListener("resize", checkScrollButtons);
        };
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    // Animation settings for Framer Motion
    const btnAnimation = {
        initial: { opacity: 0, scale: 0.5, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.5, y: 20 },
        transition: { duration: 0.3 }
    };

    const flotBtnStyle = "absolute top-1/2 translate-y-[20px] z-10 bg-white text-black p-2 rounded-full shadow-[0px_4px_14px_rgba(0,0,0,0.25)] flex items-center justify-center hover:scale-98 cursor-pointer"

    return (
        <section className="w-full flex flex-col" aria-label="Our Team">
            <div className="border-b border-[#0000001a] py-[28px] px-[42px]">
                <div className="heading-container">
                    <Heading className="inline-block" text="Meet the \img Team" level={2} img="/assets/team.jpg" alt="mental health experts" />

                    <div className="flex">
                        <ArrowRight onClick={() => scroll("left")} className="trasfrom -rotate-180 opacity-50 w-[34px] h-[34px] md:w-[44px] md:h-[44px] lg:w-[52px] lg:h-[52px] cursor-pointer" />
                        <ArrowRight onClick={() => scroll("right")} className="w-[34px] h-[34px] md:w-[44px] md:h-[44px] lg:w-[52px] lg:h-[52px] cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="lg:max-w-(--c-mx-w) w-full overflow-hidden mx-auto">
                <div className="relative w-full">
                    {/* Left Scroll Button */}
                    <AnimatePresence>
                        {canScrollLeft && (
                            <motion.button
                                key="left-btn"
                                {...btnAnimation}
                                onClick={() => scroll("left")}
                                className={flotBtnStyle + " left-(--c-sp-xsm)"}
                                aria-label="Scroll Left"
                            >
                                <ArrowRight size={36} className="transform -rotate-180" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-auto gap-x-[22px] pt-[70px] pb-10 scroll-smooth px-(--sp-lt) [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                    >
                        {
                            team.map((team, i) => (
                                <TeamCard key={i} {...team} />
                            ))
                        }
                    </div>

                    {/* Right Scroll Button */}
                    <AnimatePresence>
                        {canScrollRight && (
                            <motion.button
                                key="right-btn"
                                {...btnAnimation}
                                onClick={() => scroll("right")}
                                className={flotBtnStyle + " right-(--c-sp-xsm)"}
                                aria-label="Scroll Right"
                            >
                                <ArrowRight size={36} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}

export default Team;