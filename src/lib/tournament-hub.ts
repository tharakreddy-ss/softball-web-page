import type { LucideIcon } from "lucide-react";
import {
  Award,
  BarChart3,
  Building2,
  ClipboardList,
  FileText,
  Gavel,
  Image as ImageIcon,
  LayoutGrid,
  Megaphone,
  Medal,
  Radio,
  ScrollText,
  Sparkles,
  Star,
  Swords,
  Trophy,
  UserCircle,
  Users,
  Video,
} from "lucide-react";

export interface HubCardConfig {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  stats?: string;
  liveStatus?: boolean;
}

export const tournamentHubCards: HubCardConfig[] = [
  { slug: "teams", title: "Teams", description: "Rosters, captains & team records", icon: Users, gradient: "from-emerald-600/40 to-teal-900/40", stats: "12 teams" },
  { slug: "fixtures", title: "Fixtures", description: "Schedule, venues & match times", icon: Swords, gradient: "from-blue-600/40 to-indigo-900/40", stats: "24 matches" },
  { slug: "live-score", title: "Live Score", description: "Real-time scorecard & ball-by-ball", icon: Radio, gradient: "from-red-600/40 to-rose-900/40", liveStatus: true, stats: "2 live" },
  { slug: "points-table", title: "Points Table", description: "Standings, NRR & qualification", icon: LayoutGrid, gradient: "from-cyan-600/40 to-blue-900/40" },
  { slug: "player-stats", title: "Player Stats", description: "Runs, wickets & MVP rankings", icon: UserCircle, gradient: "from-violet-600/40 to-purple-900/40" },
  { slug: "gallery", title: "Gallery", description: "Photos, highlights & celebrations", icon: ImageIcon, gradient: "from-pink-600/40 to-fuchsia-900/40" },
  { slug: "sponsors", title: "Sponsors", description: "Partners & partnership tiers", icon: Building2, gradient: "from-amber-600/40 to-orange-900/40" },
  { slug: "awards", title: "Awards", description: "Winners, MVP & best players", icon: Trophy, gradient: "from-yellow-600/40 to-amber-900/40" },
  { slug: "results", title: "Match Results", description: "Final scores & match summaries", icon: Medal, gradient: "from-emerald-600/40 to-green-900/40" },
  { slug: "announcements", title: "Announcements", description: "Notices, updates & alerts", icon: Megaphone, gradient: "from-sky-600/40 to-cyan-900/40" },
  { slug: "rankings", title: "Team Rankings", description: "Power rankings & form guide", icon: BarChart3, gradient: "from-indigo-600/40 to-violet-900/40" },
  { slug: "highlights", title: "Match Highlights", description: "Key moments & video clips", icon: Video, gradient: "from-rose-600/40 to-red-900/40" },
  { slug: "venue", title: "Venue Details", description: "Grounds, facilities & maps", icon: Building2, gradient: "from-slate-600/40 to-slate-900/40" },
  { slug: "umpires", title: "Umpire Panel", description: "Officials & match referees", icon: Gavel, gradient: "from-stone-600/40 to-zinc-900/40" },
  { slug: "scorecards", title: "Scorecards", description: "Full innings & match cards", icon: ClipboardList, gradient: "from-teal-600/40 to-emerald-900/40" },
  { slug: "rules", title: "Tournament Rules", description: "Regulations & playing conditions", icon: ScrollText, gradient: "from-neutral-600/40 to-neutral-900/40" },
  { slug: "mvp-leaderboard", title: "MVP Leaderboard", description: "Top performers & player ratings", icon: Star, gradient: "from-amber-500/40 to-yellow-900/40" },
  { slug: "statistics", title: "Statistics Dashboard", description: "Analytics & tournament insights", icon: Sparkles, gradient: "from-emerald-500/40 to-cyan-900/40" },
];

export function hubHref(tournamentId: string, slug: string) {
  return `/tournaments/${tournamentId}/${slug}`;
}
