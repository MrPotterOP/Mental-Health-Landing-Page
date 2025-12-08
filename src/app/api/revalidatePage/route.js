import { revalidatePath } from "next/cache";


export async function POST(request) {
    const body = await request.json();

    //Auth Check Passkey
    if (!body.passkey || body.passkey !== process.env.PASSKEY) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    //Validate Body
    if (!body.slug) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        revalidatePath(`/${body.slug}`);
        return new Response(JSON.stringify({ message: "Page revalidated successfully" }), {
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
