import Link from "next/link";
import LinkButton from "./UI/LinkButton";

import { Call, Mail, Location, Instagram, YT, ArrowRight } from "../svgs";
import LinkedInIcon from "../svgs";
import Image from "next/image";

import { cn } from "../utils/cn";

function Footer({ number = "838-373-1232", email = "info@therapy.mh",
    address = [
        {
            link: "xyz.com",
            address: "1 E Wacker Dr \\n Chicago, IL 60601"
        },
        {
            link: "xyz.com",
            address: "40 Skokie Blvd Suite 460 \n Northbrook, IL 60062"
        }
    ],
    name = "Shubham.",
    logo = "/assets/logo.png",
    light = false
}) {

    const TopBtn = () => {
        "use client";

        const scroll = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        return (
            <LinkButton className="w-full lg:w-[380px] flex gap-x-[7px] cursor-pointer text-p2 font-md text-white-lt justify-start lg:justify-start" href="#top">
                <span className="flex gap-x-[7px]">Back to Top <ArrowRight className="transform -rotate-90" size={28} /></span>
            </LinkButton>
        );
    }

    return (
        <footer className="m-[7px] p-(--c-sp-lt) md:p-[42px_35px_14px_35px] rounded-[24px] bg-[rgba(0,0,0,0.839)] text-white">
            <div className="max-w-(--c-mx-w) flex flex-col gap-y-[21px] mx-auto">
                <div className="flex flex-col lg:flex-row justify-between align-baseline gap-y-(--c-sp-lt) lg:gap-y-0">
                    <div className="w-full lg:max-w-[536px] flex flex-col gap-y-[14px]">
                        <h3 className="text-h3 font-serif leading-[1.2]">Support That Meets You <br /> Where You Are.</h3>
                        <p className="text-p2 leading-[1.32] max-w-[70ch]">Find the resources you need to face your current challenges with our expert team of licensed therapists across Ontario.</p>
                    </div>
                    <div className="w-full lg:w-[380px] flex flex-col gap-y-[14px]">
                        <span className="text-p2 font-md text-white-lt">Contact: </span>
                        <div className="flex gap-x-[21px] flex-col md:flex-row">
                            <Link className="font-md text-white flex gap-x-[7px]" href="/"><Call className="filter invert" /> {number}</Link>
                            <span className="font-md text-white-lt">(Mon-Fri, 10AM - 7PM)</span>
                        </div>
                        <div className="flex gap-x-[21px] flex-col md:flex-row">
                            <Link className="font-md text-white flex gap-x-[7px]" href="/"><Mail /> {email}</Link>
                            {/* <span className="font-md text-white-lt" >(24/7 Support)</span> */}
                        </div>

                        <LinkButton className="font-md text-white-lt w-max" href="/">Get Started Online</LinkButton>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row w-full justify-between items-start lg:items-center py-[14px] border-t border-b border-solid border-[rgba(255,255,255,0.1)] gap-y-(--c-sp-lt) lg:gap-y-0">
                    <Image className={cn(
                        "w-[140px] h-[40px] object-contain",
                        {
                            "filter invert": !light
                        }
                    )} src={logo} alt="Logo" width={120} height={40} ></Image>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-y-(--c-sp-lt) gap-x-[42px]">
                        <div className="hidden md:block">
                            <Location />
                        </div>

                        {
                            // parse \n to <br />
                            address.map((item, index) => (
                                <div key={index} className="flex flex-col gap-y-[2px]">
                                    <p className="text-p2 font-md leading-[1.2]" aria-label="Address">{item.address.replace(/\\n/g, "\n")}</p>
                                    <LinkButton className="text-p2 font-md text-white-lt w-max" target="_blank" href={item.link}>(See on Google Maps)</LinkButton>
                                </div>
                            ))
                        }

                    </div>

                    <div className="w-full lg:w-[380px] flex gap-x-[14px] items-center">
                        <span className="text-p2 font-md text-white-lt">Socials: </span>

                        <Link href="/"><Instagram /></Link>
                        <Link href="/"><YT /></Link>
                        <Link href="/"><LinkedInIcon className="filter invert" /></Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-y-(--c-sp-lt) gap-x-[63px] border-b border-solid border-[rgba(255,255,255,0.1)] pb-[21px]">
                    <div className="flex flex-col">
                        <span className="mb-[2px] text-p2 font-md text-white-lt">Quick Links: </span>
                        <Link href="/">Therapies</Link>
                        <Link href="/">Testimonials</Link>
                        <Link href="/">Contact Us</Link>
                        <Link href="/">About Us</Link>
                    </div>

                    <div className="flex flex-col">
                        <span className="mb-[2px] text-p2 font-md text-white-lt">Therapies: </span>
                        <Link href="/">Cognitive Behavioral Therapy</Link>
                        <Link href="/">Psychotherapy</Link>
                        <Link href="/">Family Therapy</Link>
                        <Link href="/">Group Therapy</Link>
                    </div>

                    <div className="flex flex-col">
                        <span className="mb-[2px] text-p2 font-md text-white-lt">Issues: </span>
                        <Link href="/">Anxiety</Link>
                        <Link href="/">Self-esteem</Link>
                        <Link href="/">Depression</Link>
                        <Link href="/">General Anxiety Disorder</Link>
                    </div>
                </div>

                <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center gap-y-(--c-sp-lt) lg:gap-y-0">
                    <span className="text-p2 font-md text-white-lt">Copyright © 2025 {name} All rights reserved.</span>

                    <div className="flex gap-x-[21px]">
                        <LinkButton className="text-p2 font-md text-white-lt" href="/">Privacy Policy</LinkButton>
                        <LinkButton className="text-p2 font-md text-white-lt" href="/">Terms of Use</LinkButton>
                    </div>

                    {/* <button className="w-full lg:w-[380px] flex gap-x-[7px] cursor-pointer text-p2 font-md text-white-lt justify-start lg:justify-start">
                        Back to Top <ArrowRight className="transform -rotate-90" size={28} />
                    </button> */}
                    <TopBtn />
                </div>
            </div>
        </footer>
    );
}

export default Footer;