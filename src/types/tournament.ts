export type TournamentTab = "present" | "upcoming" | "recent";

export interface LiveMatchSnippet {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  overs: string;
  status: "live" | "scheduled" | "completed";
}

export interface TournamentView {
  id: string;
  title: string;
  banner: string;
  organizer: string;
  venue: string;
  city: string;
  startDate: string;
  endDate: string;
  status: "draft" | "upcoming" | "active" | "completed";
  tab: TournamentTab;
  prizePool: string;
  teams: number;
  maxTeams: number;
  winner?: string;
  runnerUp?: string;
  mvp?: string;
  registrationOpen: boolean;
  tournamentType: string;
  format: string;
  description?: string;
  liveMatches: LiveMatchSnippet[];
  highlights?: string[];
  sponsors?: string[];
}
