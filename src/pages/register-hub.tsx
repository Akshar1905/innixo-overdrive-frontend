import { MainLayout as Layout } from "@/components/layout/main-layout";
import { EventCard } from "@/components/event-card";
import { EVENTS } from "@/lib/events";
import { motion } from "framer-motion";

export default function RegisterHub() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-12 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 neon-text-primary mb-2">
              EVENT PROTOCOL
            </h1>
            <p className="text-primary text-lg md:text-xl font-mono uppercase tracking-[0.2em] opacity-80">
              Select your challenge // Initiate Sequence
            </p>
          </motion.div>
        </section>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {EVENTS.map((event, index) => (
            <EventCard key={event.eventId} event={event} index={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
