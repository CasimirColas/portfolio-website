import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const messageSchema = new mongoose.Schema({
  from: { type: String },
  title: { type: String },
  content: { type: String },
  sendingDate: { type: String },
  type: { type: String },
  deletionCode: { type: String },
});

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
