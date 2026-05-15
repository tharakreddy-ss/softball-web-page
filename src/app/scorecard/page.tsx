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
  totalRunsA: number;
  totalRunsB: number;
  status: string;
  scheduledAt: string;
};

export default async function ScorecardPage() {
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
    totalRunsA: m.totalRunsA ?? 0,
    totalRunsB: m.totalRunsB ?? 0,
    status: m.status,
    scheduledAt: formatDateTime(m.scheduledAt),
  }));

  return (
    <DashboardLayout title="Scorecard">
      <div className="mb-6 flex flex-wrap gap-2">
        <Link href="/matches/live">
          <Button variant="secondary">Live board</Button>
        </Link>
        <Link href="/matches">
          <Button variant="outline">Match list</Button>
        </Link>
      </div>

      <DataTable<Row>
        columns={[
          {
            key: "game",
            header: "Game",
            render: (row) => (
              <Link href={`/matches/${row._id}`} className="text-emerald-700 hover:underline dark:text-emerald-400">
                {row.teamAName} vs {row.teamBName}
              </Link>
            ),
          },
          {
            key: "runs",
            header: "Score",
            render: (row) => (
              <span className="font-mono font-semibold">
                {row.totalRunsA} – {row.totalRunsB}
              </span>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (row) => <Badge status={String(row.status)} />,
          },
          { key: "scheduledAt", header: "Scheduled" },
        ]}
        data={rows}
        emptyMessage="No matches to display."
      />
    </DashboardLayout>
  );
}
