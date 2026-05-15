import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { scoreUpdateSchema } from "@/lib/validations";
import { deleteMatch, getMatchById, updateMatchScore } from "@/services/match.service";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const match = await getMatchById(id);
    if (!match) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(match);
  } catch {
    return NextResponse.json({ error: "Failed to fetch match" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const data = scoreUpdateSchema.parse(body);
    const match = await updateMatchScore(id, data);
    return NextResponse.json(match);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update score";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await deleteMatch(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
