"use client";

import { Radio } from "lucide-react";
import { motion } from "framer-motion";
import type { LiveMatchSnippet } from "@/types/tournament";

export function LiveMatchCard({ match }: { match: LiveMatchSnippet }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-lg border border-red-500/30 bg-red-950/30 px-3 py-2"
    >
      <div className="flex items-center gap-2 text-xs font-semibold text-red-400">
        <Radio className="h-3 w-3 animate-pulse" />
        LIVE
      </div>
      <p className="mt-1 text-sm font-medium text-white">
        {match.teamA} <span className="text-slate-400">vs</span> {match.teamB}
      </p>
      <p className="text-xs text-emerald-300">
        {match.scoreA} – {match.scoreB} · Overs {match.overs}
      </p>
    </motion.div>
  );
}
