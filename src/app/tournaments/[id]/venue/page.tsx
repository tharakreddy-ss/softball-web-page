import { notFound } from "next/navigation";
import { getTournamentForPage } from "@/lib/get-tournament-page";
import { TournamentSubPage } from "@/components/tournaments/TournamentSubPage";
import { VenueContent } from "@/components/tournaments/subpages/SubpagesContent";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournament = await getTournamentForPage(id);
  if (!tournament) notFound();
  return (
    <TournamentSubPage tournament={tournament} title="Venue Details" subtitle="Grounds, facilities and maps">
      <VenueContent tournament={tournament} />
    </TournamentSubPage>
  );
}
