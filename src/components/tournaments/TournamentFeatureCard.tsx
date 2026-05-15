"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HubCardConfig } from "@/lib/tournament-hub";
import { hubHref } from "@/lib/tournament-hub";

interface TournamentFeatureCardProps extends HubCardConfig {
  tournamentId: string;
  index?: number;
}

export function TournamentFeatureCard({
  tournamentId,
  slug,
  title,
  description,
  icon: Icon,
  gradient,
  stats,
  liveStatus,
  index = 0,
}: TournamentFeatureCardProps) {
  const href = hubHref(tournamentId, slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={cn(
          "group relative block overflow-hidden rounded-2xl border border-white/10 p-[1px] shadow-lg outline-none transition-shadow",
          "hover:shadow-emerald-500/25 focus-visible:ring-2 focus-visible:ring-emerald-400"
        )}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity group-hover:opacity-100", gradient)} />
        <div className="relative flex h-full min-h-[140px] flex-col justify-between rounded-2xl bg-slate-900/85 p-5 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div className="rounded-xl bg-white/10 p-3 text-emerald-400 ring-1 ring-white/10 transition group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.35)]">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-2">
              {liveStatus && (
                <span className="flex items-center gap-1 rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-bold text-white">
                  <Radio className="h-3 w-3 animate-pulse" /> LIVE
                </span>
              )}
              <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-emerald-400" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-white">{title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-slate-400">{description}</p>
            {stats && <p className="mt-2 text-xs font-medium text-emerald-400/90">{stats}</p>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
