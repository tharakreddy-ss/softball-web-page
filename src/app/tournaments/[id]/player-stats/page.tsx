import { notFound } from "next/navigation";
import { getTournamentForPage } from "@/lib/get-tournament-page";
import { TournamentSubPage } from "@/components/tournaments/TournamentSubPage";
import { PlayerStatsContent } from "@/components/tournaments/subpages/SubpagesContent";

export default async function TournamentPlayerStatsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = await getTournamentForPage(id);
  if (!tournament) notFound();

  return (
    <TournamentSubPage tournament={tournament} title="Player Stats" subtitle="Runs, wickets and MVP rankings">
      <PlayerStatsContent />
    </TournamentSubPage>
  );
}
