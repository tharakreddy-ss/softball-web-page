import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { playerSchema } from "@/lib/validations";
import { createPlayer, getPlayers } from "@/services/player.service";

export async function GET(req: NextRequest) {
  try {
    const teamId = req.nextUrl.searchParams.get("teamId") ?? undefined;
    const players = await getPlayers(teamId);
    return NextResponse.json(players);
  } catch {
    return NextResponse.json({ error: "Failed to fetch players" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const data = playerSchema.parse(body);
    const player = await createPlayer(data);
    return NextResponse.json(player, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create player";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
