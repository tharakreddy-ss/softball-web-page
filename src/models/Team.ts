import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ITeamDocument extends Document {
  name: string;
  shortName: string;
  logo?: string;
  captain?: string;
  coach?: string;
  tournamentId?: mongoose.Types.ObjectId;
  playerIds: mongoose.Types.ObjectId[];
  wins: number;
  losses: number;
  draws: number;
  runsScored: number;
  runsConceded: number;
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeamDocument>(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    logo: { type: String },
    captain: { type: String },
    coach: { type: String },
    tournamentId: { type: Schema.Types.ObjectId, ref: "Tournament" },
    playerIds: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    runsScored: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Team: Model<ITeamDocument> =
  mongoose.models.Team ?? mongoose.model<ITeamDocument>("Team", TeamSchema);
