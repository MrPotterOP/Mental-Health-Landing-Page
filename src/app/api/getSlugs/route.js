import { prisma } from "../../utils/prisma";

export async function GET() {
    try {
        const pages = await prisma.page.findMany({
            select: {
                slug: true,
            },
        });
        return new Response(JSON.stringify({ pages }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}