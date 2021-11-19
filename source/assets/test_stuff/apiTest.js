//apiTest.js

import { Router } from "./Router.js";

const API_key = "d7a805d987074402904a262f602c7844";
const searchBar = document.querySelector("input");
const search = document.querySelector("button");
let searchQuery = "";
var baseURL = ``;

/**
 * Every property within the recipesID object abides by the following
 * structure: `title` and data. Together they form the property
 * {
 *   ...,
 *   'title': data,
 *   ...
 * }
 *  - @key{string} title : The recipe's title
 *  - @value{object} data: The JSON representation of a recipe as
 *                         returned by the Spoonacular API
 */
var recipesID = {};

let searchQueryHistory = [];

//array use to keep track each functon for recipe-card
//will act like queue using push and shift
var funcArray = [];

/**
 * Constructor for router that would lead users to the home
 * page, now homepage should have nothing to be show
 * no recipecard or recipeview
 */
const router = new Router(function () {
  document
    .querySelector(".section--recipe-cards--wrapper")
    .classList.remove("shown");
  document
    .querySelector(".section--recipe-viewers--wrapper")
    .classList.remove("shown");

  document
    .querySelector(".section--recipe-cards--wrapper")
    .classList.add("hidden");
  document
    .querySelector(".section--recipe-viewers--wrapper")
    .classList.add("hidden");
});

window.addEventListener("DOMContentLoaded", init);

async function init() {
  bindSearch();
  showRecipeCards();
  showRecipeViewers();
  bindState();
  // filtering();
}

