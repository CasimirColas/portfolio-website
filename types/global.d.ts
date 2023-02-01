import mongoose from "mongoose";
import { Promise } from "mongoose";
declare global {
  var mongoose: { conn: string | null; promise: Promise<string | void> | null };
}
