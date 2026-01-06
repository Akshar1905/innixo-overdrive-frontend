
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Instagram, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { NeonButton } from "@/components/ui/neon-button";
import aksharImg from "@/assets/akshar.jpeg";

export default function Credits() {
    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden relative flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02))] z-0 bg-[length:100%_2px,20px_100%] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_70%)] pointer-events-none" />

            {/* Back Button */}
            <Link href="/">
                <div className="absolute top-8 left-8 z-20 cursor-pointer group">
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span className="font-oxanium uppercase tracking-widest text-sm">Back to Home</span>
                    </div>
                </div>
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-4xl relative z-10"
            >
                <div className="relative group">
                    {/* Neon Border Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-1000 animate-gradient-xy" />

                    <div className="relative bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-12">

                        {/* Left Column: Image */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative shrink-0"
                        >
                            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-tr from-primary to-purple-600 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                                <img
                                    src={aksharImg}
                                    alt="Profile photo of Akshar Adgale"
                                    className="w-full h-full rounded-full object-cover border-4 border-[#0A0A0F]"
                                />
                            </div>
                            {/* Decorative Ring */}
                            <div className="absolute -inset-4 border border-dashed border-white/20 rounded-full animate-spin-slow" />
                        </motion.div>

                        {/* Right Column: Info */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center md:items-start text-center md:text-left w-full"
                        >
                            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-oxanium tracking-[0.2em] mb-4">
                                CREATOR
                            </div>

                            <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-2 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                Akshar Adgale
                            </h1>

                            <h2 className="font-oxanium text-lg text-gray-400 mb-8 tracking-wider">
                                B.Tech – Artificial Intelligence and Data Science
                            </h2>

                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

                            {/* Contact Info */}
                            <div className="flex flex-col gap-3 w-full mb-8">
                                <a href="tel:9359601020" className="flex items-center gap-4 group/item w-full md:w-auto justify-center md:justify-start">
                                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                                        <Phone className="w-5 h-5 text-gray-300 group-hover/item:text-primary" />
                                    </div>
                                    <span className="font-oxanium text-gray-300 tracking-wider hover:text-white transition-colors">
                                        +91 9359601020
                                    </span>
                                </a>

                                <a href="mailto:akshar1905@gmail.com" className="flex items-center gap-4 group/item w-full md:w-auto justify-center md:justify-start">
                                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                                        <Mail className="w-5 h-5 text-gray-300 group-hover/item:text-primary" />
                                    </div>
                                    <span className="font-oxanium text-gray-300 tracking-wider hover:text-white transition-colors">
                                        akshar1905@gmail.com
                                    </span>
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4">
                                {[
                                    { icon: Instagram, href: "https://www.instagram.com/akshar._.1905/", label: "Instagram" },
                                    { icon: Linkedin, href: "https://www.linkedin.com/in/akshar-adgale", label: "LinkedIn" },
                                    { icon: Github, href: "https://github.com/Akshar1905", label: "GitHub" }
                                ].map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit Akshar's ${social.label}`}
                                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:shadow-[0_0_20px_theme(colors.primary)] hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <social.icon className="w-6 h-6" />
                                    </a>
                                ))}
                            </div>

                        </motion.div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="font-oxanium text-xs text-gray-600 tracking-[0.3em]">
                        DESIGNED & DEVELOPED FOR INNIXO 2026
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
