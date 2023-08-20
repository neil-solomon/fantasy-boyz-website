import sys
import json


REGULAR_SEASON = "Regular"
POST_SEASON = "Post"
VALID_SEASON_VALUES = [REGULAR_SEASON]
USAGE = (
    f"USAGE: python3 parseRawMatchupData.py <year> <season>\n"
    f"\tyear must be [2022, 2023]\n"
    f"\tseason must be [{', '.join(VALID_SEASON_VALUES)}] and the coresponding file must exist; "
    f"e.g. /2022/rawRegularSeasonMatchupData.txt"
)
TEAM_NAME_TO_PLAYER_NAME = {
    "Brooklyn Butphux": "Neil",
    "PittsburghPoopsmiths": "Mark",
    "Durham Donglords": "Noah",
    "Jabroni Perogi": "Chris",
    "Boner Forever I Forever Boner": "Eric",
    "Pant Shitters United": "Jim",
    "The Vulgar raccoons": "Sean",
    "Commujizt Manfiesta": "Sean",
    "MX Mustache Rides": "Andoni"
}


def main():
    year, season = get_args()
    with open(f"./{year}/raw{season}SeasonMatchupData.txt", "r") as file:
        data = file.read()

    weeks = data.split("~~~")
    final_data = {i : [] for i in range(1, len(weeks))}

    for i, week in enumerate(weeks):
        if i == 0:
            continue

        week_data = week.split("\n")[1 : len(week)-2]
        if season == REGULAR_SEASON:
            parse_regular_season_week_data(i, week_data, final_data)

    for week in final_data:
        file_name = f"./{year}/matchups/{str(week)}.json"
        print(f"writing data to {file_name}\n{final_data[week]}\n")
        # with open(file_name, "w+") as file:
        #     json.dump(final_data[week], file)


def parse_regular_season_week_data(week, week_data, final_data):
    matchups = [
        week_data[j*9 : j*9 + 9]
        for j in range(len(week_data) // 9)
    ]
    for matchup in matchups:
        player_1_team_name = matchup[1]
        player_1_score = float(matchup[0])
        player_2_team_name = matchup[7]
        player_2_score = float(matchup[5])

        if player_1_team_name not in TEAM_NAME_TO_PLAYER_NAME:
            missing_team_name_error(player_1_team_name)

        if player_2_team_name not in TEAM_NAME_TO_PLAYER_NAME:
            missing_team_name_error(player_2_team_name)

        final_data[week].append({
            "isPostseason": False,
            "isPlayoff": False,
            "isChampionship": False,
            "player1Name": TEAM_NAME_TO_PLAYER_NAME[player_1_team_name],
            "player1Score": player_1_score,
            "player2Name": TEAM_NAME_TO_PLAYER_NAME[player_2_team_name],
            "player2Score": player_2_score
        })        


def get_args():
    if len(sys.argv) < 2:
        print(USAGE)
        sys.exit(1)

    year = sys.argv[1]
    try:
        int(year)
    except:
        print(USAGE)
        sys.exit(1)

    season = sys.argv[2] if len(sys.argv) > 2 else REGULAR_SEASON
    if season not in VALID_SEASON_VALUES:
        print(USAGE)
        sys.exit(1)

    return year, season


def missing_team_name_error(team_name):
    print(f"ERROR: Team name '{team_name}' missing from TEAM_NAME_TO_PLAYER_NAME dict")
    sys.exit(1)


if __name__ == "__main__":
    main()