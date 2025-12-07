import { prisma } from "../../utils/prisma";


export async function POST(request) {

    let body = null;

    try {
        body = await request.json();
    } catch (error) {
        body = null;
    }

    //Auth Check Passkey
    if (!body || !body?.passkey || body.passkey !== process.env.PASSKEY) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        // Select Feilds - name, slug, logo, email
        const pages = await prisma.page.findMany({
            select: {
                name: true,
                slug: true,
                logo: true,
                email: true,
            },
        });
        return new Response(JSON.stringify({ pages }), {
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