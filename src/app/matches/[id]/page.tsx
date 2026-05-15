import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LiveScoreboard } from "@/components/scoreboards/LiveScoreboard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/tables/DataTable";
import { getMatchById } from "@/services/match.service";
import { formatDateTime } from "@/lib/utils";

type InningRow = Record<string, unknown> & {
  inning: number;
  a: number;
  b: number;
};

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let match: Awaited<ReturnType<typeof getMatchById>> = null;
  try {
    match = await getMatchById(id);
  } catch {
    match = null;
  }
  if (!match) notFound();

  const innings = match.innings ?? 7;
  const rows: InningRow[] = [];
  for (let i = 1; i <= innings; i++) {
    const a = match.teamAScore?.find((s) => s.inning === i)?.runs ?? 0;
    const b = match.teamBScore?.find((s) => s.inning === i)?.runs ?? 0;
    rows.push({ inning: i, a, b });
  }

  const lastPlayed =
    [...(match.teamAScore ?? []), ...(match.teamBScore ?? [])].reduce((m, s) => Math.max(m, s.inning), 1) || 1;

  return (
    <DashboardLayout title={`${match.teamAName} vs ${match.teamBName}`}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/matches">
          <Button variant="outline">← Matches</Button>
        </Link>
        <Link href={`/tournaments/${match.tournamentId}`}>
          <Button variant="ghost">Tournament</Button>
        </Link>
      </div>

      <div className="mb-6">
        <LiveScoreboard
          teamA={match.teamAName}
          teamB={match.teamBName}
          scoreA={match.totalRunsA ?? 0}
          scoreB={match.totalRunsB ?? 0}
          status={match.status}
          venue={match.venue}
          inning={match.status === "live" ? lastPlayed : undefined}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Match info">
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <span className="text-slate-500">Status:</span>
              <Badge status={match.status} />
            </p>
            <p>
              <span className="text-slate-500">Scheduled:</span> {formatDateTime(match.scheduledAt)}
            </p>
            <p className="capitalize">
              <span className="text-slate-500">Format:</span> {match.format.replace("_", " ")}
            </p>
          </div>
        </Card>

        <Card title="Line score">
          <DataTable<InningRow>
            columns={[
              { key: "inning", header: "Inning" },
              {
                key: "a",
                header: match.teamAName,
                render: (row) => row.a,
              },
              {
                key: "b",
                header: match.teamBName,
                render: (row) => row.b,
              },
            ]}
            data={rows}
            emptyMessage="No inning data."
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}
