import playerToWeekTopScore from "../aggregators/playerToWeekTopScore";

export default function seasonWeekTopScore() {
  const _playerToWeekTopScore = playerToWeekTopScore();
  let playerToWeekTopScoreArray = [];

  for (const player in _playerToWeekTopScore) {
    let data = _playerToWeekTopScore[player];
    data["player"] =
      player + " (" + _playerToWeekTopScore[player]["totalWeekTopScore"] + ")";
    playerToWeekTopScoreArray.push(data);
  }

  playerToWeekTopScoreArray.sort((a, b) => {
    if (a.totalWeekTopScore < b.totalWeekTopScore) return 1;
    return -1;
  });

  playerToWeekTopScoreArray = playerToWeekTopScoreArray.filter(
    (player) => player.totalWeekTopScore > 0
  );

  return playerToWeekTopScoreArray;
}
