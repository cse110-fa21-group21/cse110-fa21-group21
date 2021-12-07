// main.js
import { Router } from "../scripts/Router.js";
import { Filter } from "../scripts/filter.js";

const apiKey = "ec4a0690be5a4155b40c1525f9b8226d";

const MAX_NUM_RECIPE_CARDS = 30;
const NUM_FEATURED = 2;
const searchFilter = document.querySelector(".search-filter");
let myStorage = window.localStorage;
let searchQuery = "";
let baseURL = "";
let Num_RecipeCards = 0;
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
const recipesID = {};

const searchQueryHistory = [];

// array use to keep track each functon for recipe-card
// will act like queue using push and shift
const funcArray = [];

/**
 * Constructor for router that would lead users to the home
 * page, now homepage should have nothing to be show
 * no recipecard or recipeview
 */
const router = new Router(function () {
  removeFavoriteList();
  document.querySelector(
    ".section-featured-cards-wrapper")
  .classList.add("shown");
  document
  .querySelector(".search-filter")
  .classList.remove("shown");
  document
    .querySelector(".section-recipe-cards-wrapper")
    .classList.remove("shown");
  document
    .querySelector(".section-recipe-viewers-wrapper")
    .classList.remove("shown");
  document
    .querySelector(".section-home-page")
    .classList.add("shown");
  document
    .querySelector(".my-favorite-list")
    .classList.remove("shown");
});

const filter = new Filter();

window.addEventListener("DOMContentLoaded", init);

async function init() {
  await bindSearch();
  //await bindFeaturedRecipes();
  bindState();
  filter.filtering();
  bindFavoriteList();
  bindHomeButton();
}

/**
 * Pulls the search query from our search bar. In the event that the search query is
 * original we call fetchAPI(Query). Otherwise, we call bindRecipeCards(searchQuery).
 * @param none
 */
async function bindSearch() {
  await bindHomeSearch();
  await bindNavSearch();
}

/**
 * Enable Search via the HomePage
 */
async function bindHomeSearch() {
  const homeSearchBar = document.getElementById("homepage-search-bar");
  const homeSearchBarBtn = document.getElementById("homepage-search-btn");
  homeSearchBar.addEventListener("input", (event) => {
    homeSearchBar.textContent = event.target.value;
  });
  homeSearchBar.addEventListener("keydown", (event)=>{
    if(event.key == "Enter"){
      homeSearchBarBtn.click();
    }
  })
  homeSearchBarBtn.addEventListener("click", () => {
    searchQuery = homeSearchBar.textContent;
    if (
      !searchQueryHistory.includes(searchQuery) &&
      !(searchQuery in recipesID)
    ) {
      // This is slightly flawed. We don't want to only store search history but rather by title?
      console.log("Original query, fetching data!");
      searchQueryHistory.push(searchQuery);
      baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=30&price=true`;
      fetchAPI(searchQuery);
    } else {
      // All of this should be integrated into a service worker, just a thought
      console.log("Unoriginal query, no need to fetch it!");
      console.log(recipesID);
      bindRecipeCards(searchQuery);
    }
  });
}

/**
 * Enables Seach via the SearchPage
 * @async
 */
async function bindNavSearch() {
  const navSearchBar = document.getElementById("nav-search-bar");
  const navSearchBarBtn = document.getElementById("nav-search-btn");
  navSearchBar.addEventListener("input", (event) => {
    navSearchBar.textContent = event.target.value;
  });
  navSearchBar.addEventListener("keydown", (event) =>{
    if(event.key == "Enter"){
      navSearchBarBtn.click();
    }
  })
  navSearchBarBtn.addEventListener("click", () => {
    searchQuery = navSearchBar.textContent;
    if (
      !searchQueryHistory.includes(searchQuery) &&
      !(searchQuery in recipesID)
    ) {
      // This is slightly flawed. We don't want to only store search history but rather by title?
      console.log("Original query, fetching data!");
      searchQueryHistory.push(searchQuery);
      baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=30&price=true`;
      fetchAPI(searchQuery);
    } else {
      // All of this should be integrated into a service worker, just a thought
      console.log("Unoriginal query, no need to fetch it!");
      console.log(recipesID);
      bindRecipeCards(searchQuery);
    }
    
  });
}

