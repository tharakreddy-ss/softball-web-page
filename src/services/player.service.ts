import { connectDB } from "@/lib/mongodb";
import { Player } from "@/models/Player";
import { Team } from "@/models/Team";
import type { PlayerInput } from "@/lib/validations";

export async function getPlayers(teamId?: string) {
  await connectDB();
  const filter = teamId ? { teamId } : {};
  return Player.find(filter).sort({ name: 1 }).lean();
}

export async function getPlayerById(id: string) {
  await connectDB();
  return Player.findById(id).populate("teamId", "name shortName logo").lean();
}

export async function createPlayer(data: PlayerInput) {
  await connectDB();
  const player = await Player.create(data);
  if (data.teamId) {
    await Team.findByIdAndUpdate(data.teamId, { $addToSet: { playerIds: player._id } });
  }
  return player;
}

export async function updatePlayer(id: string, data: Partial<PlayerInput>) {
  await connectDB();
  return Player.findByIdAndUpdate(id, data, { new: true }).lean();
}

export async function deletePlayer(id: string) {
  await connectDB();
  return Player.findByIdAndDelete(id);
}

export async function getTopPlayers(limit = 10) {
  await connectDB();
  return Player.find().sort({ "stats.runs": -1 }).limit(limit).lean();
}
