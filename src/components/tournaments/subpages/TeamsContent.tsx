"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { demoTeams } from "@/lib/tournament-subpage-demo";
import { assetPaths } from "@/assets";

export interface TeamItem {
  id: string;
  name: string;
  shortName: string;
  captain?: string;
  coach?: string;
  wins: number;
  losses: number;
  players: number;
  rank: number;
  logo?: string;
}

export function TeamsContent({ teams = demoTeams }: { teams?: TeamItem[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => teams.filter((t) => t.name.toLowerCase().includes(search.toLowerCase())),
    [teams, search]
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((team, i) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur"
          >
            <div className="flex items-center gap-4">
              <Image
                src={team.logo ?? assetPaths.teams.defaultBadge}
                alt=""
                width={56}
                height={56}
                className="rounded-xl"
              />
              <div>
                <p className="text-xs text-emerald-400">#{team.rank}</p>
                <h3 className="font-bold text-white">{team.name}</h3>
                <p className="text-sm text-slate-400">{team.shortName}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-400">
              <p>Captain: {team.captain ?? "—"}</p>
              <p>Coach: {team.coach ?? "—"}</p>
              <p>Record: {team.wins}W–{team.losses}L</p>
              <p>Players: {team.players}</p>
            </div>
            <Link
              href={`/teams/${team.id}`}
              className="mt-4 inline-block text-sm font-medium text-emerald-400 hover:underline"
            >
              View team →
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
