import { bindRecipeCards } from "./bindRecipeCard.js";
import { bindRecipeViewers } from "./bindRecipeViewers.js";
import { bindFavoriteList, removeFavoriteList} from "./bindFavoriteList.js";
import { bindSearch } from "./bindSearch.js";
import { bindState, bindHomeButton } from "./bindMisc.js";
import { bindShoppingList, removeShoppingList } from "./bindShoppingList.js";

export default {
  bindRecipeCards,
  bindRecipeViewers,
  bindFavoriteList, removeFavoriteList,
  bindSearch,
  bindState, bindHomeButton,
  bindShoppingList, removeShoppingList
}