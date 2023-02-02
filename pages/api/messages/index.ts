import dbConnect from "../../../database/connection";
import Message from "../../../database/models/Message";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { limit } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const messages = await Message.find({ type: "public" }).limit(
          Number(limit)
        );
        res.status(200).json({ success: true, data: messages });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        const hours = String(today.getHours());
        const min = String(today.getMinutes());
        const todayString =
          mm + "/" + dd + "/" + yyyy + " at " + hours + ":" + min;
        const realBody = await Object.assign({}, req.body);
        realBody.sendingDate = todayString;
        const message = await Message.create(realBody);
        res.status(201).json({ success: true, data: message });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "unvalid method" });
      break;
  }
}
