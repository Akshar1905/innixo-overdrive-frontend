import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/neon-button";
import { Code, Terminal, Gamepad2, Lightbulb, Trophy, Layers } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

export function Events() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "All Events" },
    { id: "coding", label: "Coding" },
    { id: "gaming", label: "Esports" },
    { id: "tech", label: "Tech Innovation" },
  ];

  const events = [
    {
      id: 1,
      category: "coding",
      title: "Code Red: Innixo Files",
      icon: <Terminal className="w-8 h-8 text-primary" />,
      prize: "₹600",
      description: "Escape Room Challenge. Solve puzzles to escape. Team of 3. Fee: ₹90/team."
    },
    {
      id: 2,
      category: "tech",
      title: "Paper Presentation",
      icon: <Layers className="w-8 h-8 text-secondary" />,
      prize: "Certificates",
      description: "Present your research. IEEE norms apply. Mode: Presentation."
    },
    {
      id: 3,
      category: "tech",
      title: "Prompt Forge",
      icon: <Lightbulb className="w-8 h-8 text-accent" />,
      prize: "₹600",
      description: "AI Poster Presentation. Individual event. Fee: ₹30."
    },
    {
      id: 4,
      category: "tech",
      title: "Overdrive UI",
      icon: <Code className="w-8 h-8 text-primary" />,
      prize: "₹500",
      description: "Frontend Design Challenge using Figma/Canva. Individual. Fee: ₹50."
    },
    {
      id: 5,
      category: "coding",
      title: "Debug Arena",
      icon: <Code className="w-8 h-8 text-secondary" />,
      prize: "₹600",
      description: "Find bugs, fix code. Speed + Accuracy. Team of 2. Fee: ₹120/team."
    },
    {
      id: 6,
      category: "coding",
      title: "Code Sprint",
      icon: <Terminal className="w-8 h-8 text-accent" />,
      prize: "₹600",
      description: "C/C++/Java/Python logic challenge. Team of 2. Fee: ₹120/team."
    },
  ];

  const filteredEvents = activeTab === "all" ? events : events.filter(e => e.category === activeTab);

  return (
    <section id="events" className="py-24 bg-[#050508] relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4 text-white">
            EVENT <span className="text-secondary">DOMAINS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "px-6 py-2 rounded-full border transition-all duration-300 font-oxanium tracking-wider text-sm",
                activeTab === cat.id
                  ? "bg-secondary/20 border-secondary text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "bg-transparent border-white/10 text-gray-400 hover:border-white/30"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={event.id}
              className="glass-panel p-1 rounded-xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="bg-[#0A0A0F] p-6 rounded-lg h-full border border-white/5 group-hover:border-primary/50 transition-colors relative z-10 flex flex-col">
                <div className="mb-6 p-4 rounded-lg bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-primary/50">
                  {event.icon}
                </div>

                <h3 className="font-orbitron font-bold text-2xl text-white mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                <p className="text-gray-400 text-sm font-poppins mb-6 flex-grow">
                  {event.description}
                </p>

                <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-oxanium uppercase">Prize Pool</span>
                    <span className="text-secondary font-bold font-oxanium text-lg">{event.prize}</span>
                  </div>
                  <Link href={`/register?event=${encodeURIComponent(event.title)}`}>
                    <button
                      className="text-sm text-primary font-oxanium uppercase tracking-wider hover:text-white transition-colors flex items-center gap-1 group/btn cursor-pointer"
                    >
                      Register
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
