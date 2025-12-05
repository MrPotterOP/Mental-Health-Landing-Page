import Navbar from "./UI/Navbar";
import Image from "next/image";
import Heading from "./UI/Heading";
import CtaButton from "./UI/CtaButton";
import { Calendar } from "../svgs";

function Hero({ number, logo }) {
    const profiles = [
        "/assets/profile-1.jpg",
        "/assets/profile-4.jpg",
        "/assets/profile-3.jpg",
        "/assets/profile-2.jpg",
    ];

    return (
        <>
            <header>
                <Navbar number={number} logo={logo} />
            </header>

            <section
                aria-label="hero-content"
                id="top"
                className="p-[var(--c-sp-xsm)] w-full h-[calc(100vh-10px)] min-h-[650px] overflow-hidden"
            >
                <div className="relative bg-[url('/assets/hero.jpg')] bg-cover bg-center bg-no-repeat w-full h-full rounded-[var(--rd-md)]">
                    {/* --- Overlays --- */}
                    {/* <div className="absolute top-0 left-0 w-full h-full rounded-[var(--rd-md)] backdrop-blur-[2px]"></div>
                    <div
                        className="
                absolute top-0 left-0 w-full h-full rounded-[var(--rd-md)]
                pointer-events-none opacity-[0.2] mix-blend-overlay
                bg-[url('/assets/grain.png')] bg-repeat bg-[length:200px_200px]
            "
                    />
                    <div className="absolute top-0 left-0 w-full h-full z-[0] rounded-[var(--rd-md)] bg-black opacity-20"></div> */}

                    {/* Blur */}
                    <div className="absolute z-[1] top-0 left-0 w-full h-full rounded-[var(--rd-md)] backdrop-blur-[1px]"></div>

                    {/* black overlay */}
                    <div className="absolute z-[1] top-0 left-0 w-full h-full rounded-[var(--rd-md)] bg-black opacity-32" ></div>

                    {/* Grainy Texture */}
                    <div
                        className="absolute top-0 left-0 w-full h-full rounded-[var(--rd-md)]
                        pointer-events-none opacity-[0.1] mix-blend-overlay
                        bg-[url('/assets/gr3.png')] bg-repeat bg-[length:80px_80px]
                    "
                    />

                    {/* --- Main Content --- */}
                    <div className="w-full h-full grid place-content-center z-[9] px-[var(--c-sp-lt)]">

                        <div className="flex flex-col items-center text-center">

                            <div className="z-9 mt-[var(--sp-lt)] flex flex-wrap-reverse justify-center gap-[10px] md:gap-x-4 mb-[7px]">

                                {/* Badge 1 */}
                                <div className="
                                    relative
                                    blurred-bg rounded-full 
                                    px-[16px] py-[7px] md:px-[21px]
                                    flex gap-x-[14px] md:gap-x-[21px] items-center
                                ">

                                    {/* --- Grainy Texture --- */}
                                    <div
                                        className="absolute top-0 left-0 w-full h-full rounded-[var(--rd-md)]
                                        pointer-events-none opacity-[0.2] mix-blend-overlay
                                        bg-[url('/assets/grain.png')] bg-repeat bg-[length:20px_20px]
                                    "
                                    />

                                    <span className="text-p2 font-md text-white whitespace-nowrap">
                                        300+ Healing journeys
                                    </span>

                                    {/* Dynamic Icon Sizing: w-28px on mobile, w-34px on desktop */}
                                    <div className="flex [--shift:12px] ml-[10px] md:ml-[14px]">
                                        {profiles.map((profile, i) => (
                                            <Image
                                                key={profile + i}
                                                src={profile}
                                                alt="profile"
                                                width={40}
                                                height={40}
                                                className="
                          h-[28px] w-[28px] md:h-[34px] md:w-[34px] 
                          ml-[-10px] md:ml-[-14px] 
                          object-cover rounded-full border-2 border-white
                        "
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Badge 2 */}
                                <div className="
                                    relative
                                    blurred-bg rounded-full 
                                    px-[16px] py-[7px] md:px-[21px]
                                    flex gap-x-[10px] md:gap-x-[14px] items-center
                                ">

                                    {/* --- Grainy Texture --- */}
                                    <div
                                        className="absolute top-0 left-0 w-full h-full rounded-[var(--rd-md)]
                                        pointer-events-none opacity-[0.2] mix-blend-overlay
                                        bg-[url('/assets/grain.png')] bg-repeat bg-[length:80px_80px]
                                    "
                                    />

                                    <span className="text-p2 font-md text-white whitespace-nowrap">
                                        Verified by:
                                    </span>

                                    {/* Dynamic Image Sizing */}
                                    <Image
                                        src="/assets/pt.png"
                                        alt="verified by Psycology Today"
                                        width={120}
                                        height={40}
                                        className="h-[28px] md:h-[34px] w-auto object-cover drop-shadow-[0px_0px_1px_rgba(0,0,0,0.5)]"
                                    />
                                </div>
                            </div>

                            <div className="z-9 flex flex-col gap-y-7 items-center text-white">
                                <Heading
                                    text={"When it feels too heavy to\n handle alone,  we're\n here \\img for you."}
                                    textMobile={"When it feels too heavy to handle alone,  we're\n here \\img for you."}
                                    level={1}
                                    img="/assets/hero.jpg"
                                    alt="a ray of sunshine describing hope"
                                />
                                <p className="textBody max-w-[600px]">
                                    Personalised therapy and counselling to help you find calm
                                    through<br className="hidden md:block" /> anxiety, depression, and life&apos;s toughest moments.
                                </p>
                            </div>

                            <div className="
                  z-9 flex flex-col gap-y-[7px] items-center 
                  w-[90%] max-w-[258px] 
                  mt-[var(--sp-lt)]
              ">
                                <CtaButton
                                    classname="w-full text-black bg-white gap-x-[7px]"
                                    type="white"
                                    href="/"
                                >
                                    <Calendar stroke="#0000" size={20} /> Book a Free Consultation
                                </CtaButton>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;