import { notFound } from "next/navigation";
import { getTournamentForPage } from "@/lib/get-tournament-page";
import { TournamentSubPage } from "@/components/tournaments/TournamentSubPage";
import { UmpiresContent } from "@/components/tournaments/subpages/SubpagesContent";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournament = await getTournamentForPage(id);
  if (!tournament) notFound();
  return (
    <TournamentSubPage tournament={tournament} title="Umpire Panel" subtitle="Match officials and referees">
      <UmpiresContent />
    </TournamentSubPage>
  );
}
