import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LiveScoreboard } from "@/components/scoreboards/LiveScoreboard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getLiveMatches } from "@/services/match.service";

export default async function LiveMatchesPage() {
  let live: Awaited<ReturnType<typeof getLiveMatches>> = [];
  try {
    live = await getLiveMatches();
  } catch {
    live = [];
  }

  return (
    <DashboardLayout title="Live scores">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/matches">
          <Button variant="outline">← All matches</Button>
        </Link>
      </div>

      {live.length === 0 ? (
        <Card>
          <p className="text-center text-slate-500">No live matches right now.</p>
          <p className="mt-2 text-center text-sm text-slate-400">When a scorer sets status to live, games appear here.</p>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {live.map((m) => {
            const lastInning = Math.max(
              ...(m.teamAScore ?? []).map((s) => s.inning),
              ...(m.teamBScore ?? []).map((s) => s.inning),
              1
            );
            return (
              <Link key={String(m._id)} href={`/matches/${m._id}`}>
                <LiveScoreboard
                  teamA={m.teamAName}
                  teamB={m.teamBName}
                  scoreA={m.totalRunsA ?? 0}
                  scoreB={m.totalRunsB ?? 0}
                  status={m.status}
                  venue={m.venue}
                  inning={lastInning}
                />
              </Link>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
