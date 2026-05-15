"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

function CreateTeamPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tournamentIdParam = searchParams.get("tournamentId") ?? "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    shortName: "",
    captain: "",
    coach: "",
    tournamentId: tournamentIdParam,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        shortName: form.shortName.toUpperCase().slice(0, 5),
        captain: form.captain || undefined,
        coach: form.coach || undefined,
        tournamentId: form.tournamentId || undefined,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Could not create team");
      return;
    }
    if (form.tournamentId) router.push(`/tournaments/${form.tournamentId}/teams`);
    else router.push(`/teams/${data._id}`);
  }

  return (
    <DashboardLayout title="Create Team">
      <Card title="New team" description="Short name is stored uppercase (max 5 chars).">
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4">
          <Input
            label="Team name"
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Short name (2–5 letters)"
            id="shortName"
            required
            maxLength={5}
            value={form.shortName}
            onChange={(e) => setForm({ ...form, shortName: e.target.value })}
          />
          <Input
            label="Captain (optional)"
            id="captain"
            value={form.captain}
            onChange={(e) => setForm({ ...form, captain: e.target.value })}
          />
          <Input
            label="Coach (optional)"
            id="coach"
            value={form.coach}
            onChange={(e) => setForm({ ...form, coach: e.target.value })}
          />
          <Input
            label="Tournament ID (optional)"
            id="tournamentId"
            placeholder="Link to a tournament"
            value={form.tournamentId}
            onChange={(e) => setForm({ ...form, tournamentId: e.target.value })}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : "Create team"}
            </Button>
            {form.tournamentId && (
              <Link href={`/tournaments/${form.tournamentId}/teams`}>
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

export default function CreateTeamPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout title="Create Team">
          <Card title="New team">
            <p className="text-sm text-slate-500">Loading…</p>
          </Card>
        </DashboardLayout>
      }
    >
      <CreateTeamPageInner />
    </Suspense>
  );
}
