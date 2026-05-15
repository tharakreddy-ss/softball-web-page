import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DataTable } from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getMatches } from "@/services/match.service";
import { formatDateTime } from "@/lib/utils";

type Row = Record<string, unknown> & {
  _id: string;
  teamAName: string;
  teamBName: string;
  venue: string;
  scheduledAt: string;
  status: string;
  totalRunsA: number;
  totalRunsB: number;
};

export default async function MatchesPage() {
  let matches: Awaited<ReturnType<typeof getMatches>> = [];
  try {
    matches = await getMatches();
  } catch {
    matches = [];
  }

  const rows: Row[] = matches.map((m) => ({
    _id: String(m._id),
    teamAName: m.teamAName,
    teamBName: m.teamBName,
    venue: m.venue,
    scheduledAt: formatDateTime(m.scheduledAt),
    status: m.status,
    totalRunsA: m.totalRunsA ?? 0,
    totalRunsB: m.totalRunsB ?? 0,
  }));

  return (
    <DashboardLayout title="Matches">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-slate-500">{matches.length} match(es)</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/matches/live">
            <Button variant="secondary">Live scores</Button>
          </Link>
          <Link href="/scorecard">
            <Button variant="outline">Scorecard</Button>
          </Link>
        </div>
      </div>

      <DataTable<Row>
        columns={[
          {
            key: "match",
            header: "Matchup",
            render: (row) => (
              <Link href={`/matches/${row._id}`} className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                {row.teamAName} vs {row.teamBName}
              </Link>
            ),
          },
          { key: "venue", header: "Venue" },
          { key: "scheduledAt", header: "When" },
          {
            key: "score",
            header: "Runs",
            render: (row) => (
              <span>
                {row.totalRunsA} – {row.totalRunsB}
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (row) => <Badge status={String(row.status)} />,
          },
        ]}
        data={rows}
        emptyMessage="No matches scheduled yet."
      />
    </DashboardLayout>
  );
}
