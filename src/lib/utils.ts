import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function calculateNRR(runsFor: number, runsAgainst: number, overs = 1): number {
  if (overs === 0) return 0;
  return Number(((runsFor - runsAgainst) / overs).toFixed(3));
}

export function calculateStandings(
  teams: { _id: string; name: string; wins: number; losses: number; draws: number; runsScored: number; runsConceded: number }[]
) {
  return teams
    .map((team) => ({
      teamId: team._id,
      teamName: team.name,
      played: team.wins + team.losses + team.draws,
      won: team.wins,
      lost: team.losses,
      drawn: team.draws,
      runsFor: team.runsScored,
      runsAgainst: team.runsConceded,
      netRunRate: calculateNRR(team.runsScored, team.runsConceded),
      points: team.wins * 2 + team.draws,
    }))
    .sort((a, b) => b.points - a.points || b.netRunRate - a.netRunRate);
}
