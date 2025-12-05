import CtaButton from "./CtaButton";
import Image from "next/image";

function TeamCard({
    name,
    img,
    bio,
    experties,
    intro,
}) {

    return (
        <div className={`
            bg-white flex shrink-0 flex-col justify-between 
            shadow-[0_2_22px_0_rgba(0,0,0,0.1)]
            
            /* Sizing & Responsive Widths */
            w-full max-w-[335px] md:max-w-[440px]
            min-w-[340px]
            
            /* Responsive Spacing/Padding */
            p-[16px] pb-[14px] md:px-[20px] md:pt-[20px]
            
            /* Responsive Border Radius */
            rounded-[32px] md:rounded-[42px]

        `}>

            <div className="flex flex-col min-w-[304px]">
                {/* Image: Removed inline styles, added responsive height and radius */}
                <div className="relative w-full mb-[16px] md:mb-[20px] shrink-0">
                    <Image
                        className="rounded-[28px] md:rounded-[36px] object-cover w-full h-[340px] md:h-[420px]"
                        src={img}
                        alt={name}
                        width={400}
                        height={420}
                    />
                    <div className="absolute bottom-[14px] left-0 px-[14px] flex flex-wrap gap-x-[7px] gap-y-[7px]">
                        {
                            experties.map((expertie, i) => (
                                <div className="relative p-[4px_14px] shadow-[0_0_2px_0] rounded-full text-[14px] blurred-bg" key={i}>

                                    {/* --- Grainy Texture --- */}
                                    <div
                                        className="absolute top-0 left-0 w-full h-full rounded-[var(--rd-md)]
                                        pointer-events-none opacity-[0.1] mix-blend-overlay
                                        bg-[url('/assets/grain.png')] bg-repeat bg-[length:20px_20px]
                                    "
                                    />

                                    {/* White transparent fill for readability */}
                                    <div className="absolute inset-0 bg-black/5 rounded-full" />

                                    <span className="text-white">{expertie}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <h6 className="text-h4 font-bold">{name}</h6>
                <p className="mb-3 text-p3 text-black-lt">{bio}</p>

                {/* <div className="mb-[16px] md:mb-[20px] flex flex-wrap gap-x-[7px] gap-y-[7px]">
                    {
                        experties.map((expertie, i) => (
                            <div className="p-[4px_14px] shadow-[0_0_2px_0] rounded-full text-[14px]" key={i}>
                                <span>{expertie}</span>
                            </div>
                        ))
                    }
                </div> */}

                <p className="mb-[16px] md:mb-[20px] text-p1 leading-[1.3] text-black-lt/90">{intro}</p>
            </div>

            <CtaButton className="" href="/">Book Appointment</CtaButton>

        </div>
    );
}

export default TeamCard;