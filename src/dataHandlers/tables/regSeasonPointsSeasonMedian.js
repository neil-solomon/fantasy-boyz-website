import playerToPoints from "../aggregators/playerToPoints";
import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import yearToMedianREgSeasonScore from "../aggregators/yearToMedianRegSeasonScore";

export default function regSeasonPointsSeasonMedian(numScores) {
  const _playerToPoints = playerToPoints();
  const _yearToMedianRegSeasonScore = yearToMedianREgSeasonScore();
  const _yearToPlayerStats = yearToPlayerStats();
  let _regSeasonPointsSeasonMedian = [];
  let points;

  for (const player in _playerToPoints) {
    for (const year in _yearToPlayerStats) {
      points = _playerToPoints[player][year];
      if (!points) continue;

      _regSeasonPointsSeasonMedian.push({
        player: player,
        points: _playerToPoints[player][year].toFixed(2),
        median: _yearToMedianRegSeasonScore[year].toFixed(2),
        pctAboveMedian: (
          (_playerToPoints[player][year] / _yearToMedianRegSeasonScore[year] -
            1) *
          100
        ).toFixed(2),
        year: year,
      });
    }
  }

  _regSeasonPointsSeasonMedian.sort((a, b) => {
    if (parseFloat(a.pctAboveMedian) > parseFloat(b.pctAboveMedian)) return -1;
    return 1;
  });

  return _regSeasonPointsSeasonMedian.slice(0, numScores);
}
