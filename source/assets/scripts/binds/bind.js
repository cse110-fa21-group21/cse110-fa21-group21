import { bindRecipeCards } from "./bindRecipeCard.js";
import { bindRecipeViewers } from "./bindRecipeViewers.js";
import { bindFavoriteList, removeFavoriteList} from "./bindFavoriteList.js";
import { bindSearch } from "./bindSearch.js";
import { bindState, bindHomeButton, bindFilterButton } from "./bindMisc.js";
import { bindShoppingList, removeShoppingList } from "./bindShoppingList.js";

export default {
  bindRecipeCards,
  bindRecipeViewers,
  bindFavoriteList, removeFavoriteList,
  bindSearch,
  bindState, bindHomeButton, bindFilterButton,
  bindShoppingList, removeShoppingList
}