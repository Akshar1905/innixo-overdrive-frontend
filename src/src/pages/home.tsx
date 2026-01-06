import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Events } from "@/components/sections/events";
import { Hackathon } from "@/components/sections/hackathon";
import { Esports } from "@/components/sections/esports";
import { Schedule } from "@/components/sections/schedule";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Hackathon />
      <Esports />
      <Schedule />
      <Footer />
    </div>
  );
}
