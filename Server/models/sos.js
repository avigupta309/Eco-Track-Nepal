import mongoose, { model, Schema } from "mongoose";

const sosSchema = new Schema(
  {
    userInfo: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      default: null,
    },
    helperInfo: [
      {
        helper: {
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

export const sosModel = new model("sos", sosSchema);
