import { demoTournaments } from "@/lib/tournament-demo";
import { mapTournament } from "@/lib/tournament-mapper";
import { getTournamentById } from "@/services/tournament.service";
import { getMatches } from "@/services/match.service";
import type { TournamentView } from "@/types/tournament";

export async function getTournamentForPage(id: string): Promise<TournamentView | null> {
  const demo = demoTournaments.find((t) => t.id === id);
  if (demo) return demo;

  try {
    const doc = await getTournamentById(id);
    if (!doc) return null;

    let live: Awaited<ReturnType<typeof getMatches>> = [];
    try {
      live = await getMatches({ tournamentId: id, status: "live" });
    } catch {
      live = [];
    }

    const liveMatches = live.map((m) => ({
      id: String(m._id),
      teamA: m.teamAName,
      teamB: m.teamBName,
      scoreA: `${m.totalRunsA ?? 0}`,
      scoreB: `${m.totalRunsB ?? 0}`,
      overs: `${m.teamAScore?.length ?? 0}.${m.teamBScore?.length ?? 0}`,
      status: "live" as const,
    }));

    return mapTournament(doc, liveMatches);
  } catch {
    return null;
  }
}
