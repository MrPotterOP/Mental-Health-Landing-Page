import { prisma } from "../../utils/prisma";

export async function POST(request) {
    const body = await request.json();

    //Auth Check Passkey
    if (!body.passkey || body.passkey !== process.env.PASSKEY) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Validate Body
    if (!body.slug || !body.name || !body.email || !body.number || !body.members || !body.logo || !body.address || !body.faqs || !body.services || !body.problems || !body.team) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    //Polish body | add create: for relations

    const reviews = [
        {
            name: "Grace Lee",
            img: "/assets/client-2.jpg",
            social: "/",
            bio: "Real Estate Agent | California",
            review: "Dealing with grief after losing my job felt overwhelming, but this team's compassionate approach helped me process it without judgment. Their online sessions fit perfectly into my busy schedule, and I've built resilience I didn't know I had."
        },
        {
            name: "Cristina Fox",
            img: "/assets/client.jpg",
            social: "/",
            bio: "Pet Nutritionist | Colorado",
            review: "I've been dealing with a lot of grief since my husband passed away. This therapist was a lifesaver. Their approachable and empathetic approach helped me feel less alone and more supported. I highly recommend them!"
        },
        {
            name: "Sarah Lee",
            img: "/assets/client-3.jpg",
            social: "/",
            bio: "Instagram Influencer | New York",
            review: "I was confused and overwhelmed by the loss of my husband. This therapist helped me process my emotions and find a way to move forward. Their support and understanding were invaluable. I highly recommend them!"
        },
        {
            name: "Selina Johnson",
            img: "/assets/client-4.jpg",
            social: "/",
            bio: "CEO Habox LTD | London",
            review: "This anxious therapist helped me deal with the loss of my husband. Their empathetic approach and understanding helped me feel less alone and more supported. I highly recommend them!"
        },
    ]

    const testimonials = body.testimonials ? body.testimonials : reviews;

    const data = {
        address: {
            create: body.address,
        },
        faqs: {
            create: body.faqs,
        },
        services: {
            create: body.services,
        },
        team: {
            create: body.team,
        },
        name: body.name,
        email: body.email,
        number: body.number,
        members: body.members,
        logo: body.logo,
        slug: body.slug,
        logoLt: body.logoLt ? body.logoLt : null,
        problems: body.problems,
        testimonials: {
            create: testimonials,
        }
    }

    try {
        const page = await prisma.page.create({
            data: data,
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