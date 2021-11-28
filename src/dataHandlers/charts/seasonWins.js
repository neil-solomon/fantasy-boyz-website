import playerToWins from "../aggregators/playerToWins";

export default function seasonWins(isRegluarSeason = true) {
  const _playerToWins = playerToWins(isRegluarSeason);
  let playerToWinsArray = [];

  for (const player in _playerToWins) {
    let data = _playerToWins[player];
    data["player"] = player + " (" + _playerToWins[player]["totalWins"] + ")";
    playerToWinsArray.push(data);
  }

  playerToWinsArray.sort((a, b) => {
    if (a.totalWins < b.totalWins) return 1;
    return -1;
  });

  playerToWinsArray = playerToWinsArray.filter(
    (player) => player.totalWins > 0
  );

  return playerToWinsArray;
}
