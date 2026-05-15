import Link from "next/link";
import { Trophy } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/cards/StatCard";
import { DataTable } from "@/components/tables/DataTable";
import { Card } from "@/components/ui/Card";
import { getTopPlayers } from "@/services/player.service";

type Row = Record<string, unknown> & {
  _id: string;
  name: string;
  runs: number;
  hits: number;
  homeRuns: number;
};

export default async function AwardsPage() {
  let players: Awaited<ReturnType<typeof getTopPlayers>> = [];
  try {
    players = await getTopPlayers(15);
  } catch {
    players = [];
  }

  const rows: Row[] = players.map((p) => ({
    _id: String(p._id),
    name: p.name,
    runs: p.stats?.runs ?? 0,
    hits: p.stats?.hits ?? 0,
    homeRuns: p.stats?.homeRuns ?? 0,
  }));

  const topRuns = rows[0]?.runs ?? 0;
  const topHr = rows.reduce((m, r) => Math.max(m, r.homeRuns as number), 0);

  return (
    <DashboardLayout title="Awards & leaders">
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="Leader runs (top)" value={topRuns} icon={Trophy} color="emerald" />
        <StatCard title="Players ranked" value={rows.length} icon={Trophy} color="blue" />
        <StatCard title="Peak HR stat" value={topHr} icon={Trophy} color="amber" />
      </div>

      <Card title="Run leaderboard" description="Sorted by career runs in database">
        <DataTable<Row>
          columns={[
            {
              key: "name",
              header: "Player",
              render: (row) => (
                <Link href={`/players/${row._id}`} className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                  {String(row.name)}
                </Link>
              ),
            },
            { key: "runs", header: "Runs" },
            { key: "hits", header: "Hits" },
            { key: "homeRuns", header: "HR" },
          ]}
          data={rows}
          emptyMessage="No player stats yet."
        />
      </Card>
    </DashboardLayout>
  );
}
