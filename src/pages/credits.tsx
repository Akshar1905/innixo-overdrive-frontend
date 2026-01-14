
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Instagram, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { NeonButton } from "@/components/ui/neon-button";
import aksharImg from "@/assets/akshar.jpeg";
import allenImg from "@/assets/alen.jpeg";
import raunakImg from "@/assets/raunak.png";

const CONTRIBUTORS = [
    {
        name: "Akshar Adgale",
        role: "Magazine Secretary",
        education: "B.Tech – Artificial Intelligence and Data Science",
        phone: "+91 9359601920",
        email: "akshar1905@gmail.com",
        image: aksharImg,
        socials: [
            { icon: Instagram, href: "https://www.instagram.com/akshar._.1905/", label: "Instagram" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/akshar-adgale", label: "LinkedIn" },
            { icon: Github, href: "https://github.com/Akshar1905", label: "GitHub" }
        ]
    },
    {
        name: "Allen Fernandez",
        role: "Technical Secretary",
        education: "B.Tech – Artificial Intelligence and Data Science",
        phone: "+91 9054377338",
        email: "fernandezallen234@gmail.com",
        image: allenImg,
        socials: [
            { icon: Linkedin, href: "https://www.linkedin.com/in/allen-fernandez-14jun06", label: "LinkedIn" },
            { icon: Github, href: "https://github.com/Allen1406", label: "GitHub" },
            { icon: Instagram, href: "https://www.instagram.com/hehe__allen", label: "Instagram" }
        ]
    },
    {
        name: "Raunak Raj",
        role: "Developer",
        education: "B.Tech – Artificial Intelligence and Data Science",
        phone: "+91 7415225247",
        email: "whyraunakk@gmail.com",
        image: raunakImg,
        socials: [
            { icon: Instagram, href: "https://www.instagram.com/r_raunakk?igsh=MTB1dDN2cXRiNXJlbA==", label: "Instagram" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/raunak-raj-087b02315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
            { icon: Github, href: "https://gitHub.com/rnk0-bit", label: "GitHub" }
        ]
    }
];

export default function Credits() {
    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white overflow-y-auto relative flex flex-col items-center p-4 md:p-8">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02))] z-0 bg-[length:100%_2px,20px_100%] pointer-events-none fixed" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.1),transparent_70%)] pointer-events-none fixed" />

            {/* Back Button */}
            <div className="w-full max-w-6xl mb-8 z-20">
                <Link href="/">
                    <div className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors cursor-pointer group">
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span className="font-oxanium uppercase tracking-widest text-sm">Back to Home</span>
                    </div>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl z-10 space-y-12"
            >
                <div className="text-center mb-12">
                    <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4 tracking-wide text-glow">
                        The Creators
                    </h1>
                    <p className="font-oxanium text-gray-400 tracking-widest uppercase text-sm">
                        Architects of INNIXO 2026
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-24">
                    {CONTRIBUTORS.map((dev, index) => (
                        <div key={index} className="relative group h-full">
                            {/* Neon Border Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-1000 animate-gradient-xy" />

                            <div className="relative bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 pt-24 md:p-10 md:pt-24 mt-0 shadow-2xl flex flex-col items-center text-center h-full">

                                {/* Profile Image (Floating overlap) */}
                                <div className="absolute -top-20">
                                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-tr from-primary to-purple-600 shadow-[0_0_30px_rgba(0,240,255,0.3)] relative group-hover:scale-105 transition-transform duration-500">
                                        {dev.image ? (
                                            <img
                                                src={dev.image}
                                                alt={dev.name}
                                                className="w-full h-full rounded-full object-cover border-4 border-[#0A0A0F]"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-[#0A0A0F] flex items-center justify-center border-4 border-[#0A0A0F]">
                                                <span className="font-orbitron text-4xl text-primary">{dev.name.charAt(0)}</span>
                                            </div>
                                        )}
                                        {/* Decorative Ring */}
                                        <div className="absolute -inset-3 border border-dashed border-white/20 rounded-full animate-spin-slow" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mt-12 w-full flex flex-col flex-grow">
                                    <div className="inline-block mx-auto px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-oxanium tracking-[0.2em] mb-4">
                                        {dev.role.toUpperCase()}
                                    </div>

                                    <h2 className="font-orbitron font-bold text-3xl text-white mb-2 tracking-wide">
                                        {dev.name}
                                    </h2>

                                    {dev.education && (
                                        <p className="font-oxanium text-sm text-gray-400 mb-6 tracking-wider">
                                            {dev.education}
                                        </p>
                                    )}

                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

                                    {/* Contact Info */}
                                    <div className="flex flex-col gap-3 w-full mb-8 items-center">
                                        <a href={`tel:${dev.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 group/item transition-colors">
                                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                                                <Phone className="w-4 h-4 text-gray-300 group-hover/item:text-primary" />
                                            </div>
                                            <span className="font-oxanium text-sm text-gray-300 tracking-wider hover:text-white transition-colors">
                                                {dev.phone}
                                            </span>
                                        </a>

                                        <a href={`mailto:${dev.email}`} className="flex items-center gap-3 group/item transition-colors">
                                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                                                <Mail className="w-4 h-4 text-gray-300 group-hover/item:text-primary" />
                                            </div>
                                            <span className="font-oxanium text-sm text-gray-300 tracking-wider hover:text-white transition-colors">
                                                {dev.email}
                                            </span>
                                        </a>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex gap-4 justify-center mt-auto">
                                        {dev.socials.map((social, idx) => (
                                            <a
                                                key={idx}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit ${dev.name}'s ${social.label}`}
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:shadow-[0_0_15px_theme(colors.primary)] hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <social.icon className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center pb-8">
                    <p className="font-oxanium text-xs text-gray-600 tracking-[0.3em]">
                        DESIGNED & DEVELOPED FOR INNIXO 2026
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
