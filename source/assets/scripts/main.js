// main.js
import { Router } from "../scripts/Router.js";
import { Filter } from "../scripts/filter.js";

//const apiKey = "d7a805d987074402904a262f602c7844";

import { 
  default as bindings 
} from "./binds/bind.module.js";

export const apiKey = "7bfc3ea23abd447584cad24cc08dba96";

export const MAX_NUM_RECIPE_CARDS = 30;
export const NUM_FEATURED = 2;
export const searchFilter = document.querySelector(".search-filter");
export const filterToggle = document.querySelector(".filter-toggle");
export const myStorage = window.localStorage;

export const numRecipeCards = { display: 0};
//ensure we have a Shopping List in local storage
if(!myStorage.getItem("SHOPPING_LIST")){
  const intialShoppingListObj = {}
  intialShoppingListObj["Personal Shopping List"] = {}
  myStorage.setItem("SHOPPING_LIST", JSON.stringify(intialShoppingListObj))
//ensure we have a Personal Shopping List in local storage
}else if (
  !Object.keys(JSON.parse(myStorage.getItem("SHOPPING_LIST")))
         .includes("Personal Shopping List")
  ){
  const localShoppingList = JSON.parse(myStorage.getItem("SHOPPING_LIST"))
  localShoppingList["Personal Shopping List"] = {}
  myStorage.setItem("SHOPPING_LIST", JSON.stringify(localShoppingList))
}

//ensure there is a shopping list data in storage
if(!myStorage.getItem("SHOPPING_LIST_DATA")){
  myStorage.setItem("SHOPPING_LIST_DATA","{}");
}

//ensure there is a Favorite List in storage
if(!myStorage.getItem("FAVORITE_LIST")){
  myStorage.setItem("FAVORITE_LIST", "{}");
}

/**
 * Every property within the recipesID object abides by the following
 * structure: `title` and data. Together they form the property
 * {
 *   ...,
 *   'title': data,
 *   ...
 * }
 *  - @key{string} title : The recipe's title
 *  - @value{object} data: The JSON representation of a recipe as
 *                         returned by the Spoonacular API
 */
export const recipesID = {};

export const searchQueryHistory = [];

// array use to keep track each functon for recipe-card
// will act like queue using push and shift
export const funcArray = [];

/**
 * Constructor for router that would lead users to the home
 * page, now homepage should have nothing to be show
 * no recipecard or recipeview
 */
export const router = new Router(function () {
  bindings.removeFavoriteList();
  bindings.removeShoppingList();
  document.querySelector(".search-filter").classList.remove("shown");
  document.querySelector(".filter-toggle").classList.remove("shown");
  document
    .querySelector(".section-recipe-cards-wrapper")
    .classList.remove("shown");
  document
    .querySelector(".section-recipe-viewers-wrapper")
    .classList.remove("shown");
  document
    .querySelector(".section-featured-cards-wrapper")
    .classList.add("shown");
  document.querySelector(".section-home-page").classList.add("shown");
  document.querySelector(".nav-search-bar").classList.add("shown");
  document.querySelector(".my-favorite-list").classList.remove("shown");
  document.querySelector(".my-shopping-list").classList.remove("shown");
});

export const filter = new Filter();

window.addEventListener("DOMContentLoaded", init);

/**
 * Init function that runs all necessary functions at start up. 
 * Such as binding buttons!
 */
async function init() {
  await bindings.bindSearch();
  await bindings.bindFeaturedRecipes();
  bindings.bindState();
  filter.filtering();
  bindings.bindFavoriteList();
  bindings.bindShoppingList();
  bindings.bindHomeButton();
  bindings.bindFilterButton();
}
