import Link from "next/link";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/Button";
import { getPlayers } from "@/services/player.service";

type Row = Record<string, unknown> & {
  _id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  runs: number;
  teamId?: string;
};

export default async function PlayersPage() {
  let players: Awaited<ReturnType<typeof getPlayers>> = [];
  try {
    players = await getPlayers();
  } catch {
    players = [];
  }

  const rows: Row[] = players.map((p) => ({
    _id: String(p._id),
    name: p.name,
    jerseyNumber: p.jerseyNumber,
    position: p.position,
    runs: p.stats?.runs ?? 0,
    teamId: p.teamId ? String(p.teamId) : undefined,
  }));

  return (
    <DashboardLayout title="Players">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-slate-500">{players.length} player(s)</p>
        <Link href="/players/create">
          <Button>
            <Plus className="h-4 w-4" />
            Add player
          </Button>
        </Link>
      </div>

      <DataTable<Row>
        columns={[
          {
            key: "name",
            header: "Name",
            render: (row) => (
              <Link href={`/players/${row._id}`} className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                {String(row.name)}
              </Link>
            ),
          },
          { key: "jerseyNumber", header: "#" },
          { key: "position", header: "Position" },
          { key: "runs", header: "Runs" },
          {
            key: "teamId",
            header: "Team",
            render: (row) =>
              row.teamId ? (
                <Link href={`/teams/${row.teamId}`} className="text-sm text-emerald-600 hover:underline">
                  View
                </Link>
              ) : (
                <span className="text-slate-400">—</span>
              ),
          },
        ]}
        data={rows}
        emptyMessage="No players registered."
      />
    </DashboardLayout>
  );
}
