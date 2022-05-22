import mongoose, { Mongoose } from "mongoose";

export default async function connectToMongoDB(): Promise<Mongoose> {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI ENVEIRONMENT VARIABLE NOT SET");
  }

  const uri: string = process.env.MONGODB_URI;

  let globalWithMongoose = global as typeof globalThis & {
    mongoose: { connection: Mongoose | null; promise: Promise<Mongoose> | null };
  };

  let cached = globalWithMongoose.mongoose;

  if (!cached) {
    cached = globalWithMongoose.mongoose = { connection: null, promise: null };
  }
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((mongo: Mongoose) => {
      return mongo;
    });
  }

  cached.connection = await cached.promise;
  return cached.connection;
}
