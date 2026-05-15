"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import type { TournamentView } from "@/types/tournament";

export function TournamentSubPage({
  tournament,
  title,
  subtitle,
  children,
}: {
  tournament: TournamentView;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-7xl space-y-6"
    >
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={`/tournaments/${tournament.id}`}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:border-emerald-500/40 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Tournament Hub
        </Link>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">{tournament.title}</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}
