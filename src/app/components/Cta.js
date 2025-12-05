import Image from "next/image";
import CtaButton from "./UI/CtaButton";

import { Calendar } from "../svgs";

function Cta() {
    return (
        <section className="">
            <div className="relative m-[7px] rounded-[24px] overflow-hidden">
                <Image className="w-lvw h-[calc(100vh-91px)] object-cover rounded-[24px] object-center" width={1400} height={1000} src="/assets/cta.jpg" alt="cta" />
                <div></div>

                <div className="absolute top-0 left-0 w-full h-full grid place-content-center bg-[rgba(0,0,0,0.2)]">
                    <div className="max-w-[660px] flex flex-col items-center gap-y-[14px] text-white text-center">

                        <h3 className="text-h2 font-serif leading-[1]">Not sure where to <br /> start?</h3>
                        <p className="text-p1 px-(--c-sp-lt)">Book a 10-minute free discovery call with our intake coordinator to learn more and figure out the right solution for you.</p>
                        <CtaButton className="mt-[56px] w-[260px] gap-x-[12px]" type="white" href="/"><Calendar /> Book a Discovery Call</CtaButton>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cta;