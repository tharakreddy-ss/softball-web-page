import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { matchSchema } from "@/lib/validations";
import { createMatch, getMatches, getLiveMatches } from "@/services/match.service";

export async function GET(req: NextRequest) {
  try {
    const tournamentId = req.nextUrl.searchParams.get("tournamentId") ?? undefined;
    const status = req.nextUrl.searchParams.get("status") ?? undefined;
    const live = req.nextUrl.searchParams.get("live");

    if (live === "true") {
      const matches = await getLiveMatches();
      return NextResponse.json(matches);
    }

    const matches = await getMatches({ tournamentId, status });
    return NextResponse.json(matches);
  } catch {
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const data = matchSchema.parse(body);
    const match = await createMatch(data);
    return NextResponse.json(match, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create match";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
