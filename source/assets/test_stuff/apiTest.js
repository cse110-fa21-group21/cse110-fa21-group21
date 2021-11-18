//apiTest.js


import {Router} from './Router.js';

const API_key = "ec4a0690be5a4155b40c1525f9b8226d";
var recipeURL = ``;
const searchBar = document.querySelector("input");
const search = document.querySelector("button");
let searchQuery = "";
var baseURL = ``;
var recipesID = {};

let searchQueryHistory = [];

//array use to keep track each functon for recipe-card
//will act like queue using push and shift
var funcArray = [];

/**
 * Constructor for router that would lead users to the home
 * page, now homepage should have nothing to be show
 * no recipecard or recipeview 
 */
const router = new Router(function (){
  document.querySelector('.section--recipe-cards').classList.remove("shown");
  document.querySelector('.section--recipe-viewers').classList.remove('shown');
})


window.addEventListener("DOMContentLoaded", init);

async function init() {
  bindSearch();
  showRecipeCards();
  showRecipeViewers();
  bindState();
}

async function bindSearch() {
  searchBar.addEventListener("input", (event) => {
    searchBar.textContent = event.target.value;
  });

  search.addEventListener("click", (event) => {
    searchQuery = searchBar.textContent;
    if (
      !searchQueryHistory.includes(searchQuery) &&
      !(searchQuery in recipesID)
    ) {
      //This is slightly flawed. We don't want to only store search history but rather by title?
      console.log("NOT IN THERE YET!");
      searchQueryHistory.push(searchQuery);
      baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_key}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=10&price=true`;
      fetchAPI(searchQuery);
    } else {
      console.log("ALREADY EXISTS NO NEED TO FETCH!");
      console.log(recipesID);
      bindRecipeCards(searchQuery);
    }
  });
}

//change make to fetchAPI to take in arg string
//this is just making it easy to keep track what is being search
//also need the string to update the url for searching
async function fetchAPI(query) {
  await fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      for (let i = 0; i < data.results.length; i++) {
        recipesID[data.results[i].title] = data.results[i];
      }
    });
  bindRecipeCards(query);
}

/**
 * function that use the router to go to the page users requested
 * it add the route for the search page into the router
 * then call the goTo method to get to that page
 * @param {string} query the string that use to determine what is going to be show or not
 */
function bindRecipeCards(query){

  /**
   * Add route to the router
   * Also set up the recipeCard
   */
  router.insertPage(query, function(){
    document.querySelector('.section--recipe-cards').classList.add("shown");
    document.querySelector('.section--recipe-viewers').classList.remove("shown");
    
    let i =0;//number iterate over recipeSection allows to set data for each recipe-card element
    /**
     * go over recipesID and determine what to display
     */
    for (const property in recipesID) {
      // RECIPE CARD TESTER
      if(property.toLocaleLowerCase().includes(query.toLocaleLowerCase())){
        
        //no longer create recipe-card but instead setting each recipe card to some value
        //see html file for recipe-card element
        //right now it only display 10
        const recipeSection = document.querySelector('.section--recipe-cards');
        let recipeCard = recipeSection.children[i];
        recipeCard.data = recipesID[property];
        recipeCard.classList.add('shown');

        //this following part added route that would lead users to the corresponding recipeView
        const page = recipesID[property].title;
        router.insertPage(page, function(){
          document.querySelector('.section--recipe-cards').classList.remove('shown');
          document.querySelector('.section--recipe-viewers').classList.add('shown');
          document.querySelector('recipe-viewer').data = recipesID[property];
        });
        bindRecipeViewers(recipeCard, page);
        i++;
      }
    }
  });
  router.goTo(query);
  //comment out not sure if sort will still work
  //sortRecipeCardsInWrapper(recipeCardsWrapper);

  
}

/**
 * function that connect each recipe-card to its recipeViewer
 * @param {HTMLElement} recipeCard the recipe-card element that use to connect to its recipeViewer
 * @param {string} pageName name of the route that should be goTo
 */
function bindRecipeViewers(recipeCard, pageName){

   //delete previous eventlistener that is set in last search
  if(funcArray.length == 10){
    recipeCard.removeEventListener('click',funcArray.shift());
  }
  function event(){
    router.goTo(pageName);
  }
  recipeCard.addEventListener('click', event);
  funcArray.push(event);
  
  // const recipeViewersWrapper = document.querySelector(".recipe-viewers--wrapper")
  // for (const property in recipesID) {
  //   // RECIPE VIEWER TESTER
  //   const recipeViewer = document.createElement("recipe-viewer");
  //   recipeViewer.data = recipesID[property];
  //   recipeViewer.classList.add('hidden');
  //   recipeViewersWrapper.appendChild(recipeViewer);
  // }
  /**
   * Spoonacular Scores need to be added to recipeViewers,
   * in order for this feature to be implemented
   * sortRecipeViewersInWrapper(recipeViewersWrapper); 
   */

}

/**
 * function that bind the back button 
 * and the forward button
 */
function bindState(){
  window.addEventListener('popstate', event =>{
    if(event.state == null){
      router.goTo('home',true);
    }
    else{
      console.log(event.state);
      router.goTo(event.state,true);
    }
  });
}

function showRecipeCards(){
  const recipeCardsBtn = document.querySelector("#recipe-cards-btn");
  recipeCardsBtn.addEventListener("click",()=>{
    /** Show the Recipe Cards */
    const recipeCards = document.querySelectorAll("recipe-card");
    recipeCards.forEach( (element) =>{
      element.classList.remove("hidden");
      element.classList.remove("shown");
    })
    /** Hide the Recipe Viewers */
    const recipeViewers = document.querySelectorAll("recipe-viewer");
    recipeViewers.forEach( (element) =>{
      element.classList.remove("hidden");
      element.classList.add("shown");
    })
  })
}

function showRecipeViewers(){
   const recipeViewersBtn = document.querySelector("#recipe-viewers-btn");
   /** Show the Recipe Viewers */
   recipeViewersBtn.addEventListener("click",()=>{
    const recipeViewers = document.querySelectorAll("recipe-viewer");
    recipeViewers.forEach( (element) =>{
      element.classList.remove("hidden");
      element.classList.add("shown");
    })
    /** Hide the Recipe Cards */
    const recipeCards = document.querySelectorAll("recipe-card");
    recipeCards.forEach( (element) =>{
      element.classList.remove("shown");
      element.classList.add("hidden");
    })
  })
}

/** SORTERS */

function sortRecipeCardsInWrapper(recipeCardsWrapper){
  const recipeCards = [];
  const indices = [];
  const nodesList = recipeCardsWrapper.childNodes;
  nodesList.forEach( (node,index) =>{
    if(node.nodeName == 'RECIPE-CARD'){
      recipeCards.push(node);
      indices.push(index);
    }
  })
  recipeCardsWrapper.innerHTML = '';
  recipeCards.sort( (firstCard,secondCard) => compareRecipeCards(firstCard,secondCard))
  recipeCards.forEach( (card) => {recipeCardsWrapper.appendChild(card);});
}

function sortRecipeViewersInWrapper(recipeViewersWrapper){
  const recipeViewers = [];
  const indices = [];
  const nodesList = recipeViewersWrapper.childNodes;
  nodesList.forEach( (node,index) =>{
    if(node.nodeName == 'RECIPE-VIEWER'){
      recipeViewers.push(node);
      indices.push(index);
    }
  })
  recipeViewersWrapper.innerHTML = '';
  recipeViewers.sort( (firstViewer,secondViewer) => compareRecipeCards(firstViewer,secondViewer))
  recipeViewers.forEach( (viewer) => {recipeCardsWrapper.appendChild(viewer);});
}

/** COMPARISONS */

/**
 * Compares two recipe-card DOMs and chooses the one with 
 * the higher spoonacular score
 */
function compareRecipeCards(firstCard,secondCard){
  //Pull the Inner Text of the 'recipe-score' div
  let firstCardRecipeScoreText  = firstCard.shadowRoot.querySelector('section').querySelector('#recipe-score').innerText;
  let secondCardRecipeScoreText  = secondCard.shadowRoot.querySelector('section').querySelector('#recipe-score').innerText;
  //Parse the Inner Text to obtain the value
  function pullValue(text){
    let slashIndex = text.indexOf('/');
    let value = text.substring(7,slashIndex) // length of 'Score: ' is 7;
    return Number(value);
  }

  let firstCardScore = pullValue(firstCardRecipeScoreText);
  let secondCardScore = pullValue(secondCardRecipeScoreText);

  if(firstCardScore > secondCardScore){
    return -1;
  }else if(firstCardScore < secondCardScore){
    return 1;
  }else{
    return 0;
  }
}

/**
 * Compares two recipe-viewer DOMs and chooses the one with 
 * the higher spoonacular score
 */
 function compareRecipeViewers(firstViewer,secondViewer){
  //Pull the Inner Text of the 'recipe-score' div
  let firstViewerRecipeScoreText  = firstViewer.shadowRoot.querySelector('section').querySelector('#recipe-score').innerText;
  let secondViewerRecipeScoreText  = secondViewer.shadowRoot.querySelector('section').querySelector('#recipe-score').innerText;
  //Parse the Inner Text to obtain the value
  function pullValue(text){
    let slashIndex = text.indexOf('/');
    let value = text.substring(7,slashIndex) // length of 'Score: ' is 7;
    return Number(value);
  }

  let firstViewerScore = pullValue(firstViewerRecipeScoreText);
  let secondViewerScore = pullValue(secondViewerRecipeScoreText);

  if(firstViewerScore > secondViewerScore){
    return -1;
  }else if(firstViewerScore < secondViewerScore){
    return 1;
  }else{
    return 0;
  }
}
