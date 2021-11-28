import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import matchups2018 from "../aggregators/matchups2018";
import matchups2019 from "../aggregators/matchups2019";
import matchups2020 from "../aggregators/matchups2020";
import matchups2021 from "../aggregators/matchups2021";

export default function playerToWeekTopScore() {
  const _yearToPlayerStats = yearToPlayerStats();
  let playerToWeekTopScore = {};

  handleLegacyData(playerToWeekTopScore, _yearToPlayerStats);
  handleModernData(playerToWeekTopScore, 2018, matchups2018());
  handleModernData(playerToWeekTopScore, 2019, matchups2019());
  handleModernData(playerToWeekTopScore, 2020, matchups2020());
  handleModernData(playerToWeekTopScore, 2021, matchups2021());

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
