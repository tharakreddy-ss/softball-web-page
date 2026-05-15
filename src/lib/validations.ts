import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "organizer", "scorer", "viewer"]).optional(),
});

export const tournamentSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  location: z.string().min(2),
  startDate: z.string(),
  endDate: z.string(),
  format: z.enum(["league", "knockout", "group_stage"]),
  maxTeams: z.number().min(2).max(64),
  status: z.enum(["draft", "upcoming", "active", "completed"]).optional(),
});

export const teamSchema = z.object({
  name: z.string().min(2),
  shortName: z.string().min(2).max(5),
  captain: z.string().optional(),
  coach: z.string().optional(),
  tournamentId: z.string().optional(),
});

export const playerSchema = z.object({
  name: z.string().min(2),
  jerseyNumber: z.number().min(0).max(99),
  position: z.string().min(1),
  teamId: z.string().optional(),
});

export const matchSchema = z.object({
  tournamentId: z.string(),
  teamAId: z.string(),
  teamBId: z.string(),
  venue: z.string().min(2),
  scheduledAt: z.string(),
  format: z.enum(["league", "knockout", "group_stage"]),
  innings: z.number().min(1).max(9).default(7),
});

export const scoreUpdateSchema = z.object({
  teamAScore: z.array(z.object({ inning: z.number(), runs: z.number() })),
  teamBScore: z.array(z.object({ inning: z.number(), runs: z.number() })),
  status: z.enum(["scheduled", "live", "completed", "cancelled"]).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type TournamentInput = z.infer<typeof tournamentSchema>;
export type TeamInput = z.infer<typeof teamSchema>;
export type PlayerInput = z.infer<typeof playerSchema>;
export type MatchInput = z.infer<typeof matchSchema>;
