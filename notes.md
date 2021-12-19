# Luck

A player is lucky if they have a low score but win their matchup. For example, if they have the 2nd-lowest score of the week but happen to be playing the person with the lowest score.

A player is lucky if they have a high score but lose their matchup. For example, if they have the 2nd-highest score of the week but happen to be playing the person with the highest score.

If there are n players and a player has the i-th highest score of the week:

- P(win) = (n-i)/n because there are n-i players they could play where they would win.
- P(lose) = (i-1)/n because there are i players they could play to lose.

If a player has the highest score or lowest score, their luck score is unaffected.

If a player wins, their luck score += P(lose)

If a player loses, their luck score -= P(win)
