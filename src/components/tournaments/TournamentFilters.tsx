"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export interface FilterState {
  search: string;
  city: string;
  type: string;
  date: string;
  sort: string;
}

export function TournamentFilters({
  filters,
  onChange,
  cities,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  cities: string[];
}) {
  const inputClass =
    "w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 backdrop-blur focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-xl md:grid-cols-2 lg:grid-cols-5"
    >
      <div className="relative lg:col-span-2">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search tournaments..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className={`${inputClass} pl-10`}
        />
      </div>
      <select
        value={filters.city}
        onChange={(e) => onChange({ ...filters, city: e.target.value })}
        className={inputClass}
      >
        <option value="all">All cities</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
        className={inputClass}
      >
        <option value="all">All types</option>
        <option value="league">League</option>
        <option value="knockout">Knockout</option>
        <option value="group">Group Stage</option>
      </select>
      <select
        value={filters.sort}
        onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        className={inputClass}
      >
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
      </select>
      <div className="flex items-center gap-2 text-xs text-slate-400 lg:justify-end">
        <SlidersHorizontal className="h-4 w-4" />
        Filters active
      </div>
    </motion.div>
  );
}
