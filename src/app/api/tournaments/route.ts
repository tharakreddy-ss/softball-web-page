import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { tournamentSchema } from "@/lib/validations";
import { demoTournaments } from "@/lib/tournament-demo";
import { mapTournament } from "@/lib/tournament-mapper";
import { createTournament, getTournaments } from "@/services/tournament.service";
import { getMatches } from "@/services/match.service";
import type { LiveMatchSnippet } from "@/types/tournament";

async function liveMatchesForTournament(tournamentId: string): Promise<LiveMatchSnippet[]> {
  try {
    const matches = await getMatches({ tournamentId, status: "live" });
    return matches.map((m) => ({
      id: String(m._id),
      teamA: m.teamAName,
      teamB: m.teamBName,
      scoreA: `${m.totalRunsA ?? 0}`,
      scoreB: `${m.totalRunsB ?? 0}`,
      overs: `${m.teamAScore?.length ?? 0}.${m.teamBScore?.length ?? 0}`,
      status: "live" as const,
    }));
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  try {
    const tab = req.nextUrl.searchParams.get("tab");
    const city = req.nextUrl.searchParams.get("city");
    const type = req.nextUrl.searchParams.get("type");
    const search = req.nextUrl.searchParams.get("search")?.toLowerCase();
    const sort = req.nextUrl.searchParams.get("sort") ?? "date-desc";

    let dbList: Awaited<ReturnType<typeof getTournaments>> = [];
    try {
      dbList = await getTournaments();
    } catch {
      dbList = [];
    }

    let items =
      dbList.length > 0
        ? await Promise.all(
            dbList.map(async (t) => {
              const live = t.status === "active" ? await liveMatchesForTournament(String(t._id)) : [];
              return mapTournament(t, live);
            })
          )
        : [...demoTournaments];

    if (tab) items = items.filter((t) => t.tab === tab);
    if (city && city !== "all") items = items.filter((t) => t.city.toLowerCase() === city.toLowerCase());
    if (type && type !== "all")
      items = items.filter((t) => t.tournamentType.toLowerCase().includes(type.toLowerCase()));
    if (search)
      items = items.filter(
        (t) =>
          t.title.toLowerCase().includes(search) ||
          t.venue.toLowerCase().includes(search) ||
          t.organizer.toLowerCase().includes(search)
      );

    items.sort((a, b) => {
      const da = new Date(a.startDate).getTime();
      const db = new Date(b.startDate).getTime();
      return sort === "date-asc" ? da - db : db - da;
    });

    return NextResponse.json(items);
  } catch {
    return NextResponse.json(demoTournaments);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const data = tournamentSchema.parse(body);
    const tournament = await createTournament(data, session.userId);
    return NextResponse.json(tournament, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create tournament";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
