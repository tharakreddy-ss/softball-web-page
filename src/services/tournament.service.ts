import { connectDB } from "@/lib/mongodb";
import { Tournament } from "@/models/Tournament";
import type { TournamentInput } from "@/lib/validations";
import type { TournamentStatus } from "@/types";

export async function getTournaments(status?: string) {
  await connectDB();
  const filter = status ? { status: status as TournamentStatus } : {};
  return Tournament.find(filter).sort({ startDate: -1 }).lean();
}

export async function getTournamentById(id: string) {
  await connectDB();
  return Tournament.findById(id)
    .populate("teamIds", "name shortName logo wins losses")
    .lean();
}

export async function createTournament(data: TournamentInput, userId: string) {
  await connectDB();
  return Tournament.create({
    ...data,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    createdBy: userId,
  });
}

export async function updateTournament(id: string, data: Partial<TournamentInput>) {
  await connectDB();
  const update: Record<string, unknown> = { ...data };
  if (data.startDate) update.startDate = new Date(data.startDate);
  if (data.endDate) update.endDate = new Date(data.endDate);
  return Tournament.findByIdAndUpdate(id, update, { new: true }).lean();
}

export async function deleteTournament(id: string) {
  await connectDB();
  return Tournament.findByIdAndDelete(id);
}
