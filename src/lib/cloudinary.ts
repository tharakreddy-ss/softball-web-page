import { v2 as cloudinary } from "cloudinary";

function configureCloudinary(): void {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config();
    return;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local"
    );
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
}

export function getCloudinary() {
  configureCloudinary();
  return cloudinary;
}

export function getCloudinaryCloudName(): string {
  if (process.env.CLOUDINARY_CLOUD_NAME) return process.env.CLOUDINARY_CLOUD_NAME;
  const url = process.env.CLOUDINARY_URL;
  if (url) {
    const match = url.match(/@([^/?]+)/);
    if (match?.[1]) return match[1];
  }
  throw new Error("Cloudinary cloud name is not configured");
}
