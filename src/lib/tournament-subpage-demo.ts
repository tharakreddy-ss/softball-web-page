export const demoTeams = [
  { id: "t1", name: "Falcons", shortName: "FAL", captain: "Alex Rivera", coach: "Mike Chen", wins: 5, losses: 1, players: 14, rank: 1, logo: "/assets/teams/default-team-badge.svg" },
  { id: "t2", name: "Warriors", shortName: "WAR", captain: "Jordan Lee", coach: "Sam Ortiz", wins: 4, losses: 2, players: 13, rank: 2, logo: "/assets/teams/default-team-badge.svg" },
  { id: "t3", name: "Thunder Hawks", shortName: "THK", captain: "Casey Brooks", coach: "Pat Walsh", wins: 4, losses: 2, players: 15, rank: 3, logo: "/assets/teams/default-team-badge.svg" },
  { id: "t4", name: "Storm", shortName: "STM", captain: "Riley Park", coach: "Dana Fox", wins: 3, losses: 3, players: 12, rank: 4, logo: "/assets/teams/default-team-badge.svg" },
];

export const demoFixtures = [
  { id: "m1", teamA: "Falcons", teamB: "Warriors", venue: "Field A", date: "2026-05-15T18:00:00Z", status: "live" as const },
  { id: "m2", teamA: "Thunder Hawks", teamB: "Storm", venue: "Field B", date: "2026-05-15T20:30:00Z", status: "scheduled" as const },
  { id: "m3", teamA: "Falcons", teamB: "Storm", venue: "Field A", date: "2026-05-14T16:00:00Z", status: "completed" as const, scoreA: 9, scoreB: 6 },
];

export const demoStandings = [
  { rank: 1, team: "Falcons", played: 6, won: 5, lost: 1, nrr: 1.245, points: 10, qualified: true },
  { rank: 2, team: "Warriors", played: 6, won: 4, lost: 2, nrr: 0.892, points: 8, qualified: true },
  { rank: 3, team: "Thunder Hawks", played: 6, won: 4, lost: 2, nrr: 0.654, points: 8, qualified: false },
  { rank: 4, team: "Storm", played: 6, won: 3, lost: 3, nrr: -0.120, points: 6, qualified: false },
];

export const demoPlayerStats = [
  { name: "Sarah Mitchell", team: "Thunder Hawks", runs: 142, wickets: 0, sr: 168, mvp: 9.2 },
  { name: "James Rivera", team: "Pacific Storm", runs: 118, wickets: 12, sr: 145, mvp: 8.8 },
  { name: "Alex Rivera", team: "Falcons", runs: 96, wickets: 8, sr: 132, mvp: 8.1 },
];

export const demoGallery = [
  { id: "g1", title: "Championship moment", src: "/assets/banners/pitcher-hero.png", type: "photo" as const },
  { id: "g2", title: "Team celebration", src: "/assets/tournament/default-cover.svg", type: "photo" as const },
  { id: "g3", title: "Final highlight reel", src: "/assets/banners/hero-banner.svg", type: "video" as const },
];

export const demoResults = [
  { id: "r1", winner: "Falcons", loser: "Storm", margin: "3 runs", pom: "Alex Rivera", score: "9-6" },
  { id: "r2", winner: "Warriors", loser: "Thunder Hawks", margin: "5 runs", pom: "Jordan Lee", score: "11-6" },
];

export const demoAwards = [
  { title: "Champion", winner: "Thunder Hawks", icon: "trophy" },
  { title: "Runner-up", winner: "Iron Eagles", icon: "medal" },
  { title: "MVP", winner: "Sarah Mitchell", icon: "star" },
  { title: "Best Batter", winner: "James Rivera", icon: "bat" },
  { title: "Best Bowler", winner: "Casey Brooks", icon: "ball" },
];

export const demoAnnouncements = [
  { id: "a1", title: "Rain delay policy updated", date: "2026-05-14", priority: "high" as const, body: "Matches delayed over 45 min will resume next day." },
  { id: "a2", title: "Semi-final schedule published", date: "2026-05-13", priority: "normal" as const, body: "Check fixtures for updated times." },
];

export const demoUmpires = [
  { name: "Chris Anderson", role: "Head Umpire", matches: 12 },
  { name: "Maria Santos", role: "Plate Umpire", matches: 10 },
  { name: "David Kim", role: "Base Umpire", matches: 8 },
];

export const demoRules = [
  "7 innings per game (9 for championship)",
  "Mercy rule: 10 runs after 5 innings",
  "Roster limit: 15 players, 12 active",
  "Designated player allowed",
  "Protest window: 30 minutes post-game",
];
