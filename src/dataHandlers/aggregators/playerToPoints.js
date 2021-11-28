import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import matchups2018 from "../aggregators/matchups2018";
import matchups2019 from "../aggregators/matchups2019";
import matchups2020 from "../aggregators/matchups2020";
import matchups2021 from "../aggregators/matchups2021";

export default function playerToPoints(isRegluarSeason = true) {
  const _yearToPlayerStats = yearToPlayerStats();
  let playerToPoints = {};

  handleLegacyData(playerToPoints, isRegluarSeason, _yearToPlayerStats);
  handleModernData(playerToPoints, isRegluarSeason, 2018, matchups2018());
  handleModernData(playerToPoints, isRegluarSeason, 2019, matchups2019());
  handleModernData(playerToPoints, isRegluarSeason, 2020, matchups2020());
  handleModernData(playerToPoints, isRegluarSeason, 2021, matchups2021());

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
