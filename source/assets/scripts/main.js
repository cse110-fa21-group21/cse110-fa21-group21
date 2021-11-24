// main.js

import { Router } from '../scripts/Router.js'
import { Filter } from '../scripts/filter.js'
let myStorage = window.localStorage;
const apiKey = '54a305b43853416198613d4aaaed7b01'
const searchBar = document.getElementById('homepage-search-bar')
const search = document.getElementById('homepage-search-btn')
const MAX_NUM_RECIPE_CARDS = 30
let searchQuery = ''
let baseURL = ''

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
 const recipesID = {}

 const searchQueryHistory = []
 
 // array use to keep track each functon for recipe-card
 // will act like queue using push and shift
 const funcArray = []
 
 /**
  * Constructor for router that would lead users to the home
  * page, now homepage should have nothing to be show
  * no recipecard or recipeview
  */
 const router = new Router(function () {
   document
     .querySelector('.section-recipe-cards-wrapper')
     .classList.remove('shown')
   document
     .querySelector('.section-recipe-viewers-wrapper')
     .classList.remove('shown')
 })
 
 const filter = new Filter()
 
 window.addEventListener('DOMContentLoaded', init)
 
 async function init () {
   bindSearch()
   bindState()
   filter.filtering()
   bindFavoriteList()
 }
 
 /**
  * Pulls the search query from our search bar. In the event that the search query is
  * original we call fetchAPI(Query). Otherwise, we call bindRecipeCards(searchQuery).
  * @param none
  */
 async function bindSearch () {
   searchBar.addEventListener('input', (event) => {
     searchBar.textContent = event.target.value
   })
   /**
    * bind enter on search bar to trigger a search
    */
   searchBar.addEventListener('keydown', (event) => {
     if(event.key == "Enter"){
      searchQuery = searchBar.textContent
      if (
        !searchQueryHistory.includes(searchQuery) &&
        !(searchQuery in recipesID)
      ) {
        // This is slightly flawed. We don't want to only store search history but rather by title?
        console.log('Original query, fetching data!')
        searchQueryHistory.push(searchQuery)
        baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=30&price=true`
        fetchAPI(searchQuery)
      } else {
        // All of this should be integrated into a service worker, just a thought
        console.log('Unoriginal query, no need to fetch it!')
        console.log(recipesID)
        bindRecipeCards(searchQuery)
      }
     }
   })
 
   search.addEventListener('click', () => {
     searchQuery = searchBar.textContent
     if (
       !searchQueryHistory.includes(searchQuery) &&
       !(searchQuery in recipesID)
     ) {
       // This is slightly flawed. We don't want to only store search history but rather by title?
       console.log('Original query, fetching data!')
       searchQueryHistory.push(searchQuery)
       baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=30&price=true`
       fetchAPI(searchQuery)
     } else {
       // All of this should be integrated into a service worker, just a thought
       console.log('Unoriginal query, no need to fetch it!')
       console.log(recipesID)
       bindRecipeCards(searchQuery)
     }
   })
 }
 
 /**
  * Fetches the url equivalent of query from the Spoonacular API. Adds recipes
  * to the global recipesID obj, format of entry is specified by the recipesID obj.
  * @param {string} query
  */
 async function fetchAPI (query) {
   await fetch(baseURL)
     .then((response) => response.json())
     .then((data) => {
       console.log('Query Results...')
       /**
        * data.results is the array of all results matching the query.
        * Each individual entry corresponds to a unique matching recipe
        */
       console.log(data.results)
       for (let i = 0; i < data.results.length; i++) {
         // add a new entry to the recipesID object
         recipesID[data.results[i].title] = data.results[i]
       }
     })
   bindRecipeCards(query)
   filter.filtering()
 }
 
 /**
  * function that use the router to go to the page users requested
  * it add the route for the search page into the router
  * then call the goTo method to get to that page
  * @param {string} query the string that use to determine what is going to be show or not
  */
 function bindRecipeCards (query) {
   /**
    * Add route to the router
    * Also set up the recipeCard
    */
   router.insertPage(query, function () {
     // Display the Recipe Cards Wrapper
     const recipeCardsWrapper = document.querySelector(
       '.section-recipe-cards-wrapper'
     )
     recipeCardsWrapper.classList.add('shown')
 
     // Hide the Recipe Viewers Wrapper
     const recipeViewersWrapper = document.querySelector(
       '.section-recipe-viewers-wrapper'
     )
     recipeViewersWrapper.classList.remove('shown')
 
     /** The are MAX_NUM_RECIPE_CARDS distinct recipeCard DOMs */
     let cardIndex = 0
     // An array to store recipe to be sort and display
     let recipeArray = []
     /**
      * going over the recipe object and find the corresponding recipe to display
      * put the recipe title into the array for sort
      */
     for(const recipeTitle in recipesID){
      if (recipeTitle.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
        recipeArray.push(recipeTitle);
      }
    }
   })
   router.goTo(query)
 }
 
 /**
  * function that connect each recipe-card to its recipeViewer
  * @param {HTMLElement} recipeCard the recipe-card element that use to connect to its recipeViewer
  * @param {string} pageName name of the route that should be goTo
  */
 function bindRecipeViewers (recipeCard, pageName) {
   // delete previous eventlistener that is set in last search
   if (funcArray.length === MAX_NUM_RECIPE_CARDS) {
     recipeCard.removeEventListener('click', funcArray.shift())
   }
   function event () {
     router.goTo(pageName)
   }
   recipeCard.addEventListener('click', event)
   funcArray.push(event)
 }
 
/**
 * function that connect FavoriteList button to display
 * users' favorite recipe
 */
function bindFavoriteList(){
  const favButton = document.querySelector('#favorite-list-button')
  favButton.addEventListener('click', event =>{
    for(let i = 0; i < myStorage.length; i++){
      console.log(JSON.parse(myStorage.getItem(myStorage.key(i))))
      let favoriteCard = document.createElement('recipe-card')
      let favoriteList = document.querySelector(".my-favorite-list")
      favoriteList.appendChild(favoriteCard)
      favoriteCard.data = JSON.parse(myStorage.getItem(myStorage.key(i)))
      
      bindRecipeViewers(favoriteCard, )
    }
  })
}

 /**
  * function that bind the back button
  * and the forward button
  */
 function bindState () {
   window.addEventListener('popstate', (event) => {
     if (event.state == null) {
       router.goTo('home', true)
     } else {
       console.log('Routing to page:', event.state)
       router.goTo(event.state, true)
     }
     filter.filtering()
   })
 }
 
 /**
  * Function use to sort a given array by score
  * @param {Array} recipeArray 
  */
 function sortRecipeCards (recipeArray) {
   recipeArray.sort((firstCard, secondCard) =>
     compareRecipeCards(firstCard, secondCard)
   )
 }
 
 /** COMPARISONS */
 
 /**
  * Compares two recipe-card DOMs and chooses the one with
  * the higher spoonacular score
  */
 function compareRecipeCards (firstCard, secondCard) {
   //Change the score extract firstCard and secondCard's score in to number
   const firstCardRecipeScore = Number(recipesID[firstCard].spoonacularScore)
   const secondCardRecipeScore = Number(recipesID[secondCard].spoonacularScore)
   if (firstCardRecipeScore > secondCardRecipeScore) {
     return -1
   } else if (firstCardRecipeScore < secondCardRecipeScore) {
     return 1
   } else {
     return 0
   }
 }
 
