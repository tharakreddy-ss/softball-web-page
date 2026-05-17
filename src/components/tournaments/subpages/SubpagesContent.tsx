"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Trophy, Calendar, MapPin } from "lucide-react";
import { GoogleMapEmbed } from "@/components/maps/GoogleMapEmbed";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LiveMatchCard } from "@/components/tournaments/LiveMatchCard";
import { CountdownTimer } from "@/components/tournaments/CountdownTimer";
import {
  demoFixtures,
  demoStandings,
  demoPlayerStats,
  demoGallery,
  demoResults,
  demoAwards,
  demoAnnouncements,
  demoUmpires,
  demoRules,
} from "@/lib/tournament-subpage-demo";
import type { TournamentView } from "@/types/tournament";
import { formatDate, formatDateTime } from "@/lib/utils";

const glass = "rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur";

export function FixturesContent() {
  const [filter, setFilter] = useState<"all" | "live" | "scheduled" | "completed">("all");
  const list = useMemo(
    () => (filter === "all" ? demoFixtures : demoFixtures.filter((m) => m.status === filter)),
    [filter]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["all", "live", "scheduled", "completed"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm capitalize transition ${
              filter === f ? "bg-emerald-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {list.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`${glass} flex flex-wrap items-center justify-between gap-4`}
          >
            <div className="border-l-2 border-emerald-500 pl-4">
              <p className="font-bold text-white">
                {m.teamA} <span className="text-slate-500">vs</span> {m.teamB}
              </p>
              <p className="mt-1 flex flex-wrap gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {formatDateTime(m.date)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {m.venue}
                </span>
              </p>
              {m.status === "scheduled" && (
                <div className="mt-3">
                  <CountdownTimer targetDate={m.date} />
                </div>
              )}
            </div>
            <div className="text-right">
              <Badge status={m.status} />
              {m.status === "completed" && m.scoreA != null && (
                <p className="mt-2 font-mono text-lg font-bold text-emerald-400">
                  {m.scoreA} – {m.scoreB}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function LiveScoreContent({ tournament }: { tournament: TournamentView }) {
  const live = tournament.liveMatches[0] ?? {
    id: "demo",
    teamA: "Falcons",
    teamB: "Warriors",
    scoreA: "86/4",
    scoreB: "72/6",
    overs: "12.3",
    status: "live" as const,
  };

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-red-400">
        <Radio className="h-5 w-5 animate-pulse" />
        <span className="text-sm font-bold">AUTO-REFRESH · {tick % 2 === 0 ? "LIVE" : "UPDATING"}</span>
      </div>
      <LiveMatchCard match={live} />
      <div className={`${glass} grid gap-4 md:grid-cols-3`}>
        <div>
          <p className="text-xs text-slate-400">Current RR</p>
          <p className="text-2xl font-bold text-emerald-400">7.24</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Partnership</p>
          <p className="text-lg font-semibold text-white">42 (28 balls)</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Last ball</p>
          <p className="text-lg font-semibold text-white">FOUR runs</p>
        </div>
      </div>
      <Link href="/matches/live">
        <Button variant="danger">Full live board</Button>
      </Link>
    </div>
  );
}

export function PointsTableContent() {
  return (
    <div className={`${glass} overflow-x-auto`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-slate-400">
            <th className="pb-3 pr-4">#</th>
            <th className="pb-3">Team</th>
            <th className="pb-3">P</th>
            <th className="pb-3">W</th>
            <th className="pb-3">L</th>
            <th className="pb-3">Pts</th>
            <th className="pb-3">NRR</th>
          </tr>
        </thead>
        <tbody>
          {demoStandings.map((row, i) => (
            <motion.tr
              key={row.team}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.06 }}
              className={`border-b border-white/5 ${row.qualified ? "bg-emerald-950/30" : ""}`}
            >
              <td className="py-3 pr-4 font-bold text-emerald-400">{row.rank}</td>
              <td className="py-3 font-medium text-white">{row.team}</td>
              <td className="py-3 text-slate-300">{row.played}</td>
              <td className="py-3 text-slate-300">{row.won}</td>
              <td className="py-3 text-slate-300">{row.lost}</td>
              <td className="py-3 font-semibold text-white">{row.points}</td>
              <td className="py-3 text-cyan-400">{row.nrr.toFixed(3)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-emerald-400/80">Top 2 teams highlighted for qualification</p>
    </div>
  );
}

export function PlayerStatsContent() {
  const [sort, setSort] = useState<"runs" | "wickets" | "mvp">("runs");
  const sorted = [...demoPlayerStats].sort((a, b) => b[sort] - a[sort]);

  return (
    <div className="space-y-4">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as typeof sort)}
        className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white"
      >
        <option value="runs">Sort by runs</option>
        <option value="wickets">Sort by wickets</option>
        <option value="mvp">Sort by MVP</option>
      </select>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={glass}
          >
            <p className="font-bold text-white">{p.name}</p>
            <p className="text-sm text-slate-400">{p.team}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <span className="text-emerald-400">Runs: {p.runs}</span>
              <span className="text-cyan-400">Wkts: {p.wickets}</span>
              <span className="text-amber-400">SR: {p.sr}</span>
              <span className="text-violet-400">MVP: {p.mvp}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function GalleryContent() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {demoGallery.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setLightbox(item.src)}
            className={`${glass} mb-4 block w-full overflow-hidden p-0 text-left`}
          >
            <div className="relative aspect-video">
              <Image src={item.src} alt={item.title} fill className="object-cover" />
            </div>
            <p className="p-3 text-sm font-medium text-white">{item.title}</p>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <div className="relative h-[70vh] w-full max-w-4xl">
              <Image src={lightbox} alt="" fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ResultsContent() {
  return (
    <div className="space-y-4">
      {demoResults.map((r) => (
        <div key={r.id} className={glass}>
          <p className="text-lg font-bold text-white">
            {r.winner} <span className="text-slate-500">def.</span> {r.loser}
          </p>
          <p className="mt-1 text-emerald-400">Margin: {r.margin} · Score: {r.score}</p>
          <p className="mt-2 text-sm text-slate-400">Player of the Match: {r.pom}</p>
        </div>
      ))}
    </div>
  );
}

export function AwardsContent({ tournament }: { tournament: TournamentView }) {
  const items = demoAwards.map((a) =>
    a.title === "Champion" && tournament.winner ? { ...a, winner: tournament.winner } : a
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a, i) => (
        <motion.div
          key={a.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06 }}
          className={`${glass} text-center shadow-lg shadow-amber-500/10`}
        >
          <Trophy className="mx-auto h-10 w-10 text-amber-400" />
          <p className="mt-2 text-xs uppercase text-slate-400">{a.title}</p>
          <p className="mt-1 text-lg font-bold text-white">{a.winner}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function SponsorsContent({ tournament }: { tournament: TournamentView }) {
  const list = tournament.sponsors ?? ["SportsPro", "Elite Gear", "FieldMaster"];
  const tiers = ["Platinum", "Gold", "Silver"];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {list.map((name, i) => (
        <div key={name} className={`${glass} text-center`}>
          <p className="text-xs font-bold uppercase text-emerald-400">{tiers[i] ?? "Partner"}</p>
          <p className="mt-2 text-xl font-bold text-white">{name}</p>
        </div>
      ))}
    </div>
  );
}

export function AnnouncementsContent() {
  return (
    <div className="space-y-3">
      {demoAnnouncements.map((a) => (
        <motion.div
          key={a.id}
          className={`${glass} ${a.priority === "high" ? "border-red-500/30" : ""}`}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-white">{a.title}</h3>
            {a.priority === "high" && (
              <span className="rounded bg-red-600/80 px-2 py-0.5 text-xs font-bold">ALERT</span>
            )}
          </div>
          <p className="mt-2 text-sm text-slate-400">{a.body}</p>
          <p className="mt-2 text-xs text-slate-500">{formatDate(a.date)}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function RankingsContent() {
  return <PointsTableContent />;
}

export function HighlightsContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {["Walk-off home run", "Diving catch in 7th", "Perfect inning"].map((title, i) => (
        <motion.div key={title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className={glass}>
          <div className="relative mb-3 aspect-video rounded-lg bg-slate-800" />
          <p className="font-semibold text-white">{title}</p>
          <p className="text-xs text-slate-400">Match highlight · 2:34</p>
        </motion.div>
      ))}
    </div>
  );
}

export function VenueContent({ tournament }: { tournament: TournamentView }) {
  const mapQuery = [tournament.venue, tournament.city].filter(Boolean).join(", ");

  return (
    <div className="space-y-6">
      <GoogleMapEmbed
        query={mapQuery}
        title={`${tournament.title} venue`}
        className="w-full"
        height={400}
      />
      <div className={`${glass} space-y-4`}>
        <h3 className="text-xl font-bold text-white">{tournament.venue}</h3>
        <p className="text-slate-400">{tournament.city}</p>
        <ul className="list-inside list-disc text-sm text-slate-300">
          <li>2 regulation diamonds + 1 practice field</li>
          <li>Seating capacity: 4,200</li>
          <li>Concessions & medical tent on-site</li>
          <li>Parking: Lots A–C</li>
        </ul>
      </div>
    </div>
  );
}

export function UmpiresContent() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {demoUmpires.map((u) => (
        <div key={u.name} className={glass}>
          <p className="font-bold text-white">{u.name}</p>
          <p className="text-sm text-emerald-400">{u.role}</p>
          <p className="mt-2 text-xs text-slate-400">{u.matches} matches officiated</p>
        </div>
      ))}
    </div>
  );
}

export function ScorecardsContent() {
  return <FixturesContent />;
}

export function RulesContent() {
  return (
    <ul className={`${glass} space-y-3`}>
      {demoRules.map((rule) => (
        <li key={rule} className="flex gap-2 text-sm text-slate-300">
          <span className="text-emerald-400">•</span> {rule}
        </li>
      ))}
    </ul>
  );
}

export function MvpLeaderboardContent() {
  return <PlayerStatsContent />;
}

export function StatisticsContent({ tournament }: { tournament: TournamentView }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { label: "Total runs", value: "1,248" },
        { label: "Home runs", value: "42" },
        { label: "Avg attendance", value: "3,200" },
        { label: "Matches played", value: String(tournament.teams * 2) },
      ].map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={glass}
        >
          <p className="text-xs text-slate-400">{s.label}</p>
          <p className="mt-1 text-2xl font-black text-emerald-400">{s.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
