/**
 * Luck will be determined by creating a probability distribution of wins for the season.
If someone has the n-th lowest score of the week (n from 1 to i), out of i players, then their win probability for that week is (n-1)/(i-1)

LuckOfNWins = Prob(N or more wins) - Prob(N or less wins)

Example:
8 players in leage
[8th lowest score, 3rd lowest score, 2nd lowest score, lowest score, 7th lowest score]
[7/7 , 3/7, 2/7, 0/7, 6/7]
Prob(0 wins) = 0
Prob(1 wins) = 1
Prob(2 wins) = 
 */
