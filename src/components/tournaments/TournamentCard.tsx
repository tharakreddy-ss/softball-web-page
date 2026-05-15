"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bookmark,
  Calendar,
  Crown,
  MapPin,
  Radio,
  Share2,
  Trophy,
  User,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CountdownTimer } from "./CountdownTimer";
import { LiveMatchCard } from "./LiveMatchCard";
import type { TournamentView } from "@/types/tournament";

export function TournamentCard({
  tournament,
  index = 0,
}: {
  tournament: TournamentView;
  index?: number;
}) {
  const isLive = tournament.tab === "present";
  const isUpcoming = tournament.tab === "upcoming";
  const isRecent = tournament.tab === "recent";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-[1px] shadow-lg shadow-emerald-900/10 backdrop-blur-xl transition-shadow hover:shadow-emerald-500/20"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/90">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={tournament.banner}
            alt={tournament.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {isLive && (
              <span className="flex items-center gap-1 rounded-full bg-red-600/90 px-2.5 py-1 text-xs font-bold text-white shadow-lg shadow-red-500/40">
                <Radio className="h-3 w-3 animate-pulse" /> LIVE
              </span>
            )}
            {isUpcoming && tournament.registrationOpen && (
              <span className="animate-pulse rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-bold text-white">
                Registration Open
              </span>
            )}
            {isRecent && (
              <span className="flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-bold text-slate-900">
                <Crown className="h-3 w-3" /> Completed
              </span>
            )}
            <span className="rounded-full bg-slate-900/70 px-2.5 py-1 text-xs capitalize text-white backdrop-blur">
              {tournament.status}
            </span>
          </div>
          <div className="absolute right-3 top-3 flex gap-1">
            <button
              type="button"
              className="rounded-lg bg-slate-900/60 p-2 text-white backdrop-blur transition hover:bg-emerald-600/80"
              aria-label="Bookmark"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-lg bg-slate-900/60 p-2 text-white backdrop-blur transition hover:bg-emerald-600/80"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3 p-5">
          <h3 className="text-lg font-bold text-white line-clamp-2">{tournament.title}</h3>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" /> {tournament.organizer}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {tournament.city}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(tournament.startDate)}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-lg bg-emerald-950/60 px-2 py-1 text-emerald-300">
              {tournament.teams} teams
            </span>
            <span className="rounded-lg bg-blue-950/60 px-2 py-1 text-cyan-300">
              {tournament.prizePool}
            </span>
            <span className="rounded-lg bg-slate-800 px-2 py-1 text-slate-300">
              {tournament.tournamentType}
            </span>
          </div>

          {isLive && tournament.liveMatches[0] && (
            <LiveMatchCard match={tournament.liveMatches[0]} />
          )}

          {isUpcoming && (
            <div>
              <p className="mb-2 text-xs font-medium text-slate-400">Starts in</p>
              <CountdownTimer targetDate={tournament.startDate} />
            </div>
          )}

          {isRecent && tournament.winner && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/30 p-3">
              <div className="flex items-center gap-2 text-amber-300">
                <Trophy className="h-4 w-4" />
                <span className="text-sm font-semibold">Champion: {tournament.winner}</span>
              </div>
              {tournament.runnerUp && (
                <p className="mt-1 text-xs text-slate-400">Runner-up: {tournament.runnerUp}</p>
              )}
              {tournament.mvp && (
                <p className="mt-1 text-xs text-emerald-400">MVP: {tournament.mvp}</p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {isLive && (
              <Link href={`/matches/live`} className="flex-1">
                <Button variant="danger" size="sm" className="w-full">
                  Watch Live
                </Button>
              </Link>
            )}
            {isUpcoming && tournament.registrationOpen && (
              <Button size="sm" className="flex-1">
                Register
              </Button>
            )}
            {isRecent && (
              <Link href={`/tournaments/${tournament.id}/scorecard`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full border-white/20 text-white">
                  View Scorecard
                </Button>
              </Link>
            )}
            <Link href={`/tournaments/${tournament.id}`} className="flex-1">
              <Button variant="secondary" size="sm" className="w-full">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
