import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/neon-button";
import heroBg from "@assets/generated_images/cyberpunk_digital_city_grid_background.png";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set event date to Feb 4, 2026
    const eventDate = new Date("2026-02-04T09:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Cyberpunk City"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/80 via-[#0A0A0F]/60 to-[#0A0A0F]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      </div>

      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block py-1 px-3 rounded-full border border-primary/30 bg-primary/10 text-primary font-oxanium tracking-widest text-xs md:text-sm mb-4">
            Dr. D. Y. Patil School of Science and Technology, Pune
          </span>
          <h1 className="font-orbitron font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white mb-2 relative">
            <span className="relative z-10">INNIXO</span>
            <span className="absolute -top-1 -left-1 text-primary/30 blur-sm z-0">INNIXO</span>
            <span className="absolute -bottom-1 -right-1 text-secondary/30 blur-sm z-0">INNIXO</span>
          </h1>
          <h2 className="font-orbitron font-bold text-2xl sm:text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary tracking-widest mt-2">
            OVERDRIVE
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-poppins text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
        >
          3-Day Technical Fest | Coding • AI • UI/UX • Esports • Hackathon
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg min-w-[100px]">
              <span className="font-orbitron text-4xl font-bold text-primary tabular-nums">
                {String(value).padStart(2, '0')}
              </span>
              <span className="font-oxanium text-xs uppercase tracking-widest text-gray-400 mt-1">
                {unit}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/register">
            <NeonButton variant="primary" className="text-lg px-10">
              Register Now
            </NeonButton>
          </Link>
          <NeonButton variant="secondary" glow={false} className="text-lg px-10 bg-transparent border border-secondary text-secondary hover:bg-secondary/10">
            View Events
          </NeonButton>
        </motion.div>
      </div>

      {/* Decorative Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-[linear-gradient(to_bottom,transparent,theme(colors.primary)_1px,transparent_2px)] bg-[length:100%_40px] [transform:perspective(500px)_rotateX(60deg)] opacity-20 origin-bottom pointer-events-none" />
    </section>
  );
}
