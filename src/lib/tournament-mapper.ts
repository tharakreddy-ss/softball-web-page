import { assetPaths } from "@/assets";
import type { TournamentView, TournamentTab, LiveMatchSnippet } from "@/types/tournament";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DbTournament = Record<string, any>;

function statusToTab(status: string): TournamentTab {
  if (status === "active") return "present";
  if (status === "completed") return "recent";
  return "upcoming";
}

export function mapTournament(doc: DbTournament, liveMatches: LiveMatchSnippet[] = []): TournamentView {
  const status = (doc.status as TournamentView["status"]) ?? "upcoming";
  return {
    id: String(doc._id),
    title: doc.name ?? doc.title ?? "Untitled Tournament",
    banner: doc.banner ?? assetPaths.tournament.defaultCover,
    organizer: doc.organizer ?? "Tournament Organizer",
    venue: doc.location ?? doc.venue ?? "TBA",
    city: doc.city ?? doc.location?.split(",")[0] ?? "TBA",
    startDate: new Date(doc.startDate).toISOString(),
    endDate: new Date(doc.endDate).toISOString(),
    status,
    tab: statusToTab(status),
    prizePool: doc.prizePool ?? "$10,000",
    teams: Array.isArray(doc.teamIds) ? doc.teamIds.length : doc.teams ?? 0,
    maxTeams: doc.maxTeams ?? 8,
    winner: doc.winner,
    runnerUp: doc.runnerUp,
    mvp: doc.mvp,
    registrationOpen: doc.registrationOpen ?? status === "upcoming",
    tournamentType: formatLabel(doc.format),
    format: doc.format ?? "league",
    description: doc.description,
    liveMatches: liveMatches.length ? liveMatches : (doc.liveMatches ?? []),
    highlights: doc.highlights,
    sponsors: doc.sponsors,
  };
}

function formatLabel(format?: string) {
  if (!format) return "League";
  return format.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
