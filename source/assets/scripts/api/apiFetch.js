import { bindRecipeCards, Num_RecipeCards } from "../binds/bindRecipeCard.js";

import { 
  filter as filter,
  recipesID as recipesID,
  apiKey
 } from "../main.js";

/****************************************************************************
 *                      API FETCHES
 ****************************************************************************/

/**
 * Fetches the url equivalent of query from the Spoonacular API. Adds recipes
 * to the global recipesID obj, format of entry is specified by the recipesID obj.
 * @param {string} query
 */
export async function fetchAPI(query, baseURL) {
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
  console.log("apiFetch.js: fetchAPI: Num_RecipeCards: " + Num_RecipeCards);
  filter.filtering(Num_RecipeCards);
}

/**
 * Fetches random recipe. Adds recipes to the global recipesID obj,
 * format of entry is specified by the recipesID obj.
 */
export async function fetchRandomAPI() {
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
  bindRecipeCards("");
  console.log("apiFetch.js: fetchRandomAPI: Num_RecipeCards: " + Num_RecipeCards);
  filter.filtering(Num_RecipeCards);
}