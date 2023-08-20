import playerStats2013 from "../../data/2013/playerStats.json";
import playerStats2014 from "../../data/2014/playerStats.json";
import playerStats2015 from "../../data/2015/playerStats.json";
import playerStats2016 from "../../data/2016/playerStats.json";
import playerStats2017 from "../../data/2017/playerStats.json";
import playerStats2018 from "../../data/2018/playerStats.json";
import playerStats2019 from "../../data/2019/playerStats.json";
import playerStats2020 from "../../data/2020/playerStats.json";
import playerStats2021 from "../../data/2021/playerStats.json";
import playerStats2022 from "../../data/2022/playerStats.json";

export default function yearToPlayerStats() {
  return {
    2013: playerStats2013,
    2014: playerStats2014,
    2015: playerStats2015,
    2016: playerStats2016,
    2017: playerStats2017,
    2018: playerStats2018,
    2019: playerStats2019,
    2020: playerStats2020,
    2021: playerStats2021,
    2022: playerStats2022,
  };
}
