import { Schema, model, models, Types } from "mongoose";

const CandidateSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: Types.ObjectId,
      ref: "Position",
    },
    photo: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: false,
      default: "No manifesto",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Candidate || model("Candidate", CandidateSchema);
