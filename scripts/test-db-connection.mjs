import { readFileSync } from "fs";
import { resolve } from "path";
import mongoose from "mongoose";

function loadEnvLocal() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local optional when MONGODB_URI is already set
  }
}

loadEnvLocal();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set. Create .env.local from .env.example");
  process.exit(1);
}

try {
  await mongoose.connect(uri, { bufferCommands: false });
  const { host, name } = mongoose.connection;
  console.log(`OK: connected to database "${name}" on ${host}`);
  await mongoose.disconnect();
  process.exit(0);
} catch (err) {
  console.error("FAIL:", err instanceof Error ? err.message : err);
  process.exit(1);
}
