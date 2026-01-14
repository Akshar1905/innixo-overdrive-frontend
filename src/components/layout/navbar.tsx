import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeonButton } from "@/components/ui/neon-button";
import logo from "@/assets/logo.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Hackathon", href: "#hackathon" },
    { name: "Esports", href: "#esports" },
    { name: "Schedule", href: "#schedule" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-[#0A0A0F]/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <img
            src={logo}
            alt="INNIXO – OVERDRIVE 2026 Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col">
            <span className="font-orbitron font-bold text-xl tracking-wider text-white leading-none">
              INNIXO
            </span>
            <span className="font-oxanium text-xs text-primary tracking-[0.2em] leading-none">
              OVERDRIVE 2026
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isHome = useLocation()[0] === "/";
            const href = isHome ? link.href : `/${link.href}`;
            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (isHome) {
                e.preventDefault();
                const element = document.querySelector(link.href);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }
            };

            return (
              <a
                key={link.name}
                href={href}
                onClick={handleClick}
                className="font-oxanium text-sm uppercase tracking-wider text-gray-400 hover:text-primary transition-colors relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            );
          })}
          <Link href="/register">
            <NeonButton variant="accent" className="px-6 py-2 text-sm">
              Register
            </NeonButton>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0A0A0F] border-b border-white/10 p-4 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => {
              const [location] = useLocation();
              const isHome = location === "/";
              const href = isHome ? link.href : `/${link.href}`;

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (isHome) {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    setMobileMenuOpen(false);
                  }
                } else {
                  setMobileMenuOpen(false);
                }
              };

              return (
                <a
                  key={link.name}
                  href={href}
                  className="font-oxanium text-lg text-gray-300 hover:text-primary py-2 block"
                  onClick={handleClick}
                >
                  {link.name}
                </a>
              );
            })}
            <Link href="/register">
              <NeonButton variant="accent" className="w-full">
                Register Now
              </NeonButton>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
