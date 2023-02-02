import dbConnect from "../../../database/connection";
import Message from "../../../database/models/Message";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const message = await Message.findById(id);
        if (!message) {
          return res
            .status(400)
            .json({
              success: false,
              error: "Message with this id was not found",
            });
        }
        res.status(200).json({ success: true, data: message });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "PUT":
      try {
        const message = await Message.findById(id);
        if (!message) {
          return res
            .status(400)
            .json({
              success: false,
              error: "Message with this id was not found",
            });
        }
        if ((req.body.request = "delete")) {
          if (req.body.deletionCode === message.deletionCode) {
            const message = await Message.findOneAndDelete({ _id: id });
            await res
              .status(200)
              .json({ success: true, msg: "Message deleted" });
          } else {
            res.status(400).json({ success: false, error: "Incorrect code" });
          }
        }
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "Incorrect method" });
      break;
  }
}
