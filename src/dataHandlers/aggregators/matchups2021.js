import week1 from "../../data/2021/matchups/1.json";
import week2 from "../../data/2021/matchups/2.json";
import week3 from "../../data/2021/matchups/3.json";
import week4 from "../../data/2021/matchups/4.json";
import week5 from "../../data/2021/matchups/5.json";
import week6 from "../../data/2021/matchups/6.json";
import week7 from "../../data/2021/matchups/7.json";
import week8 from "../../data/2021/matchups/8.json";
import week9 from "../../data/2021/matchups/9.json";
import week10 from "../../data/2021/matchups/10.json";
import week11 from "../../data/2021/matchups/11.json";
import week12 from "../../data/2021/matchups/12.json";
import week13 from "../../data/2021/matchups/13.json";
import week14 from "../../data/2021/matchups/14.json";
import week15 from "../../data/2021/matchups/15.json";
import week16 from "../../data/2021/matchups/16.json";
import week17 from "../../data/2021/matchups/17.json";

export default function matchups2021() {
  let latestWeek = 14;

  return [
    week1,
    week2,
    week3,
    week4,
    week5,
    week6,
    week7,
    week8,
    week9,
    week10,
    week11,
    week12,
    week13,
    week14,
    week15,
    week16,
    week17,
  ].slice(0, latestWeek);
}
