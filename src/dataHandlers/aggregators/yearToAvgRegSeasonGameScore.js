import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import yearToMatchups from "./yearToMatchups";

export default function yearToAvgRegSeasonGameScore() {
  const _yearToPlayerStats = yearToPlayerStats();
  const _yearToMatchups = yearToMatchups();
  let yearToAvgRegSeasonGameScore = {};

  handleLegacyData(yearToAvgRegSeasonGameScore, _yearToPlayerStats);

  for (const year in _yearToMatchups) {
    handleModernData(yearToAvgRegSeasonGameScore, year, _yearToMatchups[year]);
  }

  return yearToAvgRegSeasonGameScore;
}

function handleLegacyData(yearToAvgRegSeasonGameScore, _yearToPlayerStats) {
  const legacyYears = [2013, 2014, 2015, 2016, 2017];

  for (const year of legacyYears) {
    let scores = 0;
    let numScores = 0;
    for (const player of _yearToPlayerStats[year]) {
      scores += player.regularSeasonPoints;
      numScores += 1;
    }
    yearToAvgRegSeasonGameScore[year] = scores / numScores / 13;
  }
}

function handleModernData(yearToAvgRegSeasonGameScore, year, matchups) {
  if (matchups.length === 0) return;

  let scores = 0;
  let numScores = 0;

  for (const week of matchups) {
    if (week.length === 0) continue;

    for (const matchup of week) {
      if (matchup.isPostseason) {
        continue;
      }

      scores += matchup.player1Score;
      scores += matchup.player2Score;
      numScores += 2;
    }
  }

  yearToAvgRegSeasonGameScore[year] = scores / numScores;
}
