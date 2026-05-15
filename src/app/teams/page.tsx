import Link from "next/link";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/Button";
import { getTeams } from "@/services/team.service";

type TeamRow = Record<string, unknown> & {
  _id: string;
  name: string;
  shortName: string;
  wins: number;
  losses: number;
  tournamentId?: string;
};

export default async function TeamsPage() {
  let teams: Awaited<ReturnType<typeof getTeams>> = [];
  try {
    teams = await getTeams();
  } catch {
    teams = [];
  }

  const rows: TeamRow[] = teams.map((t) => ({
    _id: String(t._id),
    name: t.name,
    shortName: t.shortName,
    wins: t.wins ?? 0,
    losses: t.losses ?? 0,
    tournamentId: t.tournamentId ? String(t.tournamentId) : undefined,
  }));

  return (
    <DashboardLayout title="Teams">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-slate-500">{teams.length} team(s)</p>
        <Link href="/teams/create">
          <Button>
            <Plus className="h-4 w-4" />
            Add team
          </Button>
        </Link>
      </div>

      <DataTable<TeamRow>
        columns={[
          {
            key: "name",
            header: "Team",
            render: (row) => (
              <Link href={`/teams/${row._id}`} className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                {String(row.name)}
              </Link>
            ),
          },
          { key: "shortName", header: "Abbr." },
          {
            key: "record",
            header: "W–L",
            render: (row) => (
              <span>
                {row.wins}-{row.losses}
              </span>
            ),
          },
          {
            key: "tournamentId",
            header: "Tournament",
            render: (row) =>
              row.tournamentId ? (
                <Link href={`/tournaments/${row.tournamentId}`} className="text-sm text-emerald-600 hover:underline">
                  View
                </Link>
              ) : (
                <span className="text-slate-400">—</span>
              ),
          },
        ]}
        data={rows}
        emptyMessage="No teams yet."
      />
    </DashboardLayout>
  );
}
