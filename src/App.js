import "./App.css";
import BumpChart from "./components/BumpChart";
import BarChart from "./components/BarChart";
import finalStanding from "./dataHandlers/charts/finalStanding";
import avgFinalStanding from "./dataHandlers/tables/avgFinalStanding";
import seasonWins from "./dataHandlers/charts/seasonWins";
import seasonPoints from "./dataHandlers/charts/seasonPoints";
import seasonWeekTopScore from "./dataHandlers/charts/seasonWeekTopScore";
import bigGames from "./dataHandlers/charts/bigGames";
import biggestGames from "./dataHandlers/tables/biggestGames";

const bumpChart = (title, description, data) => {
  return (
    <div>
      <div style={{ marginTop: 25, fontWeight: "bold" }}>{title}</div>
      <div>{description}</div>
      <div style={{ height: "70vh", width: "90vw", paddingLeft: "5vw" }}>
        {BumpChart({ data })}
      </div>
    </div>
  );
};

const barChart = (title, description, data, indexBy, keys) => {
  return (
    <div>
      <div style={{ marginTop: 25, fontWeight: "bold" }}>{title}</div>
      <div style={{ paddingLeft: "15vw", paddingRight: "15vw" }}>
        {description}
      </div>
      <div style={{ height: "70vh", width: "90vw", paddingLeft: "5vw" }}>
        {BarChart({ data }, indexBy, keys)}
      </div>
    </div>
  );
};

const table = (columns, data) => {
  return (
    <table align="center">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((datum) => (
          <tr key={JSON.stringify(datum)}>
            {Object.values(datum).map((value) => (
              <td key={value}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  return (
    <div className="App">
      <div className="title">FANTASY BOYZ</div>
      {bumpChart("Final Standings", "", finalStanding())}
      {table(["Player", "Average Final Standing"], avgFinalStanding())}
      {barChart(
        "Regular Season Wins",
        "",
        seasonWins(),
        "player",
        [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
      )}
      {barChart(
        "Playoff Wins",
        "",
        seasonWins(false),
        "player",
        [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
      )}
      {barChart(
        "Regular Season Points",
        "",
        seasonPoints(),
        "player",
        [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
      )}
      {barChart(
        "Playoff Points (2018-2020)",
        "",
        seasonPoints(false),
        "player",
        [2018, 2019, 2020]
      )}
      {barChart(
        "Top Score Of The Week",
        "Includes playoffs, postseason consolation, and postseason bye weeks.",
        seasonWeekTopScore(),
        "player",
        [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
      )}
      {barChart(
        "Big Games",
        "A big game occurs when a players score is more than 33% higher than the average regular season score for that season. Includes playoffs, postseason consolation, and postseason bye weeks.",
        bigGames(),
        "player",
        [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
      )}
      {table(
        ["Player", "Score", "Season Avg", "% Above Season Avg", "Year", "Week"],
        biggestGames(10)
      )}
    </div>
  );
}

export default App;
