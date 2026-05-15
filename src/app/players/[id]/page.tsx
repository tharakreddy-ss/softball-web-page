import Link from "next/link";
import { notFound } from "next/navigation";
import { assetPaths, assets } from "@/assets";
import { AppImage } from "@/components/ui/AppImage";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/cards/StatCard";
import { Trophy, Target, Home, Zap } from "lucide-react";
import { getPlayerById } from "@/services/player.service";

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let player: Awaited<ReturnType<typeof getPlayerById>> = null;
  try {
    player = await getPlayerById(id);
  } catch {
    player = null;
  }
  if (!player) notFound();

  const team = player.teamId as { name?: string; shortName?: string; logo?: string; _id?: unknown } | undefined;
  const teamId = team?._id ? String(team._id) : undefined;

  const stats = player.stats ?? {
    matches: 0,
    runs: 0,
    hits: 0,
    homeRuns: 0,
    rbis: 0,
    strikeouts: 0,
  };

  return (
    <DashboardLayout title={player.name}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/players">
          <Button variant="outline">← Players</Button>
        </Link>
        {teamId && (
          <Link href={`/teams/${teamId}`}>
            <Button variant="secondary">Team profile</Button>
          </Link>
        )}
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Runs" value={stats.runs} icon={Trophy} color="emerald" />
        <StatCard title="Hits" value={stats.hits} icon={Target} color="blue" />
        <StatCard title="Home runs" value={stats.homeRuns} icon={Home} color="amber" />
        <StatCard title="RBIs" value={stats.rbis} icon={Zap} color="red" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Bio">
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-slate-500">Jersey:</span> #{player.jerseyNumber}
            </p>
            <p>
              <span className="text-slate-500">Position:</span> {player.position}
            </p>
            {team?.name && (
              <p>
                <span className="text-slate-500">Team:</span> {team.name}{" "}
                {team.shortName ? `(${team.shortName})` : ""}
              </p>
            )}
            <p>
              <span className="text-slate-500">Games:</span> {stats.matches}
            </p>
            <p>
              <span className="text-slate-500">Strikeouts:</span> {stats.strikeouts}
            </p>
          </div>
        </Card>

        <Card title="Photo">
          <AppImage
            src={player.photo}
            fallback={assets.players.defaultAvatar}
            alt={player.name}
            className="mx-auto h-40 w-40 rounded-full"
          />
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Photo:{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">
              {player.photo ?? assetPaths.players.defaultAvatar}
            </code>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Defaults from <code>src/assets</code> · custom files in <code>public/players/</code>
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
