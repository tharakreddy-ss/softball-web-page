import { NextRequest, NextResponse } from "next/server";
import { geocodeAddress } from "@/lib/google-maps";

export async function GET(req: NextRequest) {
  try {
    const address = req.nextUrl.searchParams.get("address");
    if (!address?.trim()) {
      return NextResponse.json({ error: "address query parameter is required" }, { status: 400 });
    }

    const result = await geocodeAddress(address);
    if (!result) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Geocoding failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
