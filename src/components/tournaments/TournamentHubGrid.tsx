"use client";

import { motion } from "framer-motion";
import { tournamentHubCards } from "@/lib/tournament-hub";
import { TournamentFeatureCard } from "./TournamentFeatureCard";

export function TournamentHubGrid({ tournamentId }: { tournamentId: string }) {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <motion.h2
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6 text-xl font-bold text-white md:text-2xl"
      >
        Tournament Hub
      </motion.h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tournamentHubCards.map((card, i) => (
          <TournamentFeatureCard key={card.slug} tournamentId={tournamentId} index={i} {...card} />
        ))}
      </div>
    </section>
  );
}
