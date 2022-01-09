import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import yearToMatchups from "./yearToMatchups";

export default function playerToPoints(isRegluarSeason = true) {
  const _yearToPlayerStats = yearToPlayerStats();
  const _yearToMatchups = yearToMatchups();
  let playerToPoints = {};

  handleLegacyData(playerToPoints, isRegluarSeason, _yearToPlayerStats);

  for (const year in _yearToMatchups) {
    handleModernData(
      playerToPoints,
      isRegluarSeason,
      year,
      _yearToMatchups[year]
    );
  }

  for (const player in playerToPoints) {
    let totalPoints = 0;
    for (const year in _yearToPlayerStats) {
      if (!playerToPoints[player]?.[year]) {
        playerToPoints[player][year] = null;
      } else {
        totalPoints += playerToPoints[player][year];
      }
    }
    playerToPoints[player]["totalPoints"] = totalPoints;
  }

  return playerToPoints;
}

function handleLegacyData(playerToPoints, isRegluarSeason, _yearToPlayerStats) {
  const legacyYears = [2013, 2014, 2015, 2016, 2017];

  for (const year of legacyYears) {
    for (const player of _yearToPlayerStats[year]) {
      if (!playerToPoints?.[player.name]) {
        playerToPoints[player.name] = {};
      }

      if (isRegluarSeason) {
        playerToPoints[player.name][year] = player.regularSeasonPoints;
      } else {
        playerToPoints[player.name][year] = null;
      }
    }
  }
}

function handleModernData(playerToPoints, isRegluarSeason, year, matchups) {
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

      if (!playerToPoints?.[matchup.player1Name]) {
        playerToPoints[matchup.player1Name] = {};
      }

      if (!playerToPoints[matchup.player1Name]?.[year]) {
        playerToPoints[matchup.player1Name][year] = matchup.player1Score;
      } else {
        playerToPoints[matchup.player1Name][year] += matchup.player1Score;
      }

      if (matchup.player2Name === null) {
        // this matchup a playoff bracket bye
        continue;
      }

      if (!playerToPoints?.[matchup.player2Name]) {
        playerToPoints[matchup.player2Name] = {};
      }

      if (!playerToPoints[matchup.player2Name]?.[year]) {
        playerToPoints[matchup.player2Name][year] = matchup.player2Score;
      } else {
        playerToPoints[matchup.player2Name][year] += matchup.player2Score;
      }
    }
  }
}
