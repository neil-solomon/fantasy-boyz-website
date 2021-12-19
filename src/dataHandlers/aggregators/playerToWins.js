import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import yearToMatchups from "./yearToMatchups";

export default function playerToWins(isRegluarSeason = true) {
  const _yearToPlayerStats = yearToPlayerStats();
  const _yearToMatchups = yearToMatchups();
  let playerToWins = {};

  handleLegacyData(playerToWins, isRegluarSeason, _yearToPlayerStats);

  for (const year in _yearToMatchups) {
    handleModernData(
      playerToWins,
      isRegluarSeason,
      year,
      _yearToMatchups[year]
    );
  }

  for (const player in playerToWins) {
    let totalWins = 0;
    for (const year in _yearToPlayerStats) {
      if (!playerToWins[player]?.[year]) {
        playerToWins[player][year] = null;
      } else {
        totalWins += playerToWins[player][year];
      }
    }
    playerToWins[player]["totalWins"] = totalWins;
  }

  return playerToWins;
}

function handleLegacyData(playerToWins, isRegluarSeason, _yearToPlayerStats) {
  const legacyYears = [2013, 2014, 2015, 2016, 2017];

  for (const year of legacyYears) {
    for (const player of _yearToPlayerStats[year]) {
      if (!playerToWins?.[player.name]) {
        playerToWins[player.name] = {};
      }

      if (isRegluarSeason) {
        playerToWins[player.name][year] = player.regularSeasonWins;
      } else {
        playerToWins[player.name][year] = player.playoffWins;
      }
    }
  }
}

function handleModernData(playerToWins, isRegluarSeason, year, matchups) {
  if (matchups.length === 0) return;

  for (const week of matchups) {
    if (week.length === 0) continue;

    for (const matchup of week) {
      if (
        (isRegluarSeason && matchup.isPostseason) ||
        (!isRegluarSeason && !matchup.isPlayoff)
      ) {
        continue;
      }

      let winner;
      if (matchup.player1Score > matchup.player2Score) {
        winner = matchup.player1Name;
      } else {
        winner = matchup.player2Name;
      }

      if (!playerToWins?.[winner]) {
        playerToWins[winner] = {};
      }

      if (!playerToWins[winner]?.[year]) {
        playerToWins[winner][year] = 1;
      } else {
        playerToWins[winner][year] += 1;
      }
    }
  }
}
