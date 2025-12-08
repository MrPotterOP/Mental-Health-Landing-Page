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
import { prisma } from "../../utils/prisma";

export const dynamicParams = true; // Use ISR for unknown slugs
// export const revalidate = 60; // Revalidate every 60 seconds (optional fallback)

// Generate static params for existing pages
export async function generateStaticParams() {
    try {
        const pages = await prisma.page.findMany({
            select: {
                slug: true,
            },
        });
        return pages.map((page) => ({
            slug: page.slug,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

// Function to fetch data directly from DB
async function getPageData(slug) {
    try {
        const page = await prisma.page.findUnique({
            where: {
                slug: slug
            },
            include: {
                team: true,
                services: true,
                faqs: true,
                address: true,
                testimonials: true,
            }
        });
        return page;
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
