import playerToBigGames from "../aggregators/playerToBigGames";

export default function bigGames() {
  const _playerToBigGames = playerToBigGames();
  let playerToBigGamesArray = [];

  for (const player in _playerToBigGames) {
    let data = _playerToBigGames[player];
    data["player"] =
      player + " (" + _playerToBigGames[player]["totalBigGames"] + ")";
    for (const datum in data) {
      if (!isNaN(parseInt(datum)) && data[datum]) {
        data[datum] = data[datum].length;
      }
    }
    playerToBigGamesArray.push(data);
  }

  playerToBigGamesArray.sort((a, b) => {
    if (a.totalBigGames < b.totalBigGames) return 1;
    return -1;
  });

  playerToBigGamesArray = playerToBigGamesArray.filter(
    (player) => player.totalBigGames > 0
  );

  return playerToBigGamesArray;
}
