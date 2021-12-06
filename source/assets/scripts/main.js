// main.js
import { Router } from "../scripts/Router.js";
import { Filter } from "../scripts/filter.js";


import { default as bindings } from "./binds/bind.js";

export const apiKey = "3672cd34bc2d43a0b4144be5a135a8c5";

export const MAX_NUM_RECIPE_CARDS = 30;
export const searchFilter = document.querySelector(".search-filter");
export const myStorage = window.localStorage;

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
  document
    .querySelector(".section-recipe-cards-wrapper")
    .classList.remove("shown");
  document
    .querySelector(".section-recipe-viewers-wrapper")
    .classList.remove("shown");
  document.querySelector(".section-home-page").classList.add("shown");
  document.querySelector(".nav-search-bar").classList.add("hidden");
  document.querySelector(".my-favorite-list").classList.remove("shown");
  document.querySelector(".my-shopping-list").classList.remove("shown");
});

export const filter = new Filter();

window.addEventListener("DOMContentLoaded", init);

async function init() {
  await bindings.bindSearch();
  bindings.bindState();
  filter.filtering();
  bindings.bindFavoriteList();
  bindings.bindShoppingList();
  bindings.bindHomeButton();
}
