import playerToPoints from "../aggregators/playerToPoints";

export default function seasonPoints(isRegluarSeason = true) {
  const _playerToPoints = playerToPoints(isRegluarSeason);
  let playerToPointsArray = [];

  for (const player in _playerToPoints) {
    for (const year in _playerToPoints[player]) {
      if (_playerToPoints[player][year]) {
        _playerToPoints[player][year] = Math.round(
          _playerToPoints[player][year]
        );
      }
    }
  }

  for (const player in _playerToPoints) {
    let data = _playerToPoints[player];
    data["player"] =
      player + " (" + Math.round(_playerToPoints[player]["totalPoints"]) + ")";
    playerToPointsArray.push(data);
  }

  playerToPointsArray.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) return 1;
    return -1;
  });

  playerToPointsArray = playerToPointsArray.filter(
    (player) => player.totalPoints > 0
  );

  return playerToPointsArray;
}
