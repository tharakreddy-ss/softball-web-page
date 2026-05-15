import { notFound } from "next/navigation";
import { getTournamentForPage } from "@/lib/get-tournament-page";
import { TournamentSubPage } from "@/components/tournaments/TournamentSubPage";
import { FixturesContent } from "@/components/tournaments/subpages/SubpagesContent";

export default async function TournamentFixturesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = await getTournamentForPage(id);
  if (!tournament) notFound();

  return (
    <TournamentSubPage tournament={tournament} title="Fixtures" subtitle="Match schedule, venues and countdowns">
      <FixturesContent />
    </TournamentSubPage>
  );
}
