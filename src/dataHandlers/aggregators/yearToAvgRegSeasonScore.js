import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import matchups2018 from "../aggregators/matchups2018";
import matchups2019 from "../aggregators/matchups2019";
import matchups2020 from "../aggregators/matchups2020";
import matchups2021 from "../aggregators/matchups2021";

export default function yearToAvgRegSeasonScore() {
  const _yearToPlayerStats = yearToPlayerStats();
  let yearToAvgRegSeasonScore = {};

  handleLegacyData(yearToAvgRegSeasonScore, _yearToPlayerStats);
  handleModernData(yearToAvgRegSeasonScore, 2018, matchups2018());
  handleModernData(yearToAvgRegSeasonScore, 2019, matchups2019());
  handleModernData(yearToAvgRegSeasonScore, 2020, matchups2020());
  handleModernData(yearToAvgRegSeasonScore, 2021, matchups2021());

  return yearToAvgRegSeasonScore;
}

function handleLegacyData(yearToAvgRegSeasonScore, _yearToPlayerStats) {
  const legacyYears = [2013, 2014, 2015, 2016, 2017];

  for (const year of legacyYears) {
    let scores = 0;
    let numScores = 0;
    for (const player of _yearToPlayerStats[year]) {
      scores += player.regularSeasonPoints;
      numScores += 1;
    }
    yearToAvgRegSeasonScore[year] = scores / numScores;
  }
}

function handleModernData(yearToAvgRegSeasonScore, year, matchups) {
  if (matchups.length === 0) return;

  let scores = 0;
  let numPlayers = matchups[0].length * 2;

  for (const week of matchups) {
    if (week.length === 0) continue;

    for (const matchup of week) {
      if (matchup.isPostseason) {
        continue;
      }

      scores += matchup.player1Score;
      scores += matchup.player2Score;
    }
  }

  yearToAvgRegSeasonScore[year] = scores / numPlayers;
}
