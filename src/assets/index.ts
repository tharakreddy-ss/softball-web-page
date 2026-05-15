import appLogo from "./logos/app-logo.svg";
import defaultTeamLogo from "./logos/default-team.svg";
import defaultAvatar from "./players/default-avatar.svg";
import placeholderPlayer from "./players/placeholder-player.svg";
import defaultTeamBadge from "./teams/default-team-badge.svg";
import heroBanner from "./banners/hero-banner.svg";
import pitcherHero from "./banners/pitcher-hero.png";
import dashboardBanner from "./banners/dashboard-banner.svg";
import defaultTournamentCover from "./tournament/default-cover.svg";
import softballIcon from "./icons/softball.svg";
import emptyState from "./icons/empty-state.svg";

/** Static imports for use with `next/image` or `AppImage` */
export const assets = {
  logos: { app: appLogo, defaultTeam: defaultTeamLogo },
  players: { defaultAvatar, placeholder: placeholderPlayer },
  teams: { defaultBadge: defaultTeamBadge },
  banners: { hero: pitcherHero, heroSvg: heroBanner, dashboard: dashboardBanner },
  tournament: { defaultCover: defaultTournamentCover },
  icons: { softball: softballIcon, emptyState },
} as const;

/** Public URLs (`public/assets` mirrors `src/assets`) — use in DB / API defaults */
export const assetPaths = {
  logos: {
    app: "/assets/logos/app-logo.svg",
    defaultTeam: "/assets/logos/default-team.svg",
  },
  players: {
    defaultAvatar: "/assets/players/default-avatar.svg",
    placeholder: "/assets/players/placeholder-player.svg",
  },
  teams: {
    defaultBadge: "/assets/teams/default-team-badge.svg",
  },
  banners: {
    hero: "/assets/banners/pitcher-hero.png",
    heroSvg: "/assets/banners/hero-banner.svg",
    dashboard: "/assets/banners/dashboard-banner.svg",
  },
  tournament: {
    defaultCover: "/assets/tournament/default-cover.svg",
  },
  icons: {
    softball: "/assets/icons/softball.svg",
    emptyState: "/assets/icons/empty-state.svg",
  },
} as const;

export const assetCatalog = [
  { name: "App logo", category: "Logos", src: assetPaths.logos.app, import: appLogo },
  { name: "Default team logo", category: "Logos", src: assetPaths.logos.defaultTeam, import: defaultTeamLogo },
  { name: "Default avatar", category: "Players", src: assetPaths.players.defaultAvatar, import: defaultAvatar },
  { name: "Player placeholder", category: "Players", src: assetPaths.players.placeholder, import: placeholderPlayer },
  { name: "Team badge", category: "Teams", src: assetPaths.teams.defaultBadge, import: defaultTeamBadge },
  { name: "Pitcher hero (landing)", category: "Banners", src: assetPaths.banners.hero, import: pitcherHero },
  { name: "Hero banner (SVG)", category: "Banners", src: assetPaths.banners.heroSvg, import: heroBanner },
  { name: "Dashboard banner", category: "Banners", src: assetPaths.banners.dashboard, import: dashboardBanner },
  { name: "Tournament cover", category: "Tournament", src: assetPaths.tournament.defaultCover, import: defaultTournamentCover },
  { name: "Softball icon", category: "Icons", src: assetPaths.icons.softball, import: softballIcon },
  { name: "Empty state", category: "Icons", src: assetPaths.icons.emptyState, import: emptyState },
] as const;

export default assets;
