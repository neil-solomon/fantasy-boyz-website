import playerToPoints from "../aggregators/playerToPoints";
import yearToAvgRegSeasonScore from "../aggregators/yearToAvgRegSeasonScore";
import yearToPlayerStats from "../aggregators/yearToPlayerStats";

export default function regSeasonPointsSeasonAvg(numScores) {
  const _playerToPoints = playerToPoints();
  const _yearToAvgRegSeasonScore = yearToAvgRegSeasonScore();
  console.log(_yearToAvgRegSeasonScore);
  const _yearToPlayerStats = yearToPlayerStats();
  let _regSeasonPointsSeasonAvg = [];
  let points;

  for (const player in _playerToPoints) {
    for (const year in _yearToPlayerStats) {
      points = _playerToPoints[player][year];
      if (!points) continue;

      _regSeasonPointsSeasonAvg.push({
        player: player,
        points: _playerToPoints[player][year].toFixed(2),
        avg: _yearToAvgRegSeasonScore[year].toFixed(2),
        pctAboveAvg: (
          (_playerToPoints[player][year] / _yearToAvgRegSeasonScore[year] - 1) *
          100
        ).toFixed(2),
        year: year,
      });
    }
  }

  _regSeasonPointsSeasonAvg.sort((a, b) => {
    if (parseFloat(a.pctAboveAvg) > parseFloat(b.pctAboveAvg)) return -1;
    return 1;
  });

  return _regSeasonPointsSeasonAvg.slice(0, numScores);
}
