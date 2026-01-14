import { motion } from "framer-motion";
import { Link } from "wouter";
import { EventConfig } from "@/lib/events";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy } from "lucide-react";

interface EventCardProps {
  event: EventConfig;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  return (
    <Link href={`/register/${event.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="h-full cursor-pointer group"
      >
        <Card className="h-full bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden relative transition-colors duration-300 hover:border-primary/50 flex flex-col">
          {/* Neon Glow on Hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(circle at center, ${event.themeColors.primary}, transparent 70%)` }}
          />

          <CardHeader className="relative z-10 pb-2">
            <div className="flex justify-between items-start mb-2">
              <Badge 
                variant="outline" 
                className="uppercase tracking-wider text-[10px] border-primary/20 text-primary bg-primary/5"
              >
                {event.category}
              </Badge>
              <span className="text-xs font-mono text-muted-foreground">ID: {event.eventId.split('_')[1].toUpperCase()}</span>
            </div>
            <CardTitle className="font-display text-2xl text-white group-hover:text-primary transition-colors">
              {event.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10 flex-grow">
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {event.shortDescription}
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-medium text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>
                  Team: {event.teamSize.min === event.teamSize.max 
                    ? event.teamSize.min 
                    : `${event.teamSize.min}-${event.teamSize.max}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-accent" />
                <span>Fee: ₹{event.entryFee}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="relative z-10 pt-2 pb-6">
            <Button 
              className="w-full bg-white/5 hover:bg-primary hover:text-black border border-white/10 text-white font-display uppercase tracking-wider transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.5)]"
            >
              Initialize Reg
            </Button>
          </CardFooter>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary/50" />
        </Card>
      </motion.div>
    </Link>
  );
}
