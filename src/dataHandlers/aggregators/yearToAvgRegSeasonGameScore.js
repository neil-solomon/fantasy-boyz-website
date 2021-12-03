import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import matchups2018 from "../aggregators/matchups2018";
import matchups2019 from "../aggregators/matchups2019";
import matchups2020 from "../aggregators/matchups2020";
import matchups2021 from "../aggregators/matchups2021";

export default function yearToAvgRegSeasonGameScore() {
  const _yearToPlayerStats = yearToPlayerStats();
  let yearToAvgRegSeasonGameScore = {};

  handleLegacyData(yearToAvgRegSeasonGameScore, _yearToPlayerStats);
  handleModernData(yearToAvgRegSeasonGameScore, 2018, matchups2018());
  handleModernData(yearToAvgRegSeasonGameScore, 2019, matchups2019());
  handleModernData(yearToAvgRegSeasonGameScore, 2020, matchups2020());
  handleModernData(yearToAvgRegSeasonGameScore, 2021, matchups2021());

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
