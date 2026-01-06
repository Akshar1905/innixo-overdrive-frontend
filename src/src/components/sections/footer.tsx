import { Terminal } from "lucide-react";
import logo from "@/assets/logo.png";
import { SOCIAL_LINKS } from "@/config/socials";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10 relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02))] z-0 bg-[length:100%_2px,20px_100%] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={logo} alt="INNIXO Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-2xl text-white">INNIXO</h3>
              <p className="font-oxanium text-gray-500 text-sm tracking-widest">OVERDRIVE 2026</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <h4 className="font-oxanium text-primary text-sm uppercase tracking-widest">Connect With Us</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_theme(colors.primary)] group"
                >
                  <link.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-poppins">
          <p>© 2026 INNIXO. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 flex-wrap justify-center">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Code of Conduct</a>
            <span className="text-white/20">|</span>
            <Link href="/credits" className="font-oxanium text-gray-400 hover:text-primary hover:shadow-[0_0_10px_theme(colors.primary)] transition-all duration-300">
              Made By <span className="text-primary/70">Akshar Adgale</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
