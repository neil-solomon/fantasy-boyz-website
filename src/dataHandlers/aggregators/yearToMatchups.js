import matchups2018 from "../aggregators/matchups2018";
import matchups2019 from "../aggregators/matchups2019";
import matchups2020 from "../aggregators/matchups2020";
import matchups2021 from "../aggregators/matchups2021";

export default function yearToMatchups() {
  return {
    2018: matchups2018(),
    2019: matchups2019(),
    2020: matchups2020(),
    2021: matchups2021(),
  };
}
