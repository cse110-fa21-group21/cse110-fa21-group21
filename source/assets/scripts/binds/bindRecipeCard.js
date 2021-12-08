import { bindRecipeViewers } from "./bindRecipeViewers.js";
import { 
  router as router,
  recipesID as recipesID,
  searchFilter as searchFilter,
  filterToggle as filterToggle,
  numRecipeCards as numRecipeCards,
  MAX_NUM_RECIPE_CARDS,
} from "../main.js";

/****************************************************************************
 *                      RECIPE CARDS
 ****************************************************************************/

/**
 * function that use the router to go to the page users requested
 * it add the route for the search page into the router
 * then call the goTo method to get to that page
 * @param {string} query the string that use to determine what is going to be show or not
 */
 export function bindRecipeCards(query) {
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

    //Display the filter toggle class
    filterToggle.classList.add("shown");

    ///Hide Shopping List
    const shoppingList = document.querySelector(".my-shopping-list");
    shoppingList.classList.remove("shown");

    // Hide the homepage-section
    const homepage = document.querySelector(".section-home-page");
    homepage.classList.remove("shown");

    // Display navbar search bar
    const navSearchDisplay = document.querySelector(".nav-search-bar");
    navSearchDisplay.classList.remove("hidden");

    const favoriteList = document.querySelector(".my-favorite-list");

    // An array to store recipe to be sort and display
    let recipeArray = [];

    for (const recipeTitle in recipesID) {
      // we check if the recipe title contains the search query
      if (recipeTitle.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
        recipeArray.push(recipeTitle);
      } else if (query === "") {
        recipeArray.push(recipeTitle);
      }
    }
    //Num_RecipeCards = Math.min(recipeArray.length, 30);
    numRecipeCards["display"] = Math.min(recipeArray.length, MAX_NUM_RECIPE_CARDS);
    //console.log("bindRecipeCard.js: Initialize: Num_RecipeCards: " + numRecipeCards["display"]);
    // matching recipes are sorted prior to being binded to <recipe-card>s
    sortRecipeCards(recipeArray);

    /**
     * for each recipe title inside the sorted recipeArray
     * recipeArray[i] to access the corresponding json file in recipesID
     */

    // There are MAX_NUM_RECIPE_CARDS distinct recipeCard DOMs
    let cardIndex = 0;
    for (let snapshot = 0; snapshot < recipeArray.length; snapshot++) {
      if (cardIndex === MAX_NUM_RECIPE_CARDS) break;

      const recipeCard = recipeCardsWrapper.children[snapshot];
      recipeCard.data = recipesID[recipeArray[snapshot]];
      // Show the Recipe Card
      recipeCard.classList.remove("hidden");
      recipeCard.classList.add("shown");

      // Add the route that would lead users to the corresponding recipeView
      const page = recipeArray[snapshot];
      router.insertPage(page, function () {
        // Hide the Recipe Cards Wrapper
        recipeCardsWrapper.classList.remove("shown");
        // Show the Recipe Viewers Wrapper
        recipeViewersWrapper.classList.add("shown");
        //Hide the Filter Toggle Class
        filterToggle.classList.remove("shown");
        ///Hide Shopping List
        shoppingList.classList.remove("shown");
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
    while (cardIndex < MAX_NUM_RECIPE_CARDS) {
      const recipeCardsWrapper = document.querySelector(
        ".section-recipe-cards-wrapper"
      );

      let recipeCard = recipeCardsWrapper.children[cardIndex];
      recipeCard.classList.remove("shown");
      recipeCard.classList.add("hidden");

      bindRecipeViewers(recipeCard, "");
      cardIndex++;
    }
  });
  router.goTo(query);
}

/**************************************************************************
 *                       SORTING
 **************************************************************************/
/**
 * Function use to sort a given array by score
 * @param {Array} recipeArray
 */
export function sortRecipeCards(recipeArray) {
  recipeArray.sort((firstCard, secondCard) =>
    compareRecipeCards(firstCard, secondCard)
  );
}

/**
 * Compares two recipe-card DOMs and chooses the one with
 * the higher spoonacular score
 */
function compareRecipeCards(firstCard, secondCard) {
  //Change the score extract firstCard and secondCard's score in to number
  const firstCardRecipeScore = Number(recipesID[firstCard].spoonacularScore);
  const secondCardRecipeScore = Number(recipesID[secondCard].spoonacularScore);
  if (firstCardRecipeScore > secondCardRecipeScore) {
    return -1;
  } else if (firstCardRecipeScore < secondCardRecipeScore) {
    return 1;
  } else {
    return 0;
  }
}