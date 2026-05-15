import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { teamSchema } from "@/lib/validations";
import { createTeam, getTeams } from "@/services/team.service";

export async function GET(req: NextRequest) {
  try {
    const tournamentId = req.nextUrl.searchParams.get("tournamentId") ?? undefined;
    const teams = await getTeams(tournamentId);
    return NextResponse.json(teams);
  } catch {
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const data = teamSchema.parse(body);
    const team = await createTeam(data);
    return NextResponse.json(team, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create team";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
