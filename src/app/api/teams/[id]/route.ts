import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { teamSchema } from "@/lib/validations";
import { deleteTeam, getTeamById, updateTeam } from "@/services/team.service";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const team = await getTeamById(id);
    if (!team) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(team);
  } catch {
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const data = teamSchema.partial().parse(body);
    const team = await updateTeam(id, data);
    return NextResponse.json(team);
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
    await deleteTeam(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
