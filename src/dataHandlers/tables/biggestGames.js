import playerToBigGames from "../aggregators/playerToBigGames";
import yearToAvgRegSeasonGameScore from "../aggregators/yearToAvgRegSeasonGameScore";

export default function biggestGames(numBigGames) {
  const _playerToBigGames = playerToBigGames();
  const _yearToAvgRegSeasonGameScore = yearToAvgRegSeasonGameScore();
  let allBigGames = [];
  let year;

  for (const player in _playerToBigGames) {
    for (const datum in _playerToBigGames[player]) {
      if (isNaN(parseInt(datum)) || !_playerToBigGames[player]?.[datum]) {
        continue;
      }
      year = datum;
      for (const bigGame of _playerToBigGames[player][year]) {
        allBigGames.push({
          player: player,
          score: bigGame.score.toFixed(2),
          avgScore: _yearToAvgRegSeasonGameScore[year].toFixed(2),
          pctAboveAvg: bigGame.pctAboveAvg.toFixed(2),
          year: year,
          week: bigGame.week,
        });
      }
    }
  }

  allBigGames.sort((a, b) => {
    if (parseFloat(a.pctAboveAvg) > parseFloat(b.pctAboveAvg)) return -1;
    return 1;
  });

  return allBigGames.slice(0, numBigGames);
}
