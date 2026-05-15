import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/Button";
import { calculateStandings } from "@/lib/utils";
import { getTeams } from "@/services/team.service";

type Row = Record<string, unknown> & {
  rank: number;
  teamName: string;
  played: number;
  points: number;
  won: number;
  lost: number;
  netRunRate: number;
};

export default async function StandingsPage() {
  let teams: Awaited<ReturnType<typeof getTeams>> = [];
  try {
    teams = await getTeams();
  } catch {
    teams = [];
  }

  const standings = calculateStandings(
    teams.map((t) => ({
      _id: String(t._id),
      name: t.name,
      wins: t.wins ?? 0,
      losses: t.losses ?? 0,
      draws: t.draws ?? 0,
      runsScored: t.runsScored ?? 0,
      runsConceded: t.runsConceded ?? 0,
    }))
  );

  const rows: Row[] = standings.map((s, i) => ({
    rank: i + 1,
    teamName: s.teamName,
    played: s.played,
    points: s.points,
    won: s.won,
    lost: s.lost,
    netRunRate: s.netRunRate,
  }));

  return (
    <DashboardLayout title="Standings">
      <div className="mb-6">
        <Link href="/tournaments">
          <Button variant="outline">Browse tournaments</Button>
        </Link>
      </div>

      <DataTable<Row>
        columns={[
          { key: "rank", header: "#" },
          { key: "teamName", header: "Team" },
          { key: "played", header: "P" },
          { key: "won", header: "W" },
          { key: "lost", header: "L" },
          { key: "points", header: "Pts" },
          { key: "netRunRate", header: "NRR" },
        ]}
        data={rows}
        emptyMessage="No team records yet."
      />
    </DashboardLayout>
  );
}
