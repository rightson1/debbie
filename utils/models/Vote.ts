import { Schema, Types, model, models } from "mongoose";

const VoteSchema = new Schema(
  {
    voterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: Types.ObjectId,
      ref: "Position",
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    candidateUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Vote || model("Vote", VoteSchema);
