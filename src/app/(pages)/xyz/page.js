import Hero from "../../components/Hero"
import About from "../../components/About"
import Reviews from "../../components/Reviews"
import Marquee from "../../components/UI/Marquee"
import Team from "../../components/Team"
import Services from "../../components/Services"
import Faq from "../../components/Faqs"
import Cta from "../../components/Cta"
import Footer from "../../components/Footer"


export const metadata = {
    title: "",
    description: "",
};

export default function Home() {
    return (
        <>
            <Hero />

            <main aria-label="main-content" className="flex flex-col gap-y-(--sp-md) items-center">
                <About />
                <Reviews />
                <Marquee />
                <Team />
                <Services />
                <Faq />
                <Cta />
            </main>

            <Footer />
        </>
    )
}