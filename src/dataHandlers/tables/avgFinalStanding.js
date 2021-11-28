import playerToFinalStanding from "../aggregators/playerToFinalStanding";

export default function avgFinalStanding() {
  const _playerToFinalStanding = playerToFinalStanding();
  let playerToAvgFinalStanding = [];

  for (const player of Object.keys(_playerToFinalStanding)) {
    let finalStanding = 0;
    let count = 0;

    for (const year in _playerToFinalStanding[player]) {
      if (_playerToFinalStanding[player][year]) {
        finalStanding += _playerToFinalStanding[player][year];
        count += 1;
      }
    }

    playerToAvgFinalStanding.push({ name: player, avg: finalStanding / count });
  }

  playerToAvgFinalStanding.sort((a, b) => {
    if (a.avg < b.avg) return -1;
    return 1;
  });

  return playerToAvgFinalStanding;
}
