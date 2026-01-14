import { motion } from "framer-motion";
import { Link } from "wouter";
import { NeonButton } from "@/components/ui/neon-button";
import { Gamepad, Crosshair, Swords } from "lucide-react";
import { EVENTS } from "@/lib/events";

export function Esports() {
  return (
    <section id="esports" className="py-24 bg-[#08080C] relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-oxanium tracking-widest text-sm uppercase mb-2 block">Tournament</span>
          <h2 className="font-orbitron font-black text-5xl md:text-7xl text-white mb-6 uppercase italic">
            Cyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Arena</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Where legends are born. Compete in top-tier titles for glory and massive rewards.
            <br /><span className="text-xs font-mono text-primary mt-2 block">Format: Lab-wise elimination matches. Winners advance to Day 3 Finals.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "FALL GUYS", slug: "esports-fall-guys", icon: <Gamepad />, color: "border-accent", prize: "🥇₹1500" },
            { name: "VALORANT", slug: "esports-valorant", icon: <Crosshair />, color: "border-primary", prize: "🥇₹2000" },
            { name: "CS:GO", slug: "esports-csgo", icon: <Swords />, color: "border-secondary", prize: "🥇₹2000" }
          ].map((game, idx) => {
            // Retrieve full event config to access the image
            const eventConfig = EVENTS.find(e => e.slug === game.slug);
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className={`relative bg-[#0F0F16] border ${game.color} border-opacity-30 p-1 rounded-2xl overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="bg-[#0A0A0F] h-64 flex items-center justify-center relative overflow-hidden rounded-xl">
                  {/* Use Image if available, else placeholder gradient */}
                  {eventConfig?.image ? (
                    <>
                      <img
                        src={eventConfig.image}
                        alt={game.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent opacity-80" />
                    </>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${idx === 0 ? 'from-accent/20' : idx === 1 ? 'from-primary/20' : 'from-secondary/20'} to-transparent`} />
                  )}

                  <div className="relative z-10 transform scale-150 text-white/20 group-hover:text-white/80 transition-colors duration-500">
                    {!eventConfig?.image && game.icon && <div className="w-24 h-24 [&>svg]:w-full [&>svg]:h-full">{game.icon}</div>}
                  </div>
                </div>

                <div className="p-6 relative z-10">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-orbitron font-bold text-2xl text-white italic">{game.name}</h3>
                    <span className="font-oxanium font-bold text-accent text-xl">{game.prize}</span>
                  </div>
                  <Link href={`/register/${game.slug}`}>
                    <NeonButton
                      variant="secondary"
                      className="w-full py-2 text-sm"
                    >
                      Join Bracket
                    </NeonButton>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
