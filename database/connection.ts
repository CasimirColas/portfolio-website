import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const mongo_uri = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!mongo_uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(mongo_uri as string, opts)
      .then((mongoose) => {
        mongoose;
      });
  }

  try {
    cached.conn = (await cached.promise) as string;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
