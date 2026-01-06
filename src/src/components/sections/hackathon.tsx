import { motion } from "framer-motion";
import { Link } from "wouter";
import { NeonButton } from "@/components/ui/neon-button";
import hackathonBg from "@assets/generated_images/abstract_digital_code_background.png";
import { Clock, Code2, Users, Trophy } from "lucide-react";

export function Hackathon() {
  const timeline = [
    { time: "Round 1", title: "Ideation", desc: "Online submission." },
    { time: "Round 2", title: "Prototype", desc: "Online Development Phase." },
    { time: "Finale", title: "Offline Presentation", desc: "Present to judges." },
  ];

  return (
    <section id="hackathon" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src={hackathonBg}
          alt="Code Rain"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-orbitron font-bold text-4xl md:text-6xl text-white mb-2 leading-tight">
                OFFLINE <span className="text-primary text-glow">OVERDRIVE HACK</span>
              </h2>
              <p className="font-oxanium text-accent text-xl tracking-widest mb-6">
                BUILD // BREAK // INNOVATE
              </p>

              <p className="text-gray-400 font-poppins text-lg mb-8 leading-relaxed">
                Duration: 8-10 Hours (Offline). Team Size: Up to 5 Members. Entry Fee: ₹200/team.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <Trophy className="w-8 h-8 text-primary mb-2" />
                  <div className="font-bold text-2xl text-white">TBA</div>
                  <div className="text-xs text-gray-500 uppercase">Prize Pool</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <Users className="w-8 h-8 text-secondary mb-2" />
                  <div className="font-bold text-2xl text-white">Open to 500+</div>
                  <div className="text-xs text-gray-500 uppercase">Participants</div>
                </div>
              </div>

              <Link href="/register?event=Hackathon">
                <NeonButton
                  variant="primary"
                >
                  Register Team
                </NeonButton>
              </Link>
            </motion.div>
          </div>

          <div className="md:w-1/2">
            <div className="relative border-l-2 border-white/10 ml-6 space-y-12 py-4">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-8 group"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-white/30 group-hover:border-primary group-hover:bg-primary transition-all shadow-[0_0_0_4px_rgba(0,0,0,1)]" />
                  <span className="text-sm font-oxanium text-primary block mb-1">{item.time}</span>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
