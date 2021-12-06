import { 
  router as router,
  funcArray as funcArray,
  MAX_NUM_RECIPE_CARDS
} from "../main.js";

/****************************************************************************
 *                      RECIPE VIEWERS
 ****************************************************************************/

/**
 * function that connect each recipe-card to its recipeViewer
 * @param {HTMLElement} recipeCard the recipe-card element that use to connect to its recipeViewer
 * @param {string} pageName name of the route that should be goTo
 */
 export function bindRecipeViewers(recipeCard, pageName, state) {
  // delete previous eventlistener that is set in last search
  if (state == undefined && funcArray.length === MAX_NUM_RECIPE_CARDS) {
    recipeCard.removeEventListener("click", funcArray.shift());
  }
  function event() {
    router.goTo(pageName);
  }
  recipeCard.addEventListener("click", event);
  if (state == undefined) {
    funcArray.push(event);
  }
}