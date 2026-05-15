"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, QrCode, Share2, Swords, Trophy } from "lucide-react";
import { TournamentStats } from "@/components/tournaments/TournamentStats";
import { TournamentHubGrid } from "@/components/tournaments/TournamentHubGrid";
import { LiveMatchCard } from "@/components/tournaments/LiveMatchCard";
import { CountdownTimer } from "@/components/tournaments/CountdownTimer";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { hubHref } from "@/lib/tournament-hub";
import type { TournamentView } from "@/types/tournament";

export function TournamentDetailClient({ tournament }: { tournament: TournamentView }) {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-56 overflow-hidden rounded-2xl border border-white/10 md:h-72"
      >
        <Image src={tournament.banner} alt={tournament.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-bold uppercase">
                {tournament.status}
              </span>
              <h1 className="mt-2 text-2xl font-black text-white md:text-4xl">{tournament.title}</h1>
              <p className="mt-1 text-slate-300">{tournament.organizer} · {tournament.venue}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-white/20 text-white">
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Button variant="ghost" size="sm" className="text-white">
                <QrCode className="h-4 w-4" /> QR
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <TournamentStats tournament={tournament} />

      {tournament.tab === "present" && tournament.liveMatches.length > 0 && (
        <section className="rounded-2xl border border-red-500/20 bg-red-950/20 p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Swords className="h-5 w-5 text-red-400" /> Live Now
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {tournament.liveMatches.map((m) => (
              <LiveMatchCard key={m.id} match={m} />
            ))}
          </div>
          <Link href={hubHref(tournament.id, "live-score")} className="mt-4 inline-block">
            <Button variant="danger">Watch Live</Button>
          </Link>
        </section>
      )}

      {tournament.tab === "upcoming" && (
        <section className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6">
          <h2 className="text-lg font-bold text-white">Tournament starts in</h2>
          <div className="mt-4">
            <CountdownTimer targetDate={tournament.startDate} />
          </div>
          {tournament.registrationOpen && <Button className="mt-4">Register Team</Button>}
        </section>
      )}

      {tournament.tab === "recent" && tournament.winner && (
        <section className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-amber-300">
            <Trophy className="h-5 w-5" /> Champions
          </h2>
          <p className="mt-2 text-2xl font-black text-white">{tournament.winner}</p>
          {tournament.runnerUp && <p className="text-slate-400">Runner-up: {tournament.runnerUp}</p>}
          {tournament.mvp && <p className="mt-2 text-emerald-400">MVP: {tournament.mvp}</p>}
          <Link href={hubHref(tournament.id, "awards")} className="mt-4 inline-block">
            <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-200">
              View awards
            </Button>
          </Link>
        </section>
      )}

      <TournamentHubGrid tournamentId={tournament.id} />

      <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
          <Calendar className="h-5 w-5 text-emerald-400" /> Schedule
        </h2>
        <p className="text-sm text-slate-400">
          {formatDate(tournament.startDate)} – {formatDate(tournament.endDate)}
        </p>
        {tournament.description && <p className="mt-3 text-slate-300">{tournament.description}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={hubHref(tournament.id, "fixtures")}>
            <Button size="sm">View fixtures</Button>
          </Link>
          <Link href={hubHref(tournament.id, "points-table")}>
            <Button variant="outline" size="sm" className="border-white/20 text-white">
              Points table
            </Button>
          </Link>
        </div>
      </section>

      <Link href="/tournaments">
        <Button variant="outline" className="border-white/20 text-white">
          ← All tournaments
        </Button>
      </Link>
    </div>
  );
}
