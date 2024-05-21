import { Schema, model, models } from "mongoose";

const SettingsSchema = new Schema(
  {
    electionStatus: {
      type: String,
      required: true,
    },
    main: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Settings || model("Settings", SettingsSchema);
