import mongoose, { Schema, model } from "mongoose";

const requestSchema = new Schema(
  {
    requestedTo: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    requestedFrom: [
      {
        requesters: {
          type: mongoose.Schema.ObjectId,
          ref: "users",
        },
        status: {
          type: String,
          enum: ["confirm", "pending", "denied"],
          default: "pending",
        },
        relation: {
          type: String,
          enum: [
            "brother",
            "sister",
            "father",
            "teacher",
            "uncle",
            "friend",
            "husband",
          ],
          default: "other",
        },
      },
    ],
  },
  { timestamps: true },
);

export const requestSosModel = new model("requestsos", requestSchema);
