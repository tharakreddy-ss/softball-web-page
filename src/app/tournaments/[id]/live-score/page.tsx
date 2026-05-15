import { notFound } from "next/navigation";
import { getTournamentForPage } from "@/lib/get-tournament-page";
import { TournamentSubPage } from "@/components/tournaments/TournamentSubPage";
import { LiveScoreContent } from "@/components/tournaments/subpages/SubpagesContent";

export default async function TournamentLiveScorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = await getTournamentForPage(id);
  if (!tournament) notFound();

  return (
    <TournamentSubPage tournament={tournament} title="Live Score" subtitle="Real-time scorecard and ball-by-ball">
      <LiveScoreContent tournament={tournament} />
    </TournamentSubPage>
  );
}
