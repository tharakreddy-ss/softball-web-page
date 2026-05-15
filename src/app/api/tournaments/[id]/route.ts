import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { demoTournaments } from "@/lib/tournament-demo";
import { mapTournament } from "@/lib/tournament-mapper";
import { tournamentSchema } from "@/lib/validations";
import {
  deleteTournament,
  getTournamentById,
  updateTournament,
} from "@/services/tournament.service";
import { getMatches } from "@/services/match.service";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const demo = demoTournaments.find((t) => t.id === id);
    if (demo) return NextResponse.json(demo);

    const tournament = await getTournamentById(id);
    if (!tournament) return NextResponse.json({ error: "Not found" }, { status: 404 });

    let liveMatches: Awaited<ReturnType<typeof getMatches>> = [];
    try {
      liveMatches = await getMatches({ tournamentId: id, status: "live" });
    } catch {
      liveMatches = [];
    }

    const live = liveMatches.map((m) => ({
      id: String(m._id),
      teamA: m.teamAName,
      teamB: m.teamBName,
      scoreA: `${m.totalRunsA ?? 0}`,
      scoreB: `${m.totalRunsB ?? 0}`,
      overs: `${m.teamAScore?.length ?? 0}.${m.teamBScore?.length ?? 0}`,
      status: "live" as const,
    }));

    return NextResponse.json(mapTournament(tournament, live));
  } catch {
    return NextResponse.json({ error: "Failed to fetch tournament" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const data = tournamentSchema.partial().parse(body);
    const tournament = await updateTournament(id, data);
    return NextResponse.json(tournament);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await deleteTournament(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
