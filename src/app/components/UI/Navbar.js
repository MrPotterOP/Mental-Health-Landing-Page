"use client";

import { cn } from "@/app/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CtaButton from "./CtaButton";
import LinkButton from "./LinkButton";

import { Call } from "../../svgs";

function Navbar({ className, logo = "/assets/logo.png", number = "838-373-1232" }) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollDistance, setScrollDistance] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isMenuOpenRef = useRef(isMobileMenuOpen);

    const links = [
        { name: "Therapies", href: "/" },
        { name: "About Us", href: "/" },
        { name: "Blogs", href: "/" },
    ];

    useEffect(() => {
        isMenuOpenRef.current = isMobileMenuOpen;
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const SCROLL_DOWN_THRESHOLD = 100;

        const controlNavbar = () => {
            if (isMenuOpenRef.current) {
                setIsVisible(true);
                return;
            }

            const currentScrollY = window.scrollY;
            const scrollDifference = currentScrollY - lastScrollY;

            if (currentScrollY < 10) {
                setIsVisible(true);
                setScrollDistance(0);
                setLastScrollY(currentScrollY);
                return;
            }

            if (scrollDifference < 0) {
                setIsVisible(true);
                setScrollDistance(0);
                setLastScrollY(currentScrollY);
                return;
            }

            const newScrollDistance = scrollDistance + scrollDifference;

            if (newScrollDistance > SCROLL_DOWN_THRESHOLD) {
                setIsVisible(false);
                setScrollDistance(0);
            } else {
                setScrollDistance(newScrollDistance);
            }

            setLastScrollY(currentScrollY);
        };

        let timeoutId = null;
        const handleScroll = () => {
            if (timeoutId) return;
            timeoutId = setTimeout(() => {
                controlNavbar();
                timeoutId = null;
            }, 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [lastScrollY, scrollDistance]);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-[100]",
                "px-[21px] py-[14px]",
                "transition-transform duration-300 ease-in-out",
                // isVisible ? "translate-y-0" : "-translate-y-full",
                className
            )}
        >
            <div
                className={cn(
                    "container mx-auto relative",
                    "flex justify-between items-center bg-[rgba(255,255,255,0.14)] border-[.4px] border-solid border-[#00000021] blurred-bg rounded-full px-[21px] py-[10px]"
                )}
            >

                {/* --- Grainy Texture --- */}
                <div
                    className="absolute top-0 left-0 w-full h-full rounded-full
                        pointer-events-none opacity-[0.20] mix-blend-overlay
                        bg-[url('/assets/grain.png')] bg-repeat bg-[length:100px_100px]
                    "
                />

                {/* --- LEFT: Logo Section --- */}
                <div className="flex-shrink-0 z-20">
                    <Link href="/" className="block h-[52px]">
                        <Image
                            className="h-[52px] w-auto object-contain"
                            src={logo}
                            alt="logo"
                            width={200}
                            height={50}
                            priority
                        />
                    </Link>
                </div>

                {/* --- CENTER: Links (Absolute Positioned) --- */}
                {/* We use absolute positioning to force these to the exact center of the parent container */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <ul className="flex gap-x-5 xl:gap-x-7">
                        {links.map((link) => (
                            <li key={link.name}>
                                <LinkButton className={"no-underline"} shineColor="text-black-lt" href={link.href}>
                                    {link.name}
                                </LinkButton>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --- RIGHT: CTA Buttons --- */}
                <div className="hidden lg:flex items-center gap-x-3.5 z-20">
                    <div className="w-[200px] hidden xl:block">
                        <CtaButton classname="w-full" href="/" type="outlined" icon={true}>
                            <Call /> {number}
                        </CtaButton>
                    </div>
                    <div className="w-[200px]">
                        <CtaButton classname="whitespace-nowrap" href="/">
                            Book Appointment
                        </CtaButton>
                    </div>
                </div>

                {/* --- Mobile Hamburger Toggle --- */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden p-2 text-black focus:outline-none z-20 relative w-[30px] h-[30px]"
                    aria-label="Toggle Menu"
                >
                    <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                            <motion.svg
                                key="close"
                                width="30"
                                height="30"
                                className="fill-black-lt absolute top-0 left-0"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <path d="M12.0008 13.4008L7.10078 18.3008C6.91745 18.4841 6.68411 18.5758 6.40078 18.5758C6.11745 18.5758 5.88411 18.4841 5.70078 18.3008C5.51745 18.1174 5.42578 17.8841 5.42578 17.6008C5.42578 17.3174 5.51745 17.0841 5.70078 16.9008L10.6008 12.0008L5.70078 7.10078C5.51745 6.91745 5.42578 6.68411 5.42578 6.40078C5.42578 6.11745 5.51745 5.88411 5.70078 5.70078C5.88411 5.51745 6.11745 5.42578 6.40078 5.42578C6.68411 5.42578 6.91745 5.51745 7.10078 5.70078L12.0008 10.6008L16.9008 5.70078C17.0841 5.51745 17.3174 5.42578 17.6008 5.42578C17.8841 5.42578 18.1174 5.51745 18.3008 5.70078C18.4841 5.88411 18.5758 6.11745 18.5758 6.40078C18.5758 6.68411 18.4841 6.91745 18.3008 7.10078L13.4008 12.0008L18.3008 16.9008C18.4841 17.0841 18.5758 17.3174 18.5758 17.6008C18.5758 17.8841 18.4841 18.1174 18.3008 18.3008C18.1174 18.4841 17.8841 18.5758 17.6008 18.5758C17.3174 18.5758 17.0841 18.4841 16.9008 18.3008L12.0008 13.4008Z" />
                            </motion.svg>

                        ) : (
                            <motion.svg
                                key="menu"
                                width="30"
                                height="30"
                                className="fill-black-lt absolute top-0 left-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <path d="M4 18C3.71667 18 3.47934 17.904 3.288 17.712C3.09667 17.52 3.00067 17.2827 3 17C2.99934 16.7173 3.09534 16.48 3.288 16.288C3.48067 16.096 3.718 16 4 16H20C20.2833 16 20.521 16.096 20.713 16.288C20.905 16.48 21.0007 16.7173 21 17C20.9993 17.2827 20.9033 17.5203 20.712 17.713C20.5207 17.9057 20.2833 18.0013 20 18H4ZM4 13C3.71667 13 3.47934 12.904 3.288 12.712C3.09667 12.52 3.00067 12.2827 3 12C2.99934 11.7173 3.09534 11.48 3.288 11.288C3.48067 11.096 3.718 11 4 11H20C20.2833 11 20.521 11.096 20.713 11.288C20.905 11.48 21.0007 11.7173 21 12C20.9993 12.2827 20.9033 12.5203 20.712 12.713C20.5207 12.9057 20.2833 13.0013 20 13H4ZM4 8C3.71667 8 3.47934 7.904 3.288 7.712C3.09667 7.52 3.00067 7.28267 3 7C2.99934 6.71733 3.09534 6.48 3.288 6.288C3.48067 6.096 3.718 6 4 6H20C20.2833 6 20.521 6.096 20.713 6.288C20.905 6.48 21.0007 6.71733 21 7C20.9993 7.28267 20.9033 7.52033 20.712 7.713C20.5207 7.90567 20.2833 8.00133 20 8H4Z" />
                            </motion.svg>

                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* --- Mobile Menu Dropdown --- */}
            <div
                className={cn(
                    "absolute left-[21px] right-[21px] top-[90px]",
                    "bg-white-lt backdrop-blur-md border-[.4px] border-solid border-[#00000021] rounded-[24px]",
                    "flex flex-col gap-6 p-6 shadow-lg lg:hidden overflow-hidden",
                    "transition-all duration-300 ease-in-out origin-top",
                    isMobileMenuOpen
                        ? "opacity-100 scale-y-100 translate-y-0 visible"
                        : "opacity-0 scale-y-95 -translate-y-4 invisible pointer-events-none"
                )}
            >
                <ul className="flex flex-col gap-4 text-center">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-lg font-medium text-gray-800 hover:text-black transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200/50">
                    <CtaButton classname="w-full justify-center" href="/" type="outlined" icon={true}>
                        <Call /> 838-373-1232
                    </CtaButton>
                    <CtaButton classname="w-full justify-center" href="/">
                        Book Appointment
                    </CtaButton>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;