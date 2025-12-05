'use client';
import Image from "next/image";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

function ParallaxText({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-4, 0, 4], {
        clamp: true
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    useAnimationFrame((t, delta) => {
        let moveBy = baseVelocity * (delta / 1000);

        if (velocityFactor.get() !== 0) {
            moveBy += moveBy * velocityFactor.get();
        }

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div className="flex whitespace-nowrap flex-nowrap gap-x-5" style={{ x }}>
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

function Marquee() {

    const text = "Healing starts with being heard.";
    const img = "/assets/marquee.jpg";

    const resolution = {
        x: 118,
        y: 79,
    }

    return (
        <section className="w-full py-10 overflow-hidden">
            <ParallaxText baseVelocity={-2}>
                <div className="flex items-center gap-x-5 mr-[60px] md:mr-[120px]">
                    <Image className="w-[62px] h-[42px] md:w-[118px] md:h-[79px] rounded-lg object-cover" src={img} width={resolution.x} height={resolution.y} alt="group of people showing sense of belonging" />
                    <span className={`text-[52px] md:text-[96px] font-serif leading-[1.2]`}>{text}</span>
                </div>
            </ParallaxText>
        </section>
    );
}

export default Marquee;