import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import yearToMatchups from "./yearToMatchups";

export default function playerToWeekTopScore() {
  const _yearToPlayerStats = yearToPlayerStats();
  const _yearToMatchups = yearToMatchups();
  let playerToWeekTopScore = {};

  handleLegacyData(playerToWeekTopScore, _yearToPlayerStats);

  for (const year in _yearToMatchups) {
    handleModernData(playerToWeekTopScore, year, _yearToMatchups[year]);
  }

  for (const player in playerToWeekTopScore) {
    let totalWeekTopScore = 0;
    for (const year in _yearToPlayerStats) {
      if (!playerToWeekTopScore[player]?.[year]) {
        playerToWeekTopScore[player][year] = null;
      } else {
        totalWeekTopScore += playerToWeekTopScore[player][year];
      }
    }
    playerToWeekTopScore[player]["totalWeekTopScore"] = totalWeekTopScore;
  }

  return playerToWeekTopScore;
}

function handleLegacyData(playerToWeekTopScore, _yearToPlayerStats) {
  const legacyYears = [2013, 2014, 2015, 2016, 2017];

  for (const year of legacyYears) {
    for (const player of _yearToPlayerStats[year]) {
      if (!playerToWeekTopScore?.[player.name]) {
        playerToWeekTopScore[player.name] = {};
      }
      playerToWeekTopScore[player.name][year] = player.leadingWeeks;
    }
  }
}

function handleModernData(playerToWeekTopScore, year, matchups) {
  if (matchups.length === 0) return;

  for (const week of matchups) {
    if (week.length === 0) continue;

    let topScore = -1;
    let topPlayer = "";

    for (const matchup of week) {
      if (matchup.player1Score > topScore) {
        topScore = matchup.player1Score;
        topPlayer = matchup.player1Name;
      }
      if (matchup.player2Score > topScore) {
        topScore = matchup.player2Score;
        topPlayer = matchup.player2Name;
      }
    }

    if (!playerToWeekTopScore?.[topPlayer]) {
      playerToWeekTopScore[topPlayer] = {};
    }

    if (!playerToWeekTopScore[topPlayer]?.[year]) {
      playerToWeekTopScore[topPlayer][year] = 1;
    } else {
      playerToWeekTopScore[topPlayer][year] += 1;
    }
  }
}
