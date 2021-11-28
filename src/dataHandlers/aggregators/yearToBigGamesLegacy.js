import bigGames2013 from "../../data/2013/bigGames.json";
import bigGames2014 from "../../data/2014/bigGames.json";
import bigGames2015 from "../../data/2015/bigGames.json";
import bigGames2016 from "../../data/2016/bigGames.json";
import bigGames2017 from "../../data/2017/bigGames.json";

export default function yearToBigGamesLegacy() {
  return {
    2013: bigGames2013,
    2014: bigGames2014,
    2015: bigGames2015,
    2016: bigGames2016,
    2017: bigGames2017,
  };
}
