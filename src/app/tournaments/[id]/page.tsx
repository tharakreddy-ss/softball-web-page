import { notFound } from "next/navigation";
import { demoTournaments } from "@/lib/tournament-demo";
import { mapTournament } from "@/lib/tournament-mapper";
import { getTournamentById } from "@/services/tournament.service";
import { getMatches } from "@/services/match.service";
import { TournamentDetailClient } from "./TournamentDetailClient";

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const demo = demoTournaments.find((t) => t.id === id);
  if (demo) return <TournamentDetailClient tournament={demo} />;

  let doc: Awaited<ReturnType<typeof getTournamentById>> = null;
  try {
    doc = await getTournamentById(id);
  } catch {
    doc = null;
  }
  if (!doc) notFound();

  let liveMatches: Awaited<ReturnType<typeof getMatches>> = [];
  try {
    liveMatches = await getMatches({ tournamentId: id, status: "live" });
  } catch {
    liveMatches = [];
  }

  const live = liveMatches.map((m) => ({
    id: String(m._id),
    teamA: m.teamAName,
    teamB: m.teamBName,
    scoreA: `${m.totalRunsA ?? 0}`,
    scoreB: `${m.totalRunsB ?? 0}`,
    overs: `${m.teamAScore?.length ?? 0}.${m.teamBScore?.length ?? 0}`,
    status: "live" as const,
  }));

  const tournament = mapTournament(doc, live);
  return <TournamentDetailClient tournament={tournament} />;
}
