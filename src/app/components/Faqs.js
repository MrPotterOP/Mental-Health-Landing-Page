'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "./UI/Heading";

function Faqs({
    faqs = [
        {
            q: "What's included in the session fee?",
            a: "The session fee includes the therapist's time, the session's duration, and any additional costs incurred during the session, such as transportation or meals. The exact fee will be determined by the therapist and the session length.",
        },
        {
            q: "How long does therapy last?",
            a: "The duration of therapy will depend on the specific therapy and the needs of the individual. Some therapies may last for a few sessions, while others may require multiple sessions over a period of time.",
        },
        {
            q: "Do you offer a free consultation?",
            a: "Yes, we offer a free consultation to help you determine if therapy is right for you. During the consultation, our therapists will discuss your needs and goals, and answer any questions you may have about therapy.",
        },
        {
            q: "How can I know if therapy is right for me?",
            a: "It's important to find a therapist who is a good fit for you and your needs. You can ask questions during the consultation to get a better understanding of your goals and what therapy might be right for you.",
        },
    ]
}) {
    const title = "Frequently \n Asked \\img Questions";

    const [activeIndex, setActiveIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        // Added padding-x based on your global spacing variable for mobile safety
        <section className="px-[var(--c-sp-lt)] md:px-0 w-full flex flex-col items-center">

            <Heading
                className="text-center leading-[1.02]"
                text={title}
                level={2}
                img="/assets/faq.jpg"
                alt="faqs"
            />

            <div
                // 1. Changed width to responsive max-width
                // 2. Adjusted margin-top: smaller on mobile, 77px on desktop
                // 3. Adjusted gap: slightly larger on mobile for touch targets, 7px on desktop
                className="mt-10 md:mt-[77px] w-full max-w-[1000px] flex flex-col gap-3 md:gap-y-[7px]"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {
                    faqs.map((faq, i) => {
                        const isOpen = activeIndex === i;
                        const isHovered = hoveredIndex === i;
                        const isAnyHovered = hoveredIndex !== null;

                        // Logic update:
                        // Added 'md:' prefix to opacity, blur, and scale.
                        // This ensures the "dimming" effect only happens on Desktop/Tablet (md breakpoint).
                        // On mobile, items stay fully opaque.
                        const dimClass = isAnyHovered && !isHovered
                            ? "md:opacity-60 md:blur-[1px] md:scale-[0.99]"
                            : "opacity-100 scale-100";

                        return (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onClick={() => toggleFaq(i)}
                                // Responsive Padding: p-6 (24px) on mobile, specific py/px on desktop
                                // Responsive Radius: rounded-2xl (16px) on mobile, rounded-[30px] on desktop
                                className={`w-full p-6 md:py-[21px] px-[35px] rounded-[30px] bg-white cursor-pointer transition-all duration-300 ease-in-out ${dimClass}`}
                            >
                                <div className="flex w-full justify-between items-center gap-4">
                                    <h3 className="text-p1 font-md select-none text-left">
                                        {faq.q}
                                    </h3>

                                    {/* Prevent shrinking of the button icon */}
                                    <button className={`text-p1 font-md shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>
                                        +
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            {/* Adjusted max-width for mobile reading comfort */}
                                            <p className="text-p2 text-black-lt leading-[1.5] max-w-full md:max-w-[80ch] tracking-[0.03em] pb-2 text-left">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })
                }
            </div>

        </section>
    );
}

export default Faqs;