import { motion } from "framer-motion";

export function Schedule() {
  const schedule = [
    { day: "Day 1", date: "Feb 4", events: ["Opening Ceremony", "Debug Arena", "Code Sprint", "Code Red: Innixo Files", "Esports Bracket Start"] },
    { day: "Day 2", date: "Feb 5", events: ["Overdrive Hack (Hybrid)", "Prompt Forge", "Esports: Semi-Finals"] },
    { day: "Day 3", date: "Feb 6", events: ["Overdrive UI", "Paper Presentation", "Esports: Finals", "Prize Distribution"] },
  ];

  return (
    <section id="schedule" className="py-24 relative bg-[#0A0A0F]">
      <div className="container mx-auto px-4">
        <h2 className="font-orbitron font-bold text-4xl text-center text-white mb-16">
          EVENT <span className="text-primary">TIMELINE</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {schedule.map((day, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="relative p-6 border border-white/10 bg-white/5 rounded-xl hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="absolute top-0 right-0 px-4 py-2 bg-white/5 rounded-bl-xl border-l border-b border-white/10 font-oxanium text-sm text-gray-400 group-hover:text-primary group-hover:border-primary/50 transition-colors">
                {day.date}
              </div>

              <h3 className="font-orbitron font-bold text-3xl text-white mb-6 group-hover:text-primary transition-colors">
                {day.day}
              </h3>

              <ul className="space-y-4">
                {day.events.map((event, eIdx) => (
                  <li key={eIdx} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="font-poppins">{event}</span>
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
