import { connectDB } from "@/lib/mongodb";
import { Team } from "@/models/Team";
import { Tournament } from "@/models/Tournament";
import type { TeamInput } from "@/lib/validations";

export async function getTeams(tournamentId?: string) {
  await connectDB();
  const filter = tournamentId ? { tournamentId } : {};
  return Team.find(filter).populate("playerIds", "name jerseyNumber position").sort({ name: 1 }).lean();
}

export async function getTeamById(id: string) {
  await connectDB();
  return Team.findById(id).populate("playerIds").lean();
}

export async function createTeam(data: TeamInput) {
  await connectDB();
  const team = await Team.create(data);
  if (data.tournamentId) {
    await Tournament.findByIdAndUpdate(data.tournamentId, {
      $addToSet: { teamIds: team._id },
    });
  }
  return team;
}

export async function updateTeam(id: string, data: Partial<TeamInput>) {
  await connectDB();
  return Team.findByIdAndUpdate(id, data, { new: true }).lean();
}

export async function deleteTeam(id: string) {
  await connectDB();
  return Team.findByIdAndDelete(id);
}
