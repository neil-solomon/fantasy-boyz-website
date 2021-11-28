import "./App.css";
import BumpChart from "./components/BumpChart";
import BarChart from "./components/BarChart";
import finalStanding from "./dataHandlers/charts/finalStanding";
import avgFinalStanding from "./dataHandlers/tables/avgFinalStanding";
import seasonWins from "./dataHandlers/charts/seasonWins";
import seasonPoints from "./dataHandlers/charts/seasonPoints";

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
      <div>{description}</div>
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
  console.log(seasonPoints());

  return (
    <div className="App">
      <div style={{ marginTop: 50 }}>FANTASY BOYZ</div>
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
    </div>
  );
}

export default App;
