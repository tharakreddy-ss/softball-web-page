"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { TournamentBanner } from "@/components/tournaments/TournamentBanner";
import { TournamentTabs } from "@/components/tournaments/TournamentTabs";
import { TournamentFilters, type FilterState } from "@/components/tournaments/TournamentFilters";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { TournamentCardSkeleton } from "@/components/tournaments/TournamentCardSkeleton";
import { Button } from "@/components/ui/Button";
import type { TournamentTab, TournamentView } from "@/types/tournament";

async function fetchTournaments(params: URLSearchParams): Promise<TournamentView[]> {
  const res = await fetch(`/api/tournaments?${params}`);
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}

export function TournamentsPageClient() {
  const [tab, setTab] = useState<TournamentTab>("present");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    city: "all",
    type: "all",
    date: "all",
    sort: "date-desc",
  });

  const queryParams = useMemo(() => {
    const p = new URLSearchParams();
    p.set("tab", tab);
    if (filters.city !== "all") p.set("city", filters.city);
    if (filters.type !== "all") p.set("type", filters.type);
    if (filters.search) p.set("search", filters.search);
    p.set("sort", filters.sort);
    return p;
  }, [tab, filters]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["tournaments", queryParams.toString()],
    queryFn: () => fetchTournaments(queryParams),
  });

  const allDataQuery = useQuery({
    queryKey: ["tournaments-all"],
    queryFn: () => fetchTournaments(new URLSearchParams()),
  });

  const counts = useMemo(() => {
    const all = allDataQuery.data ?? [];
    return {
      present: all.filter((t) => t.tab === "present").length,
      upcoming: all.filter((t) => t.tab === "upcoming").length,
      recent: all.filter((t) => t.tab === "recent").length,
    };
  }, [allDataQuery.data]);

  const cities = useMemo(() => {
    const set = new Set((allDataQuery.data ?? []).map((t) => t.city));
    return Array.from(set).sort();
  }, [allDataQuery.data]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <TournamentBanner
        title="Softball Tournaments"
        subtitle="Explore ongoing, upcoming, and completed tournaments"
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <TournamentTabs active={tab} onChange={setTab} counts={counts} />
        <Link href="/tournaments/create">
          <Button className="shadow-lg shadow-emerald-500/20">
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </Link>
      </div>

      <TournamentFilters filters={filters} onChange={setFilters} cities={cities} />

      <AnimatePresence mode="wait">
        <motion.div
          key={tab + queryParams.toString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <TournamentCardSkeleton key={i} />)
            : data.length === 0
              ? (
                <p className="col-span-full py-16 text-center text-slate-400">
                  No tournaments in this category.
                </p>
              )
              : data.map((t, i) => <TournamentCard key={t.id} tournament={t} index={i} />)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
