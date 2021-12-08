import { bindSearch } from "./bindSearch.js";
import { bindFeaturedRecipes } from "./bindFeatured.js";
import { bindState, bindHomeButton, bindFilterButton } from "./bindMisc.js";
import { bindFavoriteList, removeFavoriteList } from "./bindFavoriteList.js";
import { bindShoppingList, removeShoppingList } from "./bindShoppingList.js";
export default {
  bindSearch,
  bindFeaturedRecipes,
  bindState, bindHomeButton, bindFilterButton, 
  bindFavoriteList, removeFavoriteList,
  bindShoppingList, removeShoppingList
}