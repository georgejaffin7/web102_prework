/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop over each item in the games array
    for (let game of games) {
        // Create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // Add the class game-card to the div's class list
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function using the GAMES_JSON array to initially display all games
addGamesToPage(GAMES_JSON);


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card element
const raisedCard = document.getElementById("total-raised");

// use reduce() to find the total amount raised by summing the pledged amounts
const totalPledged = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set the inner HTML using a template literal with a dollar sign
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;

// grab the number of games card element
const gamesCard = document.getElementById("num-games");

// use the length property to get the number of games
const totalGames = GAMES_JSON.length;

// set the inner HTML with the total number of games
gamesCard.innerHTML = totalGames.toLocaleString();



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // Clear the current games in the container
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of unfunded games
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Filter games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Add the funded games to the DOM
    addGamesToPage(fundedGames);
}


// show all games
function showAllGames() {
    // Remove all existing child elements in the games container
    deleteChildElements(gamesContainer);

    // Add all games from the GAMES_JSON array to the DOM
    addGamesToPage(GAMES_JSON);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners to the buttons
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// Create the display string with the correct grammar using a template literal
const displayStr = `
  A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games.
  Currently, ${numUnfundedGames} game${numUnfundedGames === 1 ? '' : 's'} 
  remain${numUnfundedGames === 1 ? 's' : ''} unfunded.
  We need your help to fund these amazing games!
`;


// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('p');

paragraph.textContent = displayStr;

descriptionContainer.appendChild(paragraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Use destructuring to grab the top two games
const [topGame, secondTopGame] = [...sortedGames];

// Create a new element for the top game
const topGameElement = document.createElement('p');
topGameElement.textContent = topGame.name;
firstGameContainer.appendChild(topGameElement);

// Create a new element for the second top game
const secondTopGameElement = document.createElement('p');
secondTopGameElement.textContent = secondTopGame.name;
secondGameContainer.appendChild(secondTopGameElement);