"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

type TeamOption = { _id: string; name: string };

function CreatePlayerPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTeamId = searchParams.get("teamId") ?? "";
  const tournamentId = searchParams.get("tournamentId") ?? "";

  const [teams, setTeams] = useState<TeamOption[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    jerseyNumber: 1,
    position: "",
    teamId: defaultTeamId,
  });

  useEffect(() => {
    const q = tournamentId ? `?tournamentId=${encodeURIComponent(tournamentId)}` : "";
    setLoadingTeams(true);
    fetch(`/api/teams${q}`)
      .then((r) => r.json())
      .then((data: TeamOption[]) => {
        setTeams(Array.isArray(data) ? data.map((t) => ({ _id: String(t._id), name: t.name })) : []);
      })
      .catch(() => setTeams([]))
      .finally(() => setLoadingTeams(false));
  }, [tournamentId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        jerseyNumber: Number(form.jerseyNumber),
        position: form.position,
        teamId: form.teamId || undefined,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Could not create player");
      return;
    }
    if (tournamentId) router.push(`/tournaments/${tournamentId}/players`);
    else if (form.teamId) router.push(`/teams/${form.teamId}`);
    else router.push(`/players/${data._id}`);
  }

  const selectClasses =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white";

  return (
    <DashboardLayout title="Create Player">
      <Card title="New player" description={loadingTeams ? "Loading teams…" : `${teams.length} team(s) available.`}>
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4">
          <Input
            label="Full name"
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Jersey number"
            id="jerseyNumber"
            type="number"
            min={0}
            max={99}
            required
            value={form.jerseyNumber}
            onChange={(e) => setForm({ ...form, jerseyNumber: Number(e.target.value) })}
          />
          <Input
            label="Position"
            id="position"
            required
            placeholder="e.g. Pitcher"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
          <div className="space-y-1.5">
            <label htmlFor="teamId" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Team (optional)
            </label>
            <select
              id="teamId"
              className={selectClasses}
              value={form.teamId}
              onChange={(e) => setForm({ ...form, teamId: e.target.value })}
            >
              <option value="">No team</option>
              {teams.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={loading || loadingTeams}>
              {loading ? "Saving…" : "Create player"}
            </Button>
            {tournamentId && (
              <Link href={`/tournaments/${tournamentId}/players`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            )}
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
}

export default function CreatePlayerPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout title="Create Player">
          <Card title="New player">
            <p className="text-sm text-slate-500">Loading…</p>
          </Card>
        </DashboardLayout>
      }
    >
      <CreatePlayerPageInner />
    </Suspense>
  );
}
