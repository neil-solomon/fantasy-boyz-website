import getPlayerToFinalStanding from "./getPlayerToFinalStanding";
import getYearToPlayerStats from "./getYearToPlayerStats";

export default function finalStanding() {
  const yearToPlayerStats = getYearToPlayerStats();
  const playerToFinalStanding = getPlayerToFinalStanding();
  let finalStandingData = [];

  for (const player in playerToFinalStanding) {
    finalStandingData.push({
      id: player,
      data: [],
    });
    for (const year in yearToPlayerStats) {
      if (!playerToFinalStanding[player]?.[year]) {
        finalStandingData[finalStandingData.length - 1].data.push({
          x: year,
          y: null,
        });
      } else {
        finalStandingData[finalStandingData.length - 1].data.push({
          x: year,
          y: playerToFinalStanding[player][year],
        });
      }
    }
  }

  return finalStandingData;
}
