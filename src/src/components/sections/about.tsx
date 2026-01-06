import { motion } from "framer-motion";
import { Cpu, Globe, Zap, Code, Shield } from "lucide-react";

export function About() {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: "Innovation",
      desc: "Pushing boundaries with next-gen tech showcases."
    },
    {
      icon: <Code className="w-8 h-8 text-secondary" />,
      title: "Coding",
      desc: "Competitive programming arenas for elite developers."
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "Esports",
      desc: "High-octane gaming tournaments with massive pools."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-6">
              <span className="text-white">ABOUT THE </span>
              <span className="text-primary">EVENT</span>
            </h2>
            <p className="text-gray-400 font-poppins text-lg leading-relaxed mb-6">
              INNIXO is not just a tech fest; it's a glimpse into the future. 
              Overdrive 2026 brings together the brightest minds to compete, 
              collaborate, and conquer across multiple domains of technology and gaming.
            </p>
            <p className="text-gray-400 font-poppins text-lg leading-relaxed">
              Prepare for an adrenaline-fueled experience where logic meets innovation in a cyberpunk universe.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="glass-panel p-6 rounded-lg flex items-center gap-6 group hover:border-primary/50 transition-colors"
              >
                <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-primary group-hover:shadow-[0_0_15px_theme(colors.primary)] transition-all">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-oxanium font-bold text-xl text-white mb-1 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
