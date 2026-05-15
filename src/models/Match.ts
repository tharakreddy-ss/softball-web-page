import mongoose, { Schema, type Document, type Model } from "mongoose";
import type { MatchFormat, MatchStatus } from "@/types";

const InningScoreSchema = new Schema(
  {
    inning: { type: Number, required: true },
    runs: { type: Number, default: 0 },
  },
  { _id: false }
);

export interface IMatchDocument extends Document {
  tournamentId: mongoose.Types.ObjectId;
  teamAId: mongoose.Types.ObjectId;
  teamBId: mongoose.Types.ObjectId;
  teamAName: string;
  teamBName: string;
  venue: string;
  scheduledAt: Date;
  status: MatchStatus;
  format: MatchFormat;
  innings: number;
  teamAScore: { inning: number; runs: number }[];
  teamBScore: { inning: number; runs: number }[];
  totalRunsA: number;
  totalRunsB: number;
  winnerId?: mongoose.Types.ObjectId;
  mvpPlayerId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MatchSchema = new Schema<IMatchDocument>(
  {
    tournamentId: { type: Schema.Types.ObjectId, ref: "Tournament", required: true },
    teamAId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    teamBId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    teamAName: { type: String, required: true },
    teamBName: { type: String, required: true },
    venue: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "live", "completed", "cancelled"],
      default: "scheduled",
    },
    format: {
      type: String,
      enum: ["league", "knockout", "group_stage"],
      default: "league",
    },
    innings: { type: Number, default: 7 },
    teamAScore: [InningScoreSchema],
    teamBScore: [InningScoreSchema],
    totalRunsA: { type: Number, default: 0 },
    totalRunsB: { type: Number, default: 0 },
    winnerId: { type: Schema.Types.ObjectId, ref: "Team" },
    mvpPlayerId: { type: Schema.Types.ObjectId, ref: "Player" },
  },
  { timestamps: true }
);

export const Match: Model<IMatchDocument> =
  mongoose.models.Match ?? mongoose.model<IMatchDocument>("Match", MatchSchema);
