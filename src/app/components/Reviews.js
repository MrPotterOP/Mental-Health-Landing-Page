'use client'

import Heading from "./UI/Heading";
import { ArrowRight } from "../svgs";
import Testimonial from "./UI/Testimonial";

import { useState } from "react";

function Reviews({ testimonials }) {

    const [click, setClick] = useState(false);

    return (
        <section className="w-full flex flex-col" aria-label="Client testimonials">
            <div className="w-full border-b border-[#0000001a] py-[28px] px-[42px]">
                <div className="heading-container">
                    <Heading className="inline-block" text="Moments of \img Relief" level={2} img="/assets/relief.jpg" alt="healing from the pain" />

                    <div className="flex items-center ml-[7px]">
                        <ArrowRight onClick={() => setClick("left")} className="trasfrom -rotate-180 opacity-50 w-[34px] h-[34px] md:w-[44px] md:h-[44px] lg:w-[52px] lg:h-[52px] cursor-pointer" />
                        <ArrowRight onClick={() => setClick("right")} className="w-[34px] h-[34px] md:w-[44px] md:h-[44px] lg:w-[52px] lg:h-[52px] cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="w-full grid place-content-center pt-[70px]">
                <Testimonial testimonials={testimonials} click={click} setClick={setClick} />
            </div>

        </section>
    );
}

export default Reviews;