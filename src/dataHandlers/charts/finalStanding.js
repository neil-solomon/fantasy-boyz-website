import playerToFinalStanding from "../aggregators/playerToFinalStanding";
import yearToPlayerStats from "../aggregators/yearToPlayerStats";

export default function finalStanding() {
  const _yearToPlayerStats = yearToPlayerStats();
  const _playerToFinalStanding = playerToFinalStanding();
  let finalStandingData = [];

  for (const player in _playerToFinalStanding) {
    finalStandingData.push({
      id: player,
      data: [],
    });
    for (const year in _yearToPlayerStats) {
      if (!_playerToFinalStanding[player]?.[year]) {
        finalStandingData[finalStandingData.length - 1].data.push({
          x: year,
          y: null,
        });
      } else {
        finalStandingData[finalStandingData.length - 1].data.push({
          x: year,
          y: _playerToFinalStanding[player][year],
        });
      }
    }
  }

  return finalStandingData;
}
