import { Schema, model, models } from "mongoose";

const PositionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Position || model("Position", PositionSchema);
