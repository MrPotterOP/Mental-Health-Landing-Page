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
    title: "California Depth Therapy | Website Design",
    description: "Website Design for California Depth Therapy | Created by Shubham.",
};

const data = {
    number: "858-224-2945",
    members: 8,
    logo: "/assets/cdt/logo.png",
    name: "California Depth Therapy.",
    email: "info@californiadepththerapy.com"

}

const team = [
    {
        name: "Hannah Friesen",
        img: "/assets/cdt/ha.jpg",
        bio: "Marriage and Family Therapist | 7+ years experience",
        experties: ["Psychodynamic", "Trauma-Informed", "Relational Therapy"],
        intro:
            "Hi, I'm Hannah. I help people slow down, understand their patterns and feel like themselves again. My approach is psychodynamic, trauma-informed and relational, exploring how past experiences shape the present. Together, we gently bring clarity and compassion to the places where you feel stuck."
    },
    {
        name: "Victoria Savory",
        img: "/assets/cdt/vic.jpg",
        bio: "Marriage and Family Therapist | 7+ years experience",
        experties: ["Relationship Insight", "Emotional Awareness", "Compassion-Focused Work"],
        intro:
            "I believe therapy is a transformative space to understand ourselves and our relationships. With a warm, safe environment, I help people build insight, strengthen connection, and relate to themselves and others with more compassion, creating healthier and more fulfilling lives."
    },
    {
        name: "Madeline Becker",
        img: "/assets/cdt/md.jpg",
        bio: "Marriage and Family Therapist | 4+ years experience",
        experties: ["Early Experiences", "Skill Building", "Identity Affirmation"],
        intro:
            "I'm Madeline, and I'm honored to support people through pain, healing and growth. My work explores early experiences, builds meaningful skills and holds space with compassion. I believe every person has the capacity to heal, and I aim to affirm identity, strength and resilience along the way."
    },
    {
        name: "Sarah Cullen",
        img: "/assets/cdt/sar.jpg",
        bio: "Clinical Counselor | 6+ years experience",
        experties: ["Anxiety", "ADHD", "Trauma"],
        intro:
            "I help sensitive, overwhelmed people explore anxiety, depression, ADHD and trauma with compassion. Together, we examine old patterns, soften self-criticism and rebuild trust in yourself. My space is grounding and safe, including for those healing from narcissistic abuse and reconnecting with authentic self-worth."
    },
    {
        name: "Carly Shadron",
        img: "/assets/cdt/car.jpg",
        bio: "Marriage and Family Therapist | 6+ years experience",
        experties: ["Emotional Support", "Healing and Growth", "Safe Processing"],
        intro:
            "I'm glad you're here. If life feels heavy or overwhelming, you don't have to navigate it alone. I offer a safe, understanding space to explore your experiences and move toward healing and growth, one step at a time, at a pace that feels right for you."
    }
];

const services = [
    {
        title: "Individual Therapy",
        desc: "We help individuals who feel stuck, disconnected, or overwhelmed by anxiety, grief, or long-standing patterns. Together, we explore your story, untangle unhelpful dynamics, and build healthier ways of relating to yourself and others.",
        img: "/assets/therapy/treatment.jpg",
    },
    {
        title: "Couples Therapy",
        desc: "We support couples experiencing miscommunication, disconnection, or conflict. Through deeper exploration, we guide partners toward open communication, stronger intimacy, aligned parenting, and healthier decision-making.",
        img: "/assets/therapy/couple.jpg",
    },
    {
        title: "Kids & Teens Therapy",
        desc: "We help children and teens navigate school pressure, anxiety, social challenges, and identity questions through play, art, games, and talk therapy. Our goal is to help them feel confident, supported, and free to express who they are.",
        img: "/assets/therapy/quote.jpg",
    },
    {
        title: "Psychodynamic Therapy",
        desc: "This deep, insight-oriented approach uncovers patterns beneath the surface. By exploring how past experiences shape current feelings and behaviours, we provide tailored support that fosters long-term self-awareness and meaningful change.",
        img: "/assets/therapy/support.jpg",
    },
];

const problems = [
    "Grief",
    "Anxiety",
    "Identity",
    "Overwhelm",
    "Old Patterns",
    "Disconnection",
    "Intimacy Issues",
    "Social Pressure",
    "Social Dynamics",
    "Miscommunication",
    "Tough Decisions",
    "Parenting Issues",
    "Self Expression Issues",
];



const address = [
    {
        link: "https://www.google.com/maps/place/5252+Balboa+Ave+%23601A,+San+Diego,+CA+92117,+USA/data=!4m2!3m1!1s0x80dc0071885c8a6b:0x165cb9cebdc032ae?sa=X&ved=1t:242&ictx=111",
        address: "5252 Balboa Ave. Suite 601a San Diego, CA 92117"
    }
]





export default function Home() {
    return (
        <>
            <Hero number={data.number} logo={data.logo} />

            <main aria-label="main-content" className="flex flex-col gap-y-(--sp-md) items-center">
                <About number={data.number} members={data.members} />
                <Reviews />
                <Marquee />
                <Team team={team} />
                <Services services={services} problems={problems} />
                <Faq />
                <Cta />
            </main>

            <Footer address={address} number={data.number} email={data.email} name={data.name} logo={data.logo} />
        </>
    )
}