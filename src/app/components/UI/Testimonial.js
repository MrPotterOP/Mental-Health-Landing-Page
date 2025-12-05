'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Quotes } from "@/app/svgs";
import LinkedInIcon from "@/app/svgs/index";

function Testimonial({ click, setClick, testimonials }) {

    const reviews = testimonials || [
        {
            name: "Grace Lee",
            img: "/assets/client-2.jpg",
            social: "/",
            bio: "Real Estate Agent | California",
            review: "Dealing with grief after losing my job felt overwhelming, but this team's compassionate approach helped me process it without judgment. Their online sessions fit perfectly into my busy schedule, and I've built resilience I didn't know I had."
        },
        {
            name: "Cristina Fox",
            img: "/assets/client.jpg",
            social: "/",
            bio: "Pet Nutritionist | Colorado",
            review: "I've been dealing with a lot of grief since my husband passed away. This therapist was a lifesaver. Their approachable and empathetic approach helped me feel less alone and more supported. I highly recommend them!"
        },
        {
            name: "Sarah Lee",
            img: "/assets/client-3.jpg",
            social: "/",
            bio: "Instagram Influencer | New York",
            review: "I was confused and overwhelmed by the loss of my husband. This therapist helped me process my emotions and find a way to move forward. Their support and understanding were invaluable. I highly recommend them!"
        },
        {
            name: "Selina Johnson",
            img: "/assets/client-4.jpg",
            social: "/",
            bio: "CEO Habox LTD | London",
            review: "This anxious therapist helped me deal with the loss of my husband. Their empathetic approach and understanding helped me feel less alone and more supported. I highly recommend them!"
        },
    ]


    useEffect(() => {
        if (click) {
            if (click === "left") {
                setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
            } else {
                setIndex((prev) => (prev + 1) % reviews.length);
            }
            setClick(false);
        }
    }, [click]);

    const [index, setIndex] = useState(0);
    const DURATION = 7000;
    const ANIMATION_DURATION = 0.3;

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, DURATION);
        return () => clearInterval(timer);
    }, [index, reviews.length]);

    const resolution = { x: 485, y: 480 };
    const btnsResolution = { x: 85, y: 57 };

    const fadeScaleVariants = {
        enter: { opacity: 0, scale: 1.02, filter: "blur(2px)" },
        center: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.98, filter: "blur(2px)" }
    };

    const slideUpVariants = {
        enter: { opacity: 0, y: 8 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 }
    };

    return (
        // Mobile (<768px): flex-col, items-center.
        // Tablet/Desktop (>=768px): flex-row, items-start.
        // max-w-[1050px] prevents overflow on screens smaller than 1050px but larger than mobile.
        <div className="flex flex-col md:flex-row justify-between w-full max-w-[1080px] lg:w-[1080px] md:justify-between gap-[20px] lg:gap-[40px] p-[20px] items-center md:items-start gap-y-8 md:gap-y-0 mx-auto">

            {/* Main Image */}
            <div className="shrink-0 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={reviews[index].name}
                        className="rounded-lg overflow-hidden"
                        variants={fadeScaleVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: ANIMATION_DURATION, ease: "circOut" }}
                    >
                        {/* 
                           Mobile: 335x330 (Fits mobile height)
                           Tablet (md): 340x335 (Scaled down to fit row)
                           Desktop (lg): 485x480 (Original)
                        */}
                        <Image
                            className="w-[335px] h-[330px] md:w-[400px] md:h-[404px] lg:w-[485px] lg:h-[480px] object-cover rounded-lg"
                            width={resolution.x}
                            height={resolution.y}
                            src={reviews[index].img}
                            alt={reviews[index].name}
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content Area */}
            {/* Mobile: Center everything. Desktop: Left align everything. */}
            <div className="flex gap-x-0 w-full h-[350px] md:gap-x-2.5 pt-0 md:pt-[20px] lg:pt-[49px] pb-[28px] md:w-auto justify-center md:h-full md:justify-start">

                {/* Quote Icon - Hidden on small mobile if needed, or stacked */}
                {/* Desktop: -mt-[30px], Mobile: hidden or smaller margin */}
                <div className="hidden md:block">
                    <Quotes className="text-black lg:-mt-[30px]" size={62} opacity={0.5} />
                </div>

                <div className="w-full md:max-w-[360px] lg:max-w-[480px] lg:justify-between">
                    <div className="flex flex-col w-full h-full justify-between items-center md:items-start">

                        {/* Review Text */}
                        <div className="relative min-h-[140px] md:min-h-[120px] w-full">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={reviews[index].review}
                                    variants={slideUpVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: ANIMATION_DURATION, ease: "circOut" }}
                                    className="text-p1 leading-normal tracking-wide text-center md:text-left max-w-[60ch]"
                                >
                                    {reviews[index].review}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Bio + Buttons Group */}
                        {/* Mobile: gap-y-6. Desktop: gap-y-[49px] */}
                        <div className="flex flex-col gap-y-6 md:gap-y-[20px] lg:gap-y-[49px] w-full items-center md:items-start">

                            {/* User Bio */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={reviews[index].name}
                                    variants={slideUpVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: ANIMATION_DURATION, ease: "circOut", delay: 0.05 }}
                                    className="flex flex-col gap-y-[2px] items-center md:items-start"
                                >
                                    <div className="flex items-center gap-x-3.5">
                                        <h6 className="text-p1 font-bd">{reviews[index].name}</h6>
                                        <LinkedInIcon className="w-[21px] h-[21px]" />
                                    </div>
                                    <p className="text-p2 text-black-lt text-center md:text-left">{reviews[index].bio}</p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Thumbnails */}
                            <div className="flex gap-x-2 lg:gap-x-3.5">
                                {reviews.map((review, i) => {
                                    const isActive = i === index;

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setIndex(i)}
                                            className="relative cursor-pointer rounded-lg overflow-hidden group isolate"
                                        >
                                            {/* Scaled down slightly for tablet (md) to prevent overflow */}
                                            <Image
                                                className={`w-[65px] h-[44px] md:w-[60px] md:h-[40px] lg:w-[85px] lg:h-[57px] object-cover rounded-lg transition-all duration-300 ${isActive ? 'brightness-100' : 'brightness-80 group-hover:brightness-100'}`}
                                                width={btnsResolution.x}
                                                height={btnsResolution.y}
                                                src={review.img}
                                                alt={review.name}
                                            />

                                            {isActive && (
                                                <motion.div
                                                    layoutId="active-progress"
                                                    key={`progress-${index}-${i}`}
                                                    className="absolute top-0 left-0 h-full bg-black/30 z-10 "
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{
                                                        duration: DURATION / 1000,
                                                        ease: "linear"
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;