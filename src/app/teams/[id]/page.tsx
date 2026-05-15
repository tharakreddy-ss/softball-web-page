import Link from "next/link";
import { notFound } from "next/navigation";
import { assetPaths, assets } from "@/assets";
import { AppImage } from "@/components/ui/AppImage";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/tables/DataTable";
import { getTeamById } from "@/services/team.service";

type PlayerRow = Record<string, unknown> & {
  _id: string;
  name: string;
  jerseyNumber: number;
  position: string;
};

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let team: Awaited<ReturnType<typeof getTeamById>> = null;
  try {
    team = await getTeamById(id);
  } catch {
    team = null;
  }
  if (!team) notFound();

  const rosterRaw = Array.isArray(team.playerIds) ? team.playerIds : [];
  const roster: PlayerRow[] = rosterRaw
    .map((p: { _id?: unknown; name?: string; jerseyNumber?: number; position?: string }) => {
      if (!p?._id || !p.name) return null;
      return {
        _id: String(p._id),
        name: p.name,
        jerseyNumber: p.jerseyNumber ?? 0,
        position: p.position ?? "",
      };
    })
    .filter(Boolean) as PlayerRow[];

  roster.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <DashboardLayout title={team.name}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/teams">
          <Button variant="outline">← Teams</Button>
        </Link>
        <Link href={`/players/create?teamId=${id}`}>
          <Button>Add player</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Overview">
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-slate-500">Abbreviation:</span>{" "}
              <span className="font-semibold">{team.shortName}</span>
            </p>
            {team.captain && (
              <p>
                <span className="text-slate-500">Captain:</span> {team.captain}
              </p>
            )}
            {team.coach && (
              <p>
                <span className="text-slate-500">Coach:</span> {team.coach}
              </p>
            )}
            <p>
              <span className="text-slate-500">Record:</span>{" "}
              <span className="font-semibold">
                {team.wins ?? 0}W – {team.losses ?? 0}L
                {(team.draws ?? 0) > 0 ? ` – ${team.draws}D` : ""}
              </span>
            </p>
            <p>
              <span className="text-slate-500">Runs:</span> {team.runsScored ?? 0} for / {team.runsConceded ?? 0}{" "}
              against
            </p>
            {team.tournamentId && (
              <p>
                <span className="text-slate-500">Tournament:</span>{" "}
                <Link href={`/tournaments/${team.tournamentId}`} className="text-emerald-600 hover:underline">
                  Open tournament
                </Link>
              </p>
            )}
          </div>
        </Card>

        <Card title="Club branding">
          <AppImage
            src={team.logo}
            fallback={assets.teams.defaultBadge}
            alt={team.name}
            className="mx-auto h-32 w-32 rounded-xl"
          />
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Logo:{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">
              {team.logo ?? assetPaths.teams.defaultBadge}
            </code>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Defaults from <code>src/assets</code> · custom files in <code>public/teams/</code>
          </p>
        </Card>
      </div>

      <Card title="Roster" className="mt-6">
        <DataTable<PlayerRow>
          columns={[
            {
              key: "name",
              header: "Player",
              render: (row) => (
                <Link href={`/players/${row._id}`} className="text-emerald-700 hover:underline dark:text-emerald-400">
                  {String(row.name)}
                </Link>
              ),
            },
            { key: "jerseyNumber", header: "#" },
            { key: "position", header: "Position" },
          ]}
          data={roster}
          emptyMessage="No players on this roster yet."
        />
      </Card>
    </DashboardLayout>
  );
}
