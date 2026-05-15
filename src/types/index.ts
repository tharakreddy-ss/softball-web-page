export type UserRole = "admin" | "organizer" | "scorer" | "viewer";

export type TournamentStatus = "draft" | "upcoming" | "active" | "completed";
export type MatchStatus = "scheduled" | "live" | "completed" | "cancelled";
export type MatchFormat = "league" | "knockout" | "group_stage";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlayer {
  _id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  teamId?: string;
  photo?: string;
  stats: {
    matches: number;
    runs: number;
    hits: number;
    homeRuns: number;
    rbis: number;
    strikeouts: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeam {
  _id: string;
  name: string;
  shortName: string;
  logo?: string;
  captain?: string;
  coach?: string;
  tournamentId?: string;
  playerIds: string[];
  wins: number;
  losses: number;
  draws: number;
  runsScored: number;
  runsConceded: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInningScore {
  inning: number;
  runs: number;
}

export interface IMatch {
  _id: string;
  tournamentId: string;
  teamAId: string;
  teamBId: string;
  teamAName: string;
  teamBName: string;
  venue: string;
  scheduledAt: Date;
  status: MatchStatus;
  format: MatchFormat;
  innings: number;
  teamAScore: IInningScore[];
  teamBScore: IInningScore[];
  totalRunsA: number;
  totalRunsB: number;
  winnerId?: string;
  mvpPlayerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITournament {
  _id: string;
  name: string;
  description?: string;
  banner?: string;
  location: string;
  startDate: Date;
  endDate: Date;
  status: TournamentStatus;
  format: MatchFormat;
  maxTeams: number;
  teamIds: string[];
  matchIds: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStanding {
  teamId: string;
  teamName: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  runsFor: number;
  runsAgainst: number;
  netRunRate: number;
  points: number;
}
