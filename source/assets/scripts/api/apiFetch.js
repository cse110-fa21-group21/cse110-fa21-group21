import { 
  filter as filter,
  recipesID as recipesID,
  numRecipeCards as numRecipeCards
 } from "../main.js";

import { 
  bindRecipeCards 
} from "../binds/bindRecipeCard.js";
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
  console.log("apiFetch.js: fetchAPI: Num_RecipeCards: " + numRecipeCards);
  filter.filtering(numRecipeCards);
}
