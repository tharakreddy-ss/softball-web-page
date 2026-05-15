"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TournamentTab } from "@/types/tournament";

const tabs: { id: TournamentTab; label: string }[] = [
  { id: "present", label: "Present Tournaments" },
  { id: "upcoming", label: "Upcoming Tournaments" },
  { id: "recent", label: "Recent Tournaments" },
];

export function TournamentTabs({
  active,
  onChange,
  counts,
}: {
  active: TournamentTab;
  onChange: (tab: TournamentTab) => void;
  counts: Record<TournamentTab, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-white/10 pb-1 md:gap-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative px-4 py-3 text-sm font-medium transition-colors md:px-6",
            active === tab.id ? "text-emerald-300" : "text-slate-400 hover:text-white"
          )}
        >
          {tab.label}
          <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">{counts[tab.id]}</span>
          {active === tab.id && (
            <motion.span
              layoutId="tab-underline"
              className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
            />
          )}
        </button>
      ))}
    </div>
  );
}
