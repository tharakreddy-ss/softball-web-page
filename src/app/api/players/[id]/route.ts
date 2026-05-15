import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { playerSchema } from "@/lib/validations";
import { deletePlayer, getPlayerById, updatePlayer } from "@/services/player.service";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const player = await getPlayerById(id);
    if (!player) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(player);
  } catch {
    return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const data = playerSchema.partial().parse(body);
    const player = await updatePlayer(id, data);
    return NextResponse.json(player);
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
    await deletePlayer(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