/** ADD COMMENTS */
async function bindSearch() {
  searchBar.addEventListener("input", (event) => {
    searchBar.textContent = event.target.value;
  });

  search.addEventListener("click", () => {
    searchQuery = searchBar.textContent;
    if (
      !searchQueryHistory.includes(searchQuery) &&
      !(searchQuery in recipesID)
    ) {
      //This is slightly flawed. We don't want to only store search history but rather by title?
      console.log("Original query, fetching data!");
      searchQueryHistory.push(searchQuery);
      baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_key}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=10&price=true`;
      fetchAPI(searchQuery);
    } else {
      console.log("Unoriginal query, no need to fetch it!");
      console.log(recipesID);
      bindRecipeCards(searchQuery);
    }
  });
}

//change make to fetchAPI to take in arg string
//this is just making it easy to keep track what is being search
//also need the string to update the url for searching
async function fetchAPI(query) {
  await fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      console.log("Query Results...");
      /**
       * data.results is  array of all results matching the query.
       * Each individual entry corresponds to a unique matching recipe
       */
      console.log(data.results);
      for (let i = 0; i < data.results.length; i++) {
        //add a new entry to the recipesID object
        recipesID[data.results[i].title] = data.results[i];
      }
    });
  bindRecipeCards(query);
}

/**
 * function that use the router to go to the page users requested
 * it add the route for the search page into the router
 * then call the goTo method to get to that page
 * @param {string} query the string that use to determine what is going to be show or not
 */
function bindRecipeCards(query) {
  /**
   * Add route to the router
   * Also set up the recipeCard
   */
  router.insertPage(query, function () {
    //Display the Recipe Cards Wrapper
    const recipeCardsWrapper = document.querySelector(
      ".section--recipe-cards--wrapper"
    );
    recipeCardsWrapper.classList.remove("hidden");
    recipeCardsWrapper.classList.add("shown");

    //Hide the Recipe Viewers Wrapper
    const recipeViewersWrapper = document.querySelector(
      ".section--recipe-viewers--wrapper"
    );
    recipeViewersWrapper.classList.remove("shown");
    recipeViewersWrapper.classList.add("hidden");

    /** The are 10 distinct recipeCard DOMs */
    let cardIndex = 0;

    //for each recipe within recipesID
    for (const recipeTitle in recipesID) {
      // we display 10 cards at most
      if (cardIndex == 10) break;
      //we check if the recipe title contains the search query
      if (recipeTitle.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
        let recipeCard = recipeCardsWrapper.children[cardIndex];
        recipeCard.data = recipesID[recipeTitle];
        //Show the Recipe Card
        recipeCard.classList.remove("hidden");
        recipeCard.classList.add("shown");

        //this following part added route that would lead users to the corresponding recipeView
        const page = recipeTitle;
        router.insertPage(page, function () {
          //Hide the Recipe Cards Wrapper
          recipeCardsWrapper.classList.remove("shown");
          recipeCardsWrapper.classList.add("hidden");
          //Show the Recipe Viewers Wrapper
          recipeViewersWrapper.classList.remove("hidden");
          recipeViewersWrapper.classList.add("shown");
          //Pass the data from the <recipe-card> to the singular <recipe-viewer>
          document.querySelector("recipe-viewer").data = recipesID[recipeTitle];
        });
        bindRecipeViewers(recipeCard, page);
        cardIndex++;
      }
    }
    //hide and clear any unused cards
    while (cardIndex != 10) {
      let recipeCard = recipeCardsWrapper.children[cardIndex];
      recipeCard.data = "";
      recipeCard.classList.remove("shown");
      recipeCard.classList.add("hidden");
      cardIndex++;
    }
  });
  router.goTo(query);
  filtering();
}

/**
 * function that connect each recipe-card to its recipeViewer
 * @param {HTMLElement} recipeCard the recipe-card element that use to connect to its recipeViewer
 * @param {string} pageName name of the route that should be goTo
 */
function bindRecipeViewers(recipeCard, pageName) {
  //delete previous eventlistener that is set in last search
  if (funcArray.length == 10) {
    recipeCard.removeEventListener("click", funcArray.shift());
  }
  function event() {
    router.goTo(pageName);
    filtering();
  }
  recipeCard.addEventListener("click", event);
  funcArray.push(event);
}

/**
 * function that bind the back button
 * and the forward button
 */
function bindState() {
  window.addEventListener("popstate", (event) => {
    if (event.state == null) {
      router.goTo("home", true);
      filtering();
    } else {
      console.log("Routing to page:", event.state);
      router.goTo(event.state, true);
      filtering();
    }
  });
}

function showRecipeCards() {
  const recipeCardsBtn = document.querySelector("#recipe-cards-btn");
  recipeCardsBtn.addEventListener("click", () => {
    /** Show the Recipe Cards */
    const recipeCards = document.querySelectorAll("recipe-card");
    recipeCards.forEach((element) => {
      element.classList.remove("hidden");
      element.classList.add("shown");
    });
    /** Hide the Recipe Viewers */
    const recipeViewers = document.querySelectorAll("recipe-viewer");
    recipeViewers.forEach((element) => {
      element.classList.remove("shown");
      element.classList.add("hidden");
    });
  });
}

function showRecipeViewers() {
  const recipeViewersBtn = document.querySelector("#recipe-viewers-btn");
  /** Show the Recipe Viewers */
  recipeViewersBtn.addEventListener("click", () => {
    const recipeViewers = document.querySelectorAll("recipe-viewer");
    recipeViewers.forEach((element) => {
      element.classList.remove("hidden");
      element.classList.add("shown");
    });
    /** Hide the Recipe Cards */
    const recipeCards = document.querySelectorAll("recipe-card");
    recipeCards.forEach((element) => {
      element.classList.remove("shown");
      element.classList.add("hidden");
    });
  });
}

/*********************************************************
                CURRENTLY NOT INTEGRATED
 ********************************************************/

function sortRecipeCardsInWrapper(recipeCardsWrapper) {
  const recipeCards = [];
  const indices = [];
  const nodesList = recipeCardsWrapper.childNodes;
  nodesList.forEach((node, index) => {
    if (node.nodeName == "RECIPE-CARD") {
      recipeCards.push(node);
      indices.push(index);
    }
  });
  recipeCardsWrapper.innerHTML = "";
  recipeCards.sort((firstCard, secondCard) =>
    compareRecipeCards(firstCard, secondCard)
  );
  recipeCards.forEach((card) => {
    recipeCardsWrapper.appendChild(card);
  });
}

function sortRecipeViewersInWrapper(recipeViewersWrapper) {
  const recipeViewers = [];
  const indices = [];
  const nodesList = recipeViewersWrapper.childNodes;
  nodesList.forEach((node, index) => {
    if (node.nodeName == "RECIPE-VIEWER") {
      recipeViewers.push(node);
      indices.push(index);
    }
  });
  recipeViewersWrapper.innerHTML = "";
  recipeViewers.sort((firstViewer, secondViewer) =>
    compareRecipeViewers(firstViewer, secondViewer)
  );
  recipeViewers.forEach((viewer) => {
    recipeViewersWrapper.appendChild(viewer);
  });
}

/** COMPARISONS */

/**
 * Compares two recipe-card DOMs and chooses the one with
 * the higher spoonacular score
 */
function compareRecipeCards(firstCard, secondCard) {
  //Pull the Inner Text of the 'recipe-score' div
  let firstCardRecipeScoreText = firstCard.shadowRoot
    .querySelector("section")
    .querySelector("#recipe-score").innerText;
  let secondCardRecipeScoreText = secondCard.shadowRoot
    .querySelector("section")
    .querySelector("#recipe-score").innerText;
  //Parse the Inner Text to obtain the value
  function pullValue(text) {
    let slashIndex = text.indexOf("/");
    let value = text.substring(7, slashIndex); // length of 'Score: ' is 7;
    return Number(value);
  }

  let firstCardScore = pullValue(firstCardRecipeScoreText);
  let secondCardScore = pullValue(secondCardRecipeScoreText);

  if (firstCardScore > secondCardScore) {
    return -1;
  } else if (firstCardScore < secondCardScore) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * Compares two recipe-viewer DOMs and chooses the one with
 * the higher spoonacular score
 */
function compareRecipeViewers(firstViewer, secondViewer) {
  //Pull the Inner Text of the 'recipe-score' div
  let firstViewerRecipeScoreText = firstViewer.shadowRoot
    .querySelector("section")
    .querySelector("#recipe-score").innerText;
  let secondViewerRecipeScoreText = secondViewer.shadowRoot
    .querySelector("section")
    .querySelector("#recipe-score").innerText;
  //Parse the Inner Text to obtain the value
  function pullValue(text) {
    let slashIndex = text.indexOf("/");
    let value = text.substring(7, slashIndex); // length of 'Score: ' is 7;
    return Number(value);
  }

  let firstViewerScore = pullValue(firstViewerRecipeScoreText);
  let secondViewerScore = pullValue(secondViewerRecipeScoreText);

  if (firstViewerScore > secondViewerScore) {
    return -1;
  } else if (firstViewerScore < secondViewerScore) {
    return 1;
  } else {
    return 0;
  }
}

// Filters
