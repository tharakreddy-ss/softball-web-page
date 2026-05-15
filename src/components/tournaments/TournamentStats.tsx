"use client";

import { motion } from "framer-motion";
import { Trophy, Users, DollarSign, MapPin } from "lucide-react";
import type { TournamentView } from "@/types/tournament";

export function TournamentStats({ tournament }: { tournament: TournamentView }) {
  const stats = [
    { icon: Users, label: "Teams", value: `${tournament.teams}/${tournament.maxTeams}` },
    { icon: DollarSign, label: "Prize Pool", value: tournament.prizePool },
    { icon: MapPin, label: "Venue", value: tournament.venue },
    { icon: Trophy, label: "Format", value: tournament.tournamentType },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map(({ icon: Icon, label, value }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
        >
          <Icon className="mb-2 h-5 w-5 text-emerald-400" />
          <p className="text-xs text-slate-400">{label}</p>
          <p className="mt-1 truncate text-sm font-semibold text-white">{value}</p>
        </motion.div>
      ))}
    </div>
  );
}
