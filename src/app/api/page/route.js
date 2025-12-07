import { prisma } from "../../utils/prisma";


export async function GET(request) {
    try {
        // Find Page With slug and Include this relational data - team, services, faq
        const page = await prisma.page.findUnique({
            where: {
                slug: request.nextUrl.searchParams.get("slug")
            },
            include: {
                team: true,
                services: true,
                faqs: true,
                address: true,
                testimonials: true,
            }
        });
        return new Response(JSON.stringify({ page }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}