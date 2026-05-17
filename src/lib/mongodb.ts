import mongoose from "mongoose";

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (uri) return uri;

  if (process.env.NODE_ENV === "production") {
    throw new Error("MONGODB_URI is not defined. Set it in your environment.");
  }

  return "mongodb://localhost:27017/softball-tournament";
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = getMongoUri();
    cached.promise = mongoose.connect(uri, { bufferCommands: false }).then((conn) => {
      if (process.env.NODE_ENV !== "production") {
        console.info("[mongodb] Connected to", conn.connection.name);
      }
      return conn;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
