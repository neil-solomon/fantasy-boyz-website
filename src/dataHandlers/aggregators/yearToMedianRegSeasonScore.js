import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import yearToMatchups from "./yearToMatchups";

export default function yearToMedianRegSeasonScore() {
  const _yearToPlayerStats = yearToPlayerStats();
  const _yearToMatchups = yearToMatchups();
  let yearToMedianRegSeasonScore = {};

  handleLegacyData(yearToMedianRegSeasonScore, _yearToPlayerStats);

  for (const year in _yearToMatchups) {
    handleModernData(yearToMedianRegSeasonScore, year, _yearToMatchups[year]);
  }

  return yearToMedianRegSeasonScore;
}

function handleLegacyData(yearToMedianRegSeasonScore, _yearToPlayerStats) {
  const legacyYears = [2013, 2014, 2015, 2016, 2017];

  for (const year of legacyYears) {
    let scores = [];
    for (const player of _yearToPlayerStats[year]) {
      scores.push(player.regularSeasonPoints);
    }
    scores.sort();
    yearToMedianRegSeasonScore[year] =
      scores.length % 2 === 1
        ? scores[Math.floor(scores.length / 2)]
        : (scores[scores.length / 2] + scores[scores.length / 2 - 1]) / 2;
  }
}

function handleModernData(yearToMedianRegSeasonScore, year, matchups) {
  if (matchups.length === 0) return;

  let playerToScore = {};

  for (const week of matchups) {
    if (week.length === 0) continue;

    for (const matchup of week) {
      if (matchup.isPostseason) {
        continue;
      }

      if (!playerToScore[matchup.player1Name]) {
        playerToScore[matchup.player1Name] = 0;
      }
      playerToScore[matchup.player1Name] += matchup.player1Score;

      if (!playerToScore[matchup.player2Name]) {
        playerToScore[matchup.player2Name] = 0;
      }
      playerToScore[matchup.player2Name] += matchup.player2Score;
    }
  }

  let scores = [];
  for (const player in playerToScore) {
    scores.push(playerToScore[player]);
  }
  scores.sort();

  yearToMedianRegSeasonScore[year] =
    scores.length % 2 === 1
      ? scores[Math.floor(scores.length / 2)]
      : (scores[scores.length / 2] + scores[scores.length / 2 - 1]) / 2;
}
