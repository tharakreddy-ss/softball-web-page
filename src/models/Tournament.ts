import mongoose, { Schema, type Document, type Model } from "mongoose";
import type { MatchFormat, TournamentStatus } from "@/types";

export interface ITournamentDocument extends Document {
  name: string;
  description?: string;
  banner?: string;
  location: string;
  city?: string;
  organizer?: string;
  startDate: Date;
  endDate: Date;
  status: TournamentStatus;
  format: MatchFormat;
  maxTeams: number;
  prizePool?: string;
  tournamentType?: string;
  registrationOpen?: boolean;
  winner?: string;
  runnerUp?: string;
  mvp?: string;
  highlights?: string[];
  sponsors?: string[];
  teamIds: mongoose.Types.ObjectId[];
  matchIds: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TournamentSchema = new Schema<ITournamentDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    banner: { type: String },
    location: { type: String, required: true },
    city: { type: String },
    organizer: { type: String },
    prizePool: { type: String, default: "$10,000" },
    tournamentType: { type: String },
    registrationOpen: { type: Boolean, default: false },
    winner: { type: String },
    runnerUp: { type: String },
    mvp: { type: String },
    highlights: [{ type: String }],
    sponsors: [{ type: String }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["draft", "upcoming", "active", "completed"],
      default: "draft",
    },
    format: {
      type: String,
      enum: ["league", "knockout", "group_stage"],
      default: "league",
    },
    maxTeams: { type: Number, default: 8 },
    teamIds: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    matchIds: [{ type: Schema.Types.ObjectId, ref: "Match" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Tournament: Model<ITournamentDocument> =
  mongoose.models.Tournament ??
  mongoose.model<ITournamentDocument>("Tournament", TournamentSchema);
