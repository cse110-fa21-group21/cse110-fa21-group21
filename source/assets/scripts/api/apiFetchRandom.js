import { 
  bindFeaturedRecipeCards  
} from "../binds/bindFeatured.js";

import { 
  apiKey,
  filter as filter,
  recipesID as recipesID,
  numRecipeCards as numRecipeCards
 } from "../main.js";

/**
 * Fetches random recipe. Adds recipes to the global recipesID obj, 
 * format of entry is specified by the recipesID obj.
 */
 export async function fetchRandomAPI(url) {
  await fetch(url)
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
  filter.filtering(numRecipeCards["display"]);
}