import Link from "next/link";
import Image from "next/image";
import { Trophy, Users, Swords, UserCircle } from "lucide-react";
import { assets } from "@/assets";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/cards/StatCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { connectDB } from "@/lib/mongodb";
import { Tournament } from "@/models/Tournament";
import { Team } from "@/models/Team";
import { Match } from "@/models/Match";
import { Player } from "@/models/Player";

async function getStats() {
  try {
    await connectDB();
    const [tournaments, teams, matches, players, liveMatches] = await Promise.all([
      Tournament.countDocuments(),
      Team.countDocuments(),
      Match.countDocuments(),
      Player.countDocuments(),
      Match.countDocuments({ status: "live" }),
    ]);
    return { tournaments, teams, matches, players, liveMatches };
  } catch {
    return { tournaments: 0, teams: 0, matches: 0, players: 0, liveMatches: 0 };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <DashboardLayout title="Dashboard">
      <div className="mb-6 overflow-hidden rounded-xl">
        <Image
          src={assets.banners.dashboard}
          alt="Dashboard"
          className="h-28 w-full object-cover md:h-36"
        />
      </div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Tournaments" value={stats.tournaments} icon={Trophy} color="emerald" />
        <StatCard title="Teams" value={stats.teams} icon={Users} color="blue" />
        <StatCard title="Matches" value={stats.matches} icon={Swords} color="amber" />
        <StatCard
          title="Live Now"
          value={stats.liveMatches}
          icon={UserCircle}
          color="red"
          trend={stats.liveMatches > 0 ? "Matches in progress" : undefined}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Quick Actions" description="Common tasks">
          <div className="flex flex-wrap gap-3">
            <Link href="/tournaments/create">
              <Button>Create Tournament</Button>
            </Link>
            <Link href="/teams/create">
              <Button variant="outline">Add Team</Button>
            </Link>
            <Link href="/players/create">
              <Button variant="outline">Add Player</Button>
            </Link>
            <Link href="/matches/live">
              <Button variant="secondary">Live Scores</Button>
            </Link>
          </div>
        </Card>

        <Card title="Players Registered" description="Total roster size">
          <p className="text-4xl font-bold text-emerald-600">{stats.players}</p>
          <p className="mt-1 text-sm text-slate-500">Across all teams</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
