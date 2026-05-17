import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCloudinary } from "@/lib/cloudinary";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_FOLDERS = ["tournaments", "teams", "players", "gallery"] as const;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") as string) || "gallery";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_FOLDERS.includes(folder as (typeof ALLOWED_FOLDERS)[number])) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are supported" }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File must be 5MB or smaller" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const cloudinary = getCloudinary();

    const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: `softball/${folder}`, resource_type: "image" },
        (error, uploadResult) => {
          if (error) reject(error);
          else if (!uploadResult?.secure_url) reject(new Error("Upload failed"));
          else resolve({ secure_url: uploadResult.secure_url, public_id: uploadResult.public_id });
        }
      );
      upload.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
