import { notFound } from "next/navigation";
import { getTournamentForPage } from "@/lib/get-tournament-page";
import { TournamentSubPage } from "@/components/tournaments/TournamentSubPage";
import { TeamsContent } from "@/components/tournaments/subpages/TeamsContent";

export default async function TournamentTeamsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = await getTournamentForPage(id);
  if (!tournament) notFound();

  return (
    <TournamentSubPage tournament={tournament} title="Teams" subtitle="Rosters, captains and team records">
      <TeamsContent />
    </TournamentSubPage>
  );
}
