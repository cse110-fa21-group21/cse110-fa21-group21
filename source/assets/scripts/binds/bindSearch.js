import { bindRecipeCards } from "./bindRecipeCard.js";
import { fetchAPI } from "../api/apiFetch.js";

import { 
  recipesID as recipesID,
  apiKey, searchQueryHistory
 } from "../main.js";

let searchQuery = "";
let baseURL = "";

/**
 * Pulls the search query from our search bar. In the event that the search query is
 * original we call fetchAPI(Query). Otherwise, we call bindRecipeCards(searchQuery).
 * @async
 */
export async function bindSearch() {
  await bindHomeSearch();
  await bindNavSearch();
}

/**
 * Enable Search via the HomePage
 * @async
 */
async function bindHomeSearch() {
  const homeSearchBar = document.getElementById("homepage-search-bar");
  homeSearchBar.addEventListener("input", (event) => {
    homeSearchBar.textContent = event.target.value;
  });
  const homeSearchBarBtn = document.getElementById("homepage-search-btn");
  homeSearchBarBtn.addEventListener("click", () => {
    searchQuery = homeSearchBar.textContent;
    if (
      !searchQueryHistory.includes(searchQuery) &&
      !(searchQuery in recipesID)
    ) {
      // This is slightly flawed. We don't want to only store search history but rather by title?
      console.log("Original query, fetching data!");
      searchQueryHistory.push(searchQuery);
      baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=30&price=true`;
      fetchAPI(searchQuery, baseURL);
    } else {
      // All of this should be integrated into a service worker, just a thought
      console.log("Unoriginal query, no need to fetch it!");
      console.log(recipesID);
      bindRecipeCards(searchQuery);
    }
  });
}

/**
 * Enables Seach via the SearchPage
 * @async
 */
async function bindNavSearch() {
  const navSearchBar = document.getElementById("nav-search-bar");
  navSearchBar.addEventListener("input", (event) => {
    navSearchBar.textContent = event.target.value;
  });

  const navSearchBarBtn = document.getElementById("nav-search-btn");
  navSearchBarBtn.addEventListener("click", () => {
    searchQuery = navSearchBar.textContent;
    if (
      !searchQueryHistory.includes(searchQuery) &&
      !(searchQuery in recipesID)
    ) {
      // This is slightly flawed. We don't want to only store search history but rather by title?
      console.log("Original query, fetching data!");
      searchQueryHistory.push(searchQuery);
      baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=30&price=true`;
      fetchAPI(searchQuery, baseURL);
    } else {
      // All of this should be integrated into a service worker, just a thought
      console.log("Unoriginal query, no need to fetch it!");
      console.log(recipesID);
      bindRecipeCards(searchQuery);
    }
  });
}