/** 
* Adds featured recipes recipe cards to the home page.
* @async 
*/
async function bindFeaturedRecipes(){
    fetchRandomAPI();
}

/****************************************************************************
 *                      API FETCHES
 ****************************************************************************/

/**
 * Fetches the url equivalent of query from the Spoonacular API. Adds recipes
 * to the global recipesID obj, format of entry is specified by the recipesID obj.
 * @param {string} query
 */
async function fetchAPI(query) {
  await fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      console.log("Query Results...");
      /**
       * data.results is the array of all results matching the query.
       * Each individual entry corresponds to a unique matching recipe
       */
      console.log(data.results);
      for (let i = 0; i < data.results.length; i++) {
        // add a new entry to the recipesID object
        recipesID[data.results[i].title] = data.results[i];
      }
    });
  bindRecipeCards(query);
  filter.filtering(Num_RecipeCards);
}

/**
 * Fetches random recipe. Adds recipes to the global recipesID obj, 
 * format of entry is specified by the recipesID obj.
 */
async function fetchRandomAPI() {
  let randomURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=30&price=true&sort=random`;

  await fetch(randomURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      for (let i = 0; i < data.results.length; i++) {
        // add a new entry to the recipesID object
        recipesID[data.results[i].title] = data.results[i];
      }
    });
  // this line may lead to undefined behavior: i.e. recipe erasal
  bindFeaturedRecipeCards();
  filter.filtering(Num_RecipeCards);
}


/****************************************************************************
 *                      RECIPE CARDS
 ****************************************************************************/

/**
 * function binds the Featured Recipe Cards to the homepage
 * and binds the Featured Recipe Cards to recipe viewer.
 * it add the route for the page into the router
 */
 function bindFeaturedRecipeCards() {
    
    // Display the featured recipes wrapper
    const featuredRecipesWrapper = document.querySelector(
        ".section-featured-cards-wrapper"
    );
    featuredRecipesWrapper.classList.add("shown");

    // Get the Recipe Viewers Wrapper
    const recipeViewersWrapper = document.querySelector(
        ".section-recipe-viewers-wrapper"
    );
    
    // An array to store recipes to be sorted and displayed
    let recipeArray = [];

    for (const recipeTitle in recipesID) {
        recipeArray.push(recipeTitle);
    }

    // recipes are sorted prior to being binded to <recipe-cards>
    // the recipe with the higher score is displayed first
    sortRecipeCards(recipeArray);

    /**
     * for each recipe title inside the recipeArray
     * recipeArray[i] to access the corresponding json file in recipesID
     */

    // There are NUM_FEATURED distinct featured recipeCard DOMs on the home page
    let cardIndex = 0;
    for(let snapshot = 0; snapshot<recipeArray.length; snapshot++){
        if (cardIndex === NUM_FEATURED) break;

        const recipeCard = featuredRecipesWrapper.children[snapshot];
        recipeCard.data = recipesID[recipeArray[snapshot]];
        
        // Show the Recipe Card
        recipeCard.classList.remove("hidden");
        recipeCard.classList.add("shown");

        // Add the route that would lead users to the corresponding recipeView
        const page = recipeArray[snapshot];

        router.insertPage(page, function () {
            // Hide the Recipe Cards Wrapper
            featuredRecipesWrapper.classList.remove("shown");
            // Show the Recipe Viewers Wrapper
            recipeViewersWrapper.classList.add("shown");
            
            // Hide the homepage-section
            const homepage = document.querySelector(
                ".section-home-page"
            )
            homepage.classList.remove("shown");
            
            document.querySelector("recipe-viewer").data =
            recipesID[recipeArray[snapshot]];
        });
        bindRecipeViewers(recipeCard, page);
        
        cardIndex++;
    }
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
    // Display the Recipe Cards Wrapper
    const recipeCardsWrapper = document.querySelector(
      ".section-recipe-cards-wrapper"
    );
    recipeCardsWrapper.classList.add("shown");

    // Hide the Recipe Viewers Wrapper
    const recipeViewersWrapper = document.querySelector(
      ".section-recipe-viewers-wrapper"
    );
    recipeViewersWrapper.classList.remove("shown");

    // Display the search filter
    searchFilter.classList.add("shown");

    // Hide the homepage-section
    const homepage = document.querySelector(
      ".section-home-page"
    )
    homepage.classList.remove("shown");

    // Display navbar search bar
    const navSearchDisplay = document.querySelector(
      ".nav-search-bar"
    )
    navSearchDisplay.classList.remove("hidden");

    const favoriteList = document.querySelector(
      ".my-favorite-list"
    )

    // An array to store recipes to be sorted and displayed
    let recipeArray = [];
    

    for (const recipeTitle in recipesID) {
      // check if the recipe title contains the search query
      if (recipeTitle.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
        recipeArray.push(recipeTitle);
      } else if (query === "") {
        recipeArray.push(recipeTitle);
      }
    }
    Num_RecipeCards = recipeArray.length;
    // matching recipes are sorted prior to being binded to <recipe-card>s
    sortRecipeCards(recipeArray);

    /**
     * for each recipe title inside the sorted recipeArray
     * recipeArray[i] to access the corresponding json file in recipesID
     */

    // There are MAX_NUM_RECIPE_CARDS distinct recipeCard DOMs 
    let cardIndex = 0;
    for(let snapshot = 0; snapshot<recipeArray.length; snapshot++){
      if (cardIndex === MAX_NUM_RECIPE_CARDS) break;

      const recipeCard = recipeCardsWrapper.children[snapshot];
      recipeCard.data = recipesID[recipeArray[snapshot]];
      // Show the Recipe Card
      recipeCard.classList.remove("hidden");
      recipeCard.classList.add("shown");

      // Add the route that would lead users to the corresponding recipeView
      const page = recipeArray[snapshot];
      router.insertPage(page, function () {
        //Hide the homepage incase users do recipe-viewer -> home button -> back button
        homepage.classList.remove("shown");
        // Hide the Recipe Cards Wrapper
        recipeCardsWrapper.classList.remove("shown");
        // Show the Recipe Viewers Wrapper
        recipeViewersWrapper.classList.add("shown");
        // Hide the Filter
        searchFilter.classList.remove("shown");
        // Hide the Favorite List
        favoriteList.classList.remove("shown");
        // Pass the data from the <recipe-card> to the singular <recipe-viewer>
        document.querySelector("recipe-viewer").data =
          recipesID[recipeArray[snapshot]];
      });
      bindRecipeViewers(recipeCard, page);
      cardIndex++;
    }
    // hide the remaining unused cards
    while(cardIndex < MAX_NUM_RECIPE_CARDS){
      let recipeCard = recipeCardsWrapper.children[cardIndex];
      recipeCard.classList.remove("show");
      recipeCard.classList.add("hidden");
      console.log(recipeCard);
      console.log(recipeCard.classList);
      bindRecipeViewers(recipeCard, '');
      cardIndex++;
    }
  });
  router.goTo(query);
}
/****************************************************************************
 *                      RECIPE VIEWERS
 ****************************************************************************/

/**
 * function that connect each recipe-card to its recipeViewer
 * @param {HTMLElement} recipeCard the recipe-card element that use to connect to its recipeViewer
 * @param {string} pageName name of the route that should be goTo
 */
function bindRecipeViewers(recipeCard, pageName, state) {
  // delete previous eventlistener that is set in last search
  if (state == undefined && funcArray.length === MAX_NUM_RECIPE_CARDS) {
    recipeCard.removeEventListener("click", funcArray.shift());
  }
  function event() {
    router.goTo(pageName);
  }
  recipeCard.addEventListener("click", event);
  if(state == undefined){
    funcArray.push(event);
  }
}

/****************************************************************************
 *                        ROUTING
 ****************************************************************************/

/**
* function that bind the back button
* and the forward button
*/
function bindState () {
  window.addEventListener('popstate', (event) => {
    if (event.state == null) {
      router.goTo('home', true)
    } else {
      console.log('Routing to page:', event.state)
      router.goTo(event.state, true)
    }
    filter.filtering(Num_RecipeCards)
  })
}
/**
 * Bind Home button to navigate to home
 * 
 */
 function bindHomeButton(){
  const homeButton = document.querySelector('img[alt="nav-home-icon"]')
  homeButton.addEventListener('click', event =>{
    router.goTo('home');
  })
  const homeButton2 = document.querySelector('img[alt="nav-title"]')
  homeButton2.addEventListener('click', event =>{
    router.goTo('home');
  })
  
}

/****************************************************************************
 *                      FAVORITE LIST
 ****************************************************************************/
/**
 * Connects FavoriteList button to display user's favorite recipes
 */
 function bindFavoriteList(){
  const favButton = document.querySelector('img[alt="nav-favorite-icon"]')
  favButton.addEventListener('click', event =>{
    let page = 'favoriteList';
    router.insertPage(page, function(){
      removeFavoriteList()
      let favoriteList = document.querySelector(".my-favorite-list");
      let recipeCards = document.querySelector(".section-recipe-cards-wrapper");
      let recipeViewer = document.querySelector(".section-recipe-viewers-wrapper");
      let homePageSearch = document.querySelector(".section-home-page");
      //Show Favorite List
      favoriteList.classList.add("shown");
      //Hide Recipe Cards
      recipeCards.classList.remove("shown");
      //Hide Recipe Viewer
      recipeViewer.classList.remove("shown");
      //Hide Search Filter
      searchFilter.classList.remove("shown");
      //Hide Home Page Search Bar
      homePageSearch.classList.remove("shown");

      for(let i = 0; i < myStorage.length; i++){
        console.log(JSON.parse(myStorage.getItem(myStorage.key(i))))
        let favoriteCard = document.createElement('recipe-card')
        favoriteList.appendChild(favoriteCard)
        favoriteCard.data = JSON.parse(myStorage.getItem(myStorage.key(i)))
        let favoritePage = 'favoriteList' + myStorage.key(i);
        router.insertPage(favoritePage, function(){
          const recipeViewersWrapper = document.querySelector(".section-recipe-viewers-wrapper");
          
          searchFilter.classList.remove("shown");
          favoriteList.classList.remove("shown");
          recipeViewersWrapper.classList.add("shown");
          
          document.querySelector("recipe-viewer").data = JSON.parse(myStorage.getItem(myStorage.key(i)));
        })
        bindRecipeViewers(favoriteCard, favoritePage, true);
      }
    })
    router.goTo(page);
    console.log(document.querySelector('.my-favorite-list').classList);
  })
}

/**
 * Removes favorite list's recipe card when going back to the main page
 */
function removeFavoriteList(){
  let favoriteList = document.querySelector(".my-favorite-list")
  while(favoriteList.firstChild){
    favoriteList.removeChild(favoriteList.firstChild)
  }
}

/**************************************************************************
 *                       SORTING
 **************************************************************************/
 /**
  * Function use to sort a given array by score
  * @param {Array} recipeArray 
  */
 function sortRecipeCards (recipeArray) {
   recipeArray.sort((firstCard, secondCard) =>
     compareRecipeCards(firstCard, secondCard)
   )
 }
 
 /**
  * Compares two recipe-card DOMs and chooses the one with
  * the higher spoonacular score
  */
 function compareRecipeCards (firstCard, secondCard) {
   //Change the score extract firstCard and secondCard's score in to number
   const firstCardRecipeScore = Number(recipesID[firstCard].spoonacularScore)
   const secondCardRecipeScore = Number(recipesID[secondCard].spoonacularScore)
   if (firstCardRecipeScore > secondCardRecipeScore) {
     return -1
   } else if (firstCardRecipeScore < secondCardRecipeScore) {
     return 1
   } else {
     return 0
   }
 }