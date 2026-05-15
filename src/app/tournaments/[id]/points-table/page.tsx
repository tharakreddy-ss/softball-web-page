import { notFound } from "next/navigation";
import { getTournamentForPage } from "@/lib/get-tournament-page";
import { TournamentSubPage } from "@/components/tournaments/TournamentSubPage";
import { PointsTableContent } from "@/components/tournaments/subpages/SubpagesContent";

export default async function TournamentPointsTablePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = await getTournamentForPage(id);
  if (!tournament) notFound();

  return (
    <TournamentSubPage tournament={tournament} title="Points Table" subtitle="Standings, NRR and qualification">
      <PointsTableContent />
    </TournamentSubPage>
  );
}
