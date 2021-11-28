import yearToPlayerStats from "./yearToPlayerStats";

export default function playerToFinalStanding() {
  const _yearToPlayerStats = yearToPlayerStats();
  let playerToFinalStanding = {};

  for (const year in _yearToPlayerStats) {
    for (const player of _yearToPlayerStats[year]) {
      if (!playerToFinalStanding?.[player.name]) {
        playerToFinalStanding[player.name] = {};
      }
      playerToFinalStanding[player.name][year] = player.finalStanding;
    }
  }

  return playerToFinalStanding;
}
