import { bindRecipeCards } from "./bindRecipeCard.js";
import { bindRecipeViewers } from "./bindRecipeViewers.js";
import { bindFavoriteList, removeFavoriteList} from "./bindFavoriteList.js";
import { bindSearch } from "./bindSearch.js";
import { bindShoppingList, removeShoppingList } from "./bindShoppingList.js";
import { bindState, bindHomeButton } from "./bindMisc.js";

export default {
  bindRecipeCards,
  bindRecipeViewers,
  bindFavoriteList, removeFavoriteList,
  bindSearch,
  bindShoppingList, removeShoppingList,
  bindState, bindHomeButton
}