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
    title: "Psyche Mental Health Centre | Website Design",
    description: "Website Design for Psyche Mental Health Centre | Created by Shubham.",
};

const data = {
    number: "3-6223-2122",
    members: 9,
    logo: "/assets/1/logo.png",
    name: "Psyche Mental Health Centre.",
    email: "admin@psychementalhealthcentre.com"

}

const team = [
    {
        name: "Allison Wells",
        img: "/assets/1/al.jpg",
        bio: "Clinical Psychologist | Director",
        experties: ["Trauma", "EMDR", "CBT"],
        intro:
            "Hi, I'm Allison. I help individuals work through trauma using EMDR, alongside CBT, ACT and Schema Therapy. I aim to make therapy safe, genuine and sometimes even light. Outside sessions, I'm a mum, gym-lover, sports fan and occasional plant rescuer."
    },
    {
        name: "Jenny Atkins",
        img: "/assets/1/j.jpg",
        bio: "Clinical Psychologist | 6+ years experience",
        experties: ["Anxiety", "Life Changes", "Chronic Health"],
        intro:
            "Hi, I'm Jenny. I work with adults experiencing anxiety, low mood, stress, life changes, grief and chronic health conditions. My style is warm and genuine, using ACT and CBT in a relaxed, non-judgemental space. Outside work, I love hiking, camping and making pottery."
    },
    {
        name: "Rhiannon Sainty",
        img: "/assets/1/r.png",
        bio: "Psychologist | 6+ years experience",
        experties: ["CBT", "ACT", "Emotional Wellbeing"],
        intro:
            "Hi, I'm Rhiannon. I create a safe, compassionate space for people to explore their experiences and grow. My work blends CBT and ACT, tailored to each person's needs. Outside sessions, I'm often caring for my many plants or trying new recipes."
    },
    {
        name: "Toni Hawkins",
        img: "/assets/1/toni.jpg",
        bio: "Senior Psychologist | 10+ years experience",
        experties: ["Trauma", "ASD", "Anxiety"],
        intro:
            "Hi, I'm Toni. I support young people and adults with challenges such as trauma, ASD, personality concerns, depression, anxiety and identity exploration. My style is compassionate, creative and relaxed, using therapies like CBT, ACT, DBT and Narrative Therapy. Outside work, I enjoy my dogs, DIY and Tasmania's outdoors."
    },
    {
        name: "Maddie Wren",
        img: "/assets/1/md.jpg",
        bio: "Psychologist | 7+ years experience",
        experties: ["Anxiety", "PTSD", "Chronic Pain"],
        intro:
            "Hi, I'm Maddie. I support adults experiencing anxiety, depression, stress, adjustment difficulties, PTSD and chronic pain. I use CBT, DBT and ACT in a collaborative, person-centered way. Outside work, I'm usually outdoors hiking, camping or swimming around beautiful Hobart."
    },

];


const services = [
    {
        title: "Adolescent Mental Health Therapy",
        desc: "We support young people through the challenges of growing up. Our clinicians work closely with adolescents and their families to address concerns such as anxiety, depression, anger, self-harm, bullying, and behavioural issues. Our goal is to promote healthy emotional development and overall wellbeing.",
        img: "/assets/therapy/treatment.jpg",
    },
    {
        title: "MAIB & Workers Compensation Support",
        desc: "If you've experienced a psychological or physical injury due to a workplace or motor vehicle incident, we are here to assist. Our clinicians are experienced in helping individuals recover from trauma, manage mental health concerns, and navigate the compensation process with confidence.",
        img: "/assets/therapy/support.jpg",
    },
    {
        title: "Professional Supervision",
        desc: "Several of our clinicians are AHPRA Board Approved Supervisors offering professional supervision across all experience levels. We support students, early-career practitioners, and established professionals seeking guidance, growth, and insight into private practice settings.",
        img: "/assets/therapy/help.jpg",
    },
    {
        title: "Adult Mental Health Therapy",
        desc: "We provide therapy for adults experiencing a wide range of mental health concerns including depression, anxiety, grief and loss, PTSD, complex trauma, pain, and adjustment to life stressors. Just like physical health, mental health matters — and we are here to support you.",
        img: "/assets/therapy/quote.jpg",
    },
];

const address = [
    {
        link: "https://google.com/maps/dir/?api=1&destination=4%20Pierce%20St,%20Moonah%20TAS%207009,%20Australia",
        address: "4 Pierce Street \n Moonah TAS 7009"
    },
    {
        link: "https://google.com/maps/dir/?api=1&destination=2%20Fitzroy%20St,%20Sorell%20TAS%207172,%20Australia",
        address: "2 Fitzroy Street \n Sorell TAS 7172"
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
                <Services services={services} />
                <Faq />
                <Cta />
            </main>

            <Footer address={address} number={data.number} email={data.email} name={data.name} logo="/assets/1/logo-d.png" light={true} />
        </>
    )
}