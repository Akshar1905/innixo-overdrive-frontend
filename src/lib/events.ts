import csgoImg from "@/assets/csgo.jpg";
import valorantImg from "@/assets/valorant.png";
import fallguysImg from "@/assets/fallguys.jpeg";
import codeRedImg from "@/assets/code_red.png";
import codeSprintImg from "@/assets/code_sprint.png";
import debugArenaImg from "@/assets/debug_arena.png";
import overdriveUiImg from "@/assets/overdrive_ui.png";
import paperPresImg from "@/assets/paper_presentation.png";
import promptForgeImg from "@/assets/prompt_forge.png";

export interface EventConfig {
  eventId: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  entryFee: number;
  teamSize: {
    min: number;
    max: number;
  };
  category: 'Coding' | 'Gaming' | 'Presentation' | 'Hackathon';
  themeColors: {
    primary: string;
    accent: string;
  };
  backgroundStyle: string;
  type: 'Individual' | 'Team';
  image?: string;
}

export const EVENTS: EventConfig[] = [
  {
    eventId: 'evt_code_red',
    slug: 'code-red',
    title: 'Code Red: Innixo Files',
    shortDescription: 'The ultimate competitive programming showdown. Debug, Optimize, Conquer.',
    entryFee: 90,
    teamSize: { min: 1, max: 3 },
    category: 'Coding',
    type: 'Team',
    themeColors: { primary: '#ef4444', accent: '#22c55e' },
    backgroundStyle: 'bg-gradient-to-br from-red-900/20 via-black to-green-900/20',
    image: codeRedImg
  },
  {
    eventId: 'evt_prompt_forge',
    slug: 'prompt-forge',
    title: 'Prompt Forge',
    shortDescription: 'Master the AI. Craft the perfect prompt to generate the impossible.',
    entryFee: 30,
    teamSize: { min: 1, max: 1 },
    category: 'Coding',
    type: 'Individual',
    themeColors: { primary: '#a855f7', accent: '#3b82f6' },
    backgroundStyle: 'bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20',
    image: promptForgeImg
  },
  {
    eventId: 'evt_overdrive_ui',
    slug: 'overdrive-ui',
    title: 'Overdrive UI',
    shortDescription: 'Design the future. Create stunning interfaces that defy convention.',
    entryFee: 50,
    teamSize: { min: 1, max: 1 },
    category: 'Coding',
    type: 'Individual',
    themeColors: { primary: '#06b6d4', accent: '#f472b6' },
    backgroundStyle: 'bg-gradient-to-br from-cyan-900/20 via-black to-pink-900/20',
    image: overdriveUiImg
  },
  {
    eventId: 'evt_debug_arena',
    slug: 'debug-arena',
    title: 'Debug Arena',
    shortDescription: 'Fix the broken code before the time runs out. Speed is key.',
    entryFee: 120,
    teamSize: { min: 1, max: 2 },
    category: 'Coding',
    type: 'Team',
    themeColors: { primary: '#eab308', accent: '#ef4444' },
    backgroundStyle: 'bg-gradient-to-br from-yellow-900/20 via-black to-red-900/20',
    image: debugArenaImg
  },
  {
    eventId: 'evt_code_sprint',
    slug: 'code-sprint',
    title: 'Code Sprint',
    shortDescription: 'Rapid fire coding challenges. No time to think, just type.',
    entryFee: 120,
    teamSize: { min: 1, max: 2 },
    category: 'Coding',
    type: 'Team',
    themeColors: { primary: '#10b981', accent: '#3b82f6' },
    backgroundStyle: 'bg-gradient-to-br from-emerald-900/20 via-black to-blue-900/20',
    image: codeSprintImg
  },
  {
    eventId: 'evt_paper_pres',
    slug: 'paper-presentation',
    title: 'Paper Presentation',
    shortDescription: 'Showcase your research and innovative ideas to the world.',
    entryFee: 0,
    teamSize: { min: 2, max: 2 },
    category: 'Presentation',
    type: 'Team',
    themeColors: { primary: '#f97316', accent: '#a855f7' },
    backgroundStyle: 'bg-gradient-to-br from-orange-900/20 via-black to-purple-900/20',
    image: paperPresImg
  },
  {
    eventId: 'evt_fall_guys',
    slug: 'esports-fall-guys',
    title: 'Fall Guys',
    shortDescription: 'Survive the chaos. Be the last bean standing.',
    entryFee: 200,
    teamSize: { min: 1, max: 4 },
    category: 'Gaming',
    type: 'Team',
    themeColors: { primary: '#f472b6', accent: '#06b6d4' },
    backgroundStyle: 'bg-gradient-to-br from-pink-900/20 via-black to-cyan-900/20',
    image: fallguysImg
  },
  {
    eventId: 'evt_valorant',
    slug: 'esports-valorant',
    title: 'Valorant',
    shortDescription: 'Tactical shooter action. Plant the spike or defuse it.',
    entryFee: 500,
    teamSize: { min: 5, max: 5 },
    category: 'Gaming',
    type: 'Team',
    themeColors: { primary: '#ef4444', accent: '#ffffff' },
    backgroundStyle: 'bg-gradient-to-br from-red-900/20 via-black to-slate-900/20',
    image: valorantImg
  },
  {
    eventId: 'evt_csgo',
    slug: 'esports-csgo',
    title: 'CS:GO',
    shortDescription: 'The classic FPS experience. Terrorists vs Counter-Terrorists.',
    entryFee: 500,
    teamSize: { min: 5, max: 5 },
    category: 'Gaming',
    type: 'Team',
    themeColors: { primary: '#eab308', accent: '#3b82f6' },
    backgroundStyle: 'bg-gradient-to-br from-yellow-900/20 via-black to-blue-900/20',
    image: csgoImg
  },
  {
    eventId: 'evt_overdrive_hack',
    slug: 'overdrive-hack',
    title: 'Overdrive Hack',
    shortDescription: 'Hybrid Hackathon. Innovate to win. Prize Pool: ₹55k+',
    entryFee: 200,
    teamSize: { min: 2, max: 5 },
    category: 'Hackathon',
    type: 'Team',
    themeColors: { primary: '#8b5cf6', accent: '#ec4899' },
    backgroundStyle: 'bg-gradient-to-br from-violet-900/20 via-black to-pink-900/20'
  },
];

export const getEventBySlug = (slug: string) => EVENTS.find(e => e.slug === slug);
