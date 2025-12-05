import Heading from "./UI/Heading";
import LinkButton from "./UI/LinkButton";
import Image from "next/image";
import { Tick } from "../svgs";

function About({ number = "838-373-1232", members = 10 }) {

    const contnet = "We know how hard it can be to\n reach out \\img for help\n especially when life already\n feels overwhelming."
    const contnetMobile = "We know how hard it can be to reach out \\img for help especially when life already feels overwhelming."
    const contentImg = "/assets/help.jpg"
    const linkStyle = "text-primary font-reg no-underline"


    const aboutHeading = "A safe space where you feel\n supported, not alone."
    const para = [
        "Our licensed therapists combine expertise with empathy. helping you navigate life's rough patches, one conversation at a time.",
        "No pressure. No labels. Just real people here to guide and support you."
    ]

    const tags = [
        `${members}+ Licensed Therapists`,
        "Confidential & Safe Sessions",
        "Flexible Online & In-Person Options",
    ]

    return (
        <section aria-label="Our Mission" className="flex flex-col items-center gap-y-(--sp-md) w-full overflow-hidden">

            {/* --- Top Section (Tagline/Heading) --- */}
            <div className="container mx-auto px-(--c-sp-lt) mt-(--sp-lt) text-center flex flex-col gap-y-(--sp-lt)">
                <p className="tagline">Because No One Should Face It Alone</p>
                <Heading className="text-center" text={contnet} textMobile={contnetMobile} level={2} img={contentImg} alt="helping hands" />
                <p className="text-p1">What&apos;sApp us (<span><LinkButton className={linkStyle} shineColor="text-primary-lt">{number}</LinkButton></span>) or <span><LinkButton className={linkStyle} shineColor="text-primary-lt">Get Strarted Online</LinkButton></span></p>
            </div>

            {/* --- The Content Lockup (Refactored) --- */}
            {/* 
               1. max-w variable ensures it doesn't stretch indefinitely on huge screens.
               2. px variables ensure padding on mobile/tablet.
               3. mb variable gives breathing room at the bottom.
            */}
            <div className="container mx-auto px-(--c-sp-lt) md:px-(--c-sp-md) lg:px-(--c-sp-lg) w-full mb-(--sp-lt)">

                {/* 
                    flex-col-reverse on mobile: Puts image on top (optional, remove '-reverse' if you want text on top).
                    lg:flex-row: Side by side on desktop.
                    items-stretch: Ensures the text column acts as a full-height container to push the button to the bottom.
                */}
                <div className="flex flex-col lg:flex-row lg:items-stretch justify-between gap-y-12 gap-x-(--sp-lt)">

                    {/* --- Left Column: Text --- */}
                    <div className="flex-1 flex flex-col justify-center w-full max-w-xl lg:max-w-none">

                        <div className="flex flex-col gap-y-4">
                            <p className="tagline">We&apos;re here to listen, not to judge.</p>
                            <Heading text={aboutHeading} level={3} />
                        </div>

                        <div className="flex flex-col gap-y-[14px] mt-6 mb-[21px] max-w-[54ch]">
                            {para.map((p, i) => (
                                <p key={i} className="text-p1 font-reg text-black-lt leading-[1.3]">
                                    {p}
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col gap-y-3 mt-[49px] lg:mt-auto mb-[21px]">
                            {tags.map((tag, i) => (
                                <div key={i} className="flex items-center gap-x-5">
                                    <div className="w-[30px] h-[30px] shrink-0 bg-white rounded-full grid place-content-center shadow-sm">
                                        <Tick className="text-green-600" size={20} />
                                    </div>
                                    <p className="text-p2 font-bd text-black-lt">{tag}</p>
                                </div>
                            ))}
                        </div>

                        {/* 
                           mt-10 on mobile for separation. 
                           lg:mt-auto pushes this button to the bottom of the flex container on desktop 
                           to align with the bottom of the image.
                        */}
                        <div className="mt-10 lg:mt-auto">
                            <LinkButton
                                className="w-max text-black-lt"
                                textColor="text-gray-300"
                                shineColor="text-black"
                                href="/"
                            >
                                Meet the therapists
                            </LinkButton>
                        </div>

                    </div>

                    {/* --- Right Column: Image --- */}
                    <div className="w-full lg:flex-1 relative">
                        <div className="w-full aspect-[617/610] relative">
                            <Image
                                src="/assets/about.jpg"
                                alt="Therapy session environment"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover rounded-(--rd-md)"
                                priority={false}
                            />
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}

export default About;