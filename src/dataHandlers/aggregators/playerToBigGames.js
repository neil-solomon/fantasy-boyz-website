import yearToBigGamesLegacy from "./yearToBigGamesLegacy";
import yearToAvgRegSeasonGameScore from "./yearToAvgRegSeasonGameScore";
import yearToPlayerStats from "../aggregators/yearToPlayerStats";
import yearToMatchups from "./yearToMatchups";

export default function playerToBigGames() {
  const _yearToPlayerStats = yearToPlayerStats();
  const _yearToMatchups = yearToMatchups();
  let playerToBigGames = {};

  handleLegacyData(playerToBigGames);

  for (const year in _yearToMatchups) {
    handleModernData(playerToBigGames, year, _yearToMatchups[year]);
  }

  for (const player in playerToBigGames) {
    let totalBigGames = 0;
    for (const year in _yearToPlayerStats) {
      if (!playerToBigGames[player]?.[year]) {
        playerToBigGames[player][year] = null;
      } else {
        totalBigGames += playerToBigGames[player][year].length;
      }
    }
    playerToBigGames[player]["totalBigGames"] = totalBigGames;
  }

  return playerToBigGames;
}

function handleLegacyData(playerToBigGames) {
  const _yearToBigGamesLegacy = yearToBigGamesLegacy();

  for (const year in _yearToBigGamesLegacy) {
    for (const bigGame of _yearToBigGamesLegacy[year]) {
      addBigGame(
        playerToBigGames,
        year,
        bigGame.player,
        bigGame.week,
        bigGame.score,
        bigGame.pctAboveAvg
      );
    }
  }
}

function handleModernData(playerToBigGames, year, matchups) {
  if (matchups.length === 0) return;

  const avgScore = yearToAvgRegSeasonGameScore()[year];
  const bigGameThreshold = avgScore * 1.33;

  for (const week of matchups) {
    if (week.length === 0) continue;

    let weekNum = 1;
    for (const matchup of week) {
      if (matchup.player1Score > bigGameThreshold) {
        addBigGame(
          playerToBigGames,
          year,
          matchup.player1Name,
          weekNum,
          matchup.player1Score,
          (matchup.player1Score / avgScore - 1) * 100
        );
      }
      if (matchup.player2Score > bigGameThreshold) {
        addBigGame(
          playerToBigGames,
          year,
          matchup.player2Name,
          weekNum,
          matchup.player2Score,
          (matchup.player2Score / avgScore - 1) * 100
        );
      }
      weekNum += 1;
    }
  }
}

function addBigGame(playerToBigGames, year, player, week, score, pctAboveAvg) {
  if (!playerToBigGames?.[player]) {
    playerToBigGames[player] = {};
  }
  if (!playerToBigGames[player]?.[year]) {
    playerToBigGames[player][year] = [];
  }
  playerToBigGames[player][year].push({
    week: week,
    score: score,
    pctAboveAvg: pctAboveAvg,
  });
}
