"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

const formatClasses =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white";

export default function CreateTournamentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    format: "league" as "league" | "knockout" | "group_stage",
    maxTeams: 8,
    status: "draft" as "draft" | "upcoming" | "active" | "completed",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/tournaments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        description: form.description || undefined,
        maxTeams: Number(form.maxTeams),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Could not create tournament");
      return;
    }
    router.push(`/tournaments/${data._id}`);
  }

  return (
    <DashboardLayout title="Create Tournament">
      <Card title="New tournament" description="Enter details and save">
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4">
          <Input
            label="Name"
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <div className="space-y-1.5">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description (optional)
            </label>
            <textarea
              id="description"
              rows={3}
              className={formatClasses}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <Input
            label="Location"
            id="location"
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Start date"
              id="startDate"
              type="date"
              required
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
            <Input
              label="End date"
              id="endDate"
              type="date"
              required
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="format" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Format
              </label>
              <select
                id="format"
                className={formatClasses}
                value={form.format}
                onChange={(e) =>
                  setForm({
                    ...form,
                    format: e.target.value as typeof form.format,
                  })
                }
              >
                <option value="league">League</option>
                <option value="knockout">Knockout</option>
                <option value="group_stage">Group stage</option>
              </select>
            </div>
            <Input
              label="Max teams"
              id="maxTeams"
              type="number"
              min={2}
              max={64}
              required
              value={form.maxTeams}
              onChange={(e) => setForm({ ...form, maxTeams: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Status
            </label>
            <select
              id="status"
              className={formatClasses}
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as typeof form.status,
                })
              }
            >
              <option value="draft">Draft</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Saving…" : "Create tournament"}
          </Button>
        </form>
      </Card>
    </DashboardLayout>
  );
}
