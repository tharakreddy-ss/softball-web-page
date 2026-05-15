import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IPlayerDocument extends Document {
  name: string;
  jerseyNumber: number;
  position: string;
  teamId?: mongoose.Types.ObjectId;
  photo?: string;
  stats: {
    matches: number;
    runs: number;
    hits: number;
    homeRuns: number;
    rbis: number;
    strikeouts: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PlayerSchema = new Schema<IPlayerDocument>(
  {
    name: { type: String, required: true },
    jerseyNumber: { type: Number, required: true },
    position: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, ref: "Team" },
    photo: { type: String },
    stats: {
      matches: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      hits: { type: Number, default: 0 },
      homeRuns: { type: Number, default: 0 },
      rbis: { type: Number, default: 0 },
      strikeouts: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const Player: Model<IPlayerDocument> =
  mongoose.models.Player ?? mongoose.model<IPlayerDocument>("Player", PlayerSchema);
