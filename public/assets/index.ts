import appLogo from "./logos/app-logo.svg";
import defaultTeamLogo from "./logos/default-team.svg";
import defaultAvatar from "./players/default-avatar.svg";
import placeholderPlayer from "./players/placeholder-player.svg";
import defaultTeamBadge from "./teams/default-team-badge.svg";
import heroBanner from "./banners/hero-banner.svg";
import dashboardBanner from "./banners/dashboard-banner.svg";
import defaultTournamentCover from "./tournament/default-cover.svg";
import softballIcon from "./icons/softball.svg";
import emptyState from "./icons/empty-state.svg";

function url(img: { src: string }): string {
  return img.src;
}

/** Static image imports from `src/assets` */
export const assets = {
  logos: {
    app: appLogo,
    defaultTeam: defaultTeamLogo,
  },
  players: {
    defaultAvatar,
    placeholder: placeholderPlayer,
  },
  teams: {
    defaultBadge: defaultTeamBadge,
  },
  banners: {
    hero: heroBanner,
    dashboard: dashboardBanner,
  },
  tournament: {
    defaultCover: defaultTournamentCover,
  },
  icons: {
    softball: softballIcon,
    emptyState,
  },
} as const;

/** Resolved URLs (for DB defaults, `<img src>`, API responses) */
export const assetPaths = {
  logos: {
    app: url(appLogo),
    defaultTeam: url(defaultTeamLogo),
  },
  players: {
    defaultAvatar: url(defaultAvatar),
    placeholder: url(placeholderPlayer),
  },
  teams: {
    defaultBadge: url(defaultTeamBadge),
  },
  banners: {
    hero: url(heroBanner),
    dashboard: url(dashboardBanner),
  },
  tournament: {
    defaultCover: url(defaultTournamentCover),
  },
} as const;

export {
  appLogo,
  defaultTeamLogo,
  defaultAvatar,
  placeholderPlayer,
  defaultTeamBadge,
  heroBanner,
  dashboardBanner,
  defaultTournamentCover,
  softballIcon,
  emptyState,
};

export default assets;
