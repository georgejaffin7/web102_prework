function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Filter games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the number of funded games to the console
    console.log(fundedGames.length);

    // Add the funded games to the DOM
    addGamesToPage(fundedGames);