import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import mongoose from "mongoose";

/**
 * Creates a new connection to the database if one is not already connected.
 * If already connected, the current connection will be used.
 * @param handler callback function
 * @returns callback handler with req and res params passed.
 */
const connectDB = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return await handler(req, res);
  }
  // Use new db connection
  mongoose.connect(process.env.DB_URI!);
  return await handler(req, res);
};

export default connectDB;
