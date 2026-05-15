import { connectDB } from "@/lib/mongodb";
import { Match } from "@/models/Match";
import { Team } from "@/models/Team";
import { Tournament } from "@/models/Tournament";
import type { MatchInput } from "@/lib/validations";

function sumRuns(scores: { runs: number }[]) {
  return scores.reduce((sum, s) => sum + s.runs, 0);
}

export async function getMatches(filters?: { tournamentId?: string; status?: string }) {
  await connectDB();
  const query: Record<string, unknown> = {};
  if (filters?.tournamentId) query.tournamentId = filters.tournamentId;
  if (filters?.status) query.status = filters.status;
  return Match.find(query).sort({ scheduledAt: -1 }).lean();
}

export async function getMatchById(id: string) {
  await connectDB();
  return Match.findById(id).lean();
}

export async function getLiveMatches() {
  await connectDB();
  return Match.find({ status: "live" }).sort({ scheduledAt: -1 }).lean();
}

export async function createMatch(data: MatchInput) {
  await connectDB();
  const [teamA, teamB] = await Promise.all([
    Team.findById(data.teamAId),
    Team.findById(data.teamBId),
  ]);
  if (!teamA || !teamB) throw new Error("Teams not found");

  const innings = data.innings ?? 7;
  const emptyScore = Array.from({ length: innings }, (_, i) => ({ inning: i + 1, runs: 0 }));

  const match = await Match.create({
    ...data,
    teamAName: teamA.name,
    teamBName: teamB.name,
    scheduledAt: new Date(data.scheduledAt),
    teamAScore: emptyScore,
    teamBScore: emptyScore,
  });

  await Tournament.findByIdAndUpdate(data.tournamentId, {
    $addToSet: { matchIds: match._id },
  });

  return match;
}

export async function updateMatchScore(
  id: string,
  data: {
    teamAScore: { inning: number; runs: number }[];
    teamBScore: { inning: number; runs: number }[];
    status?: string;
  }
) {
  await connectDB();
  const totalRunsA = sumRuns(data.teamAScore);
  const totalRunsB = sumRuns(data.teamBScore);

  const update: Record<string, unknown> = {
    teamAScore: data.teamAScore,
    teamBScore: data.teamBScore,
    totalRunsA,
    totalRunsB,
  };
  if (data.status) update.status = data.status;

  const match = await Match.findByIdAndUpdate(id, update, { new: true });
  if (!match) return null;

  if (data.status === "completed") {
    const winnerId =
      totalRunsA > totalRunsB
        ? match.teamAId
        : totalRunsB > totalRunsA
          ? match.teamBId
          : undefined;

    if (winnerId) {
      match.winnerId = winnerId;
      await match.save();
      const loserId = winnerId.equals(match.teamAId) ? match.teamBId : match.teamAId;
      await Team.findByIdAndUpdate(winnerId, {
        $inc: { wins: 1, runsScored: winnerId.equals(match.teamAId) ? totalRunsA : totalRunsB },
      });
      await Team.findByIdAndUpdate(loserId, {
        $inc: { losses: 1, runsConceded: winnerId.equals(match.teamAId) ? totalRunsB : totalRunsA },
      });
    }
  }

  return match;
}

export async function deleteMatch(id: string) {
  await connectDB();
  return Match.findByIdAndDelete(id);
}
