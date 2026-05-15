import { notFound } from "next/navigation";
import { getTournamentForPage } from "@/lib/get-tournament-page";
import { TournamentSubPage } from "@/components/tournaments/TournamentSubPage";
import { RulesContent } from "@/components/tournaments/subpages/SubpagesContent";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournament = await getTournamentForPage(id);
  if (!tournament) notFound();
  return (
    <TournamentSubPage tournament={tournament} title="Tournament Rules" subtitle="Regulations and playing conditions">
      <RulesContent />
    </TournamentSubPage>
  );
}
