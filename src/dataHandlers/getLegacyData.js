import playerStats2013 from "../data/2013/playerStats.json";
import bigGames2013 from "../data/2013/bigGames.json";
import playerStats2014 from "../data/2014/playerStats.json";
import bigGames2014 from "../data/2014/bigGames.json";
import playerStats2015 from "../data/2015/playerStats.json";
import bigGames2015 from "../data/2015/bigGames.json";
import playerStats2016 from "../data/2016/playerStats.json";
import bigGames2016 from "../data/2016/bigGames.json";
import playerStats2017 from "../data/2017/playerStats.json";
import bigGames2017 from "../data/2017/bigGames.json";

export default function getLegacyData() {
  return {
    2013: {
      playerStats: playerStats2013,
      bigGames: bigGames2013,
    },
    2014: {
      playerStats: playerStats2014,
      bigGames: bigGames2014,
    },
    2015: {
      playerStats: playerStats2015,
      bigGames: bigGames2015,
    },
    2016: {
      playerStats: playerStats2016,
      bigGames: bigGames2016,
    },
    2017: {
      playerStats: playerStats2017,
      bigGames: bigGames2017,
    },
  };
}
