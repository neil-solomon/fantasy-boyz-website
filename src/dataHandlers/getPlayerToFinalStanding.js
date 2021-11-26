import getYearToPlayerStats from "./getYearToPlayerStats";

export default function getPlayerToFinalStanding() {
  const yearToPlayerStats = getYearToPlayerStats();
  let playerToFinalStanding = {};

  for (const year in yearToPlayerStats) {
    for (const player of yearToPlayerStats[year]) {
      if (!playerToFinalStanding?.[player.name]) {
        playerToFinalStanding[player.name] = {};
      }
      playerToFinalStanding[player.name][year] = player.finalStanding;
    }
  }

  return playerToFinalStanding;
}
