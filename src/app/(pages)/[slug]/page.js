import { redirect } from "next/navigation";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Reviews from "../../components/Reviews";
import Marquee from "../../components/UI/Marquee";
import Team from "../../components/Team";
import Services from "../../components/Services";
import Faq from "../../components/Faqs";
import Cta from "../../components/Cta";
import Footer from "../../components/Footer";

// Function to fetch data from the API
async function getPageData(slug) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${baseUrl}/api/page?slug=${slug}`, {
            cache: 'no-store', // Ensure fresh data on every request
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data.page;
    } catch (error) {
        console.error("Error fetching page data:", error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const page = await getPageData(slug);

    if (page) {
        return {
            title: `${page.name} | Website Design`,
            description: `Website Design for ${page.name} | Created by Shubham.`,
        };
    }
    return {
        title: "Page Not Found",
    };
}

export default async function Page({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const page = await getPageData(slug);

    // Redirect to home if page data is not found or error occurs
    if (!page) {
        redirect('/');
    }

    return (
        <>
            <Hero number={page.number} logo={page.logo} />

            <main aria-label="main-content" className="flex flex-col gap-y-(--sp-md) items-center">
                <About number={page.number} members={page.members} />
                <Reviews testimonials={page.testimonials ? page.testimonials : false} />
                <Marquee />
                <Team team={page.team} />
                <Services services={page.services} problems={page.problems} />
                <Faq faqs={page.faqs} />
                <Cta />
            </main>

            <Footer
                address={page.address}
                number={page.number}
                email={page.email}
                name={page.name}
                logo={page.logoLt ? page.logoLt : page.logo}
                light={page.logoLt ? true : false}
            />
        </>
    );
}
