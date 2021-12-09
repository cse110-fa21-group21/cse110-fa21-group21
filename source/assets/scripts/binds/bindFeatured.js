//bindFeatured.js
import { 
    apiKey,
    NUM_FEATURED,
    recipesID as recipesID, 
    searchFilter as searchFilter,
    filterToggle as filterToggle,
    router as router
} from "../main.js";

import { 
    fetchRandomAPI
} from "../api/api.module.js";

import { 
    sortRecipeCards 
} from "./bindRecipeCard.js";

import { 
    bindRecipeViewers 
} from "./bindRecipeViewers.js";


/** 
* Adds featured recipes recipe cards to the home page.
* @async 
*/
export async function bindFeaturedRecipes(){
    const homeSearchBar = document.getElementById("homepage-search-bar");
    const searchQuery = homeSearchBar.textContent;
    const url  = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=30&price=true&sort=random`
    fetchRandomAPI(url);
}

/****************************************************************************
 *                      FEATURED RECIPE CARDS
 ****************************************************************************/

/**
 * function binds the Featured Recipe Cards to the homepage
 * and binds the Featured Recipe Cards to recipe viewer.
 * it add the route for the page into the router
 */
export function bindFeaturedRecipeCards() {
    
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
            //featuredRecipesWrapper.classList.remove("shown");
            // Show the Recipe Viewers Wrapper
            recipeViewersWrapper.classList.add("shown");
            // Hide the homepage-section
            //Hide Search Filter
            searchFilter.classList.remove("shown");
            //Hide Filter Toggle class
            filterToggle.classList.remove("shown");
            //Hide Favorite List
            const favoriteList = document.querySelector(".my-favorite-list");
            favoriteList.classList.remove("shown");
            ///Hide Shopping List
            const shoppingList = document.querySelector(".my-shopping-list");
            shoppingList.classList.remove("shown");

            // Hide the homepage-section
            const homepage = document.querySelector(".section-home-page");
            homepage.classList.remove("shown");

            // Display navbar search bar
            const navSearchDisplay = document.querySelector(".nav-search-bar");
            navSearchDisplay.classList.remove("hidden");

            document.querySelector("recipe-viewer").data =
            recipesID[recipeArray[snapshot]];
        });
        bindRecipeViewers(recipeCard, page);
        
        cardIndex++;
    }
  }
