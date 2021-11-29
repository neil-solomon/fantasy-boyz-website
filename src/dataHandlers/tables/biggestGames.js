import playerToBigGames from "../aggregators/playerToBigGames";
import yearToAvgRegularSeasonScore from "../aggregators/yearToAvgRegularSeasonScore";

export default function biggestGames(numBigGames) {
  const _playerToBigGames = playerToBigGames();
  const _yearToAvgRegularSeasonScore = yearToAvgRegularSeasonScore();
  let allBigGames = [];
  let year;

  for (const player in _playerToBigGames) {
    for (const datum in _playerToBigGames[player]) {
      if (!isNaN(parseInt(datum)) && _playerToBigGames[player][datum]) {
        year = datum;
        for (const bigGame of _playerToBigGames[player][year]) {
          allBigGames.push({
            player: player,
            score: bigGame.score,
            avgScore: Math.round(_yearToAvgRegularSeasonScore[year]),
            pctAboveAvg: Math.round(bigGame.pctAboveAvg),
            year: year,
            week: bigGame.week,
          });
        }
      }
    }
  }

  allBigGames.sort((a, b) => {
    if (a.pctAboveAvg > b.pctAboveAvg) return -1;
    return 1;
  });

  return allBigGames.slice(0, numBigGames);
}
