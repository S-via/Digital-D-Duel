
export const getOdds = () => {
    return fetch(`https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events?apiKey=${import.meta.env.VITE_ODDS_KEY}`)
}





