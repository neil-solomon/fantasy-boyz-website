import React from "react";
import style from "./Main.module.css";
import Menu from "./Menu";
import BumpChart from "./BumpChart";
import BarChart from "./BarChart";
import finalStanding from "../dataHandlers/charts/finalStanding";
import avgFinalStanding from "../dataHandlers/tables/avgFinalStanding";
import seasonWins from "../dataHandlers/charts/seasonWins";
import seasonPoints from "../dataHandlers/charts/seasonPoints";
import seasonWeekTopScore from "../dataHandlers/charts/seasonWeekTopScore";
import bigGames from "../dataHandlers/charts/bigGames";
import biggestGames from "../dataHandlers/tables/biggestGames";
import regSeasonPointsSeasonMedian from "../dataHandlers/tables/regSeasonPointsSeasonMedian";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewIx: 0,
    };

    this.views = [
      {
        title: "Final Standings",
        chartType: "bump",
        data: finalStanding(),
        table: {
          title: "Average Final Standing",
          columns: ["Player", "Avg"],
          data: avgFinalStanding(),
        },
      },
      {
        title: "Regular Season Wins",
        chartType: "bar",
        indexBy: "player",
        data: seasonWins(),
        keys: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
      },
      {
        title: "Playoff Wins",
        chartType: "bar",
        indexBy: "player",
        data: seasonWins(false),
        keys: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
      },
      {
        title: "Regular Season Points",
        chartType: "bar",
        indexBy: "player",
        data: seasonPoints(),
        keys: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
      },
      {
        title: "Playoff Points (2018-2021)",
        chartType: "bar",
        indexBy: "player",
        data: seasonPoints(false),
        keys: [2018, 2019, 2020, 2021],
      },
      {
        title: "Top Score Of The Week",
        description:
          "Includes playoffs, postseason consolation, and postseason bye weeks.",
        chartType: "bar",
        indexBy: "player",
        data: seasonWeekTopScore(),
        keys: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
      },
      {
        title: "Big Games",
        description:
          "A big game occurs when a players score is more than 33% higher than the average regular season score for that season. Includes playoffs, postseason consolation, and postseason bye weeks.",
        chartType: "bar",
        indexBy: "player",
        data: bigGames(),
        keys: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
        table: {
          title: "Biggest Games",
          columns: [
            "Player",
            "Score",
            "Season Avg",
            "% Above Season Avg",
            "Year",
            "Week",
          ],
          data: biggestGames(10),
        },
      },
      {
        chartType: "table",
        title: "Highest Regular Season Points Above Median",
        table: {
          columns: [
            "Player",
            "Points",
            "Season Median",
            "% Above Season Median",
            "Year",
          ],
          data: regSeasonPointsSeasonMedian(10),
        },
      },
    ];
  }

  table = (title, columns, data) => {
    return (
      <>
        {title && <div className={style.tableTitle}>{title}</div>}
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
      </>
    );
  };

  changeView = (event) => {
    this.setState({ viewIx: event.target.value });
  };

  render() {
    const data = this.views[this.state.viewIx].data;

    return (
      <div className={style.container}>
        <Menu views={this.views} changeView={this.changeView} />
        <div
          className={style.viewTitle}
          key={this.views[this.state.viewIx].title}
        >
          {this.views[this.state.viewIx].title}
        </div>
        <div
          className={style.viewDescription}
          key={this.views[this.state.viewIx].description}
        >
          {this.views[this.state.viewIx].description}
        </div>
        {this.views[this.state.viewIx].chartType !== "table" && (
          <div
            className={style.chartContainer}
            key={this.views[this.state.viewIx].chartType}
          >
            {this.views[this.state.viewIx].chartType === "bump" && (
              <>{BumpChart({ data })}</>
            )}
            {this.views[this.state.viewIx].chartType === "bar" && (
              <>
                {BarChart(
                  { data },
                  this.views[this.state.viewIx].indexBy,
                  this.views[this.state.viewIx].keys
                )}
              </>
            )}
          </div>
        )}
        {this.views[this.state.viewIx].table && (
          <div
            className={style.table}
            key={"table" + this.views[this.state.viewIx].title}
          >
            {this.table(
              this.views[this.state.viewIx].table.title,
              this.views[this.state.viewIx].table.columns,
              this.views[this.state.viewIx].table.data
            )}
          </div>
        )}
      </div>
    );
  }
}
