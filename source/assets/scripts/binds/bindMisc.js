import { 
  router as router, 
  filter as filter,
  searchFilter as searchFilter,
  numRecipeCards as numRecipeCards
} from "../main.js";
/****************************************************************************
 *                        ROUTING
 ****************************************************************************/

/**
 * function that bind the back button
 * and the forward button
 */
export function bindState() {
  window.addEventListener("popstate", (event) => {
    if (event.state == null) {
      router.goTo("home", true);
    } else {
      console.log("Routing to page:", event.state);
      router.goTo(event.state, true);
    }
    console.log("bindMisc.js: bindState: Num_RecipeCards: " + numRecipeCards["display"]);
    filter.filtering(numRecipeCards["display"]);
  });
}
/**
 * Bind Home button to navigate to home
 *
 */
export function bindHomeButton() {
  //Home Button on top left
  const homeButton = document.querySelector('img[alt="nav-home-icon"]');
  homeButton.addEventListener("click", () => {
    router.goTo("home", false);
  });
  //Bytes & Bites Button
  const homeButton2 = document.querySelector('img[alt="nav-title"]');
  homeButton2.addEventListener('click', event =>{
    router.goTo('home', false);
  })
}

/**
 * Bind Filter button to show and hide filters
 * 
 */
 export function bindFilterButton(){

  //select the actual filter icon inside the filter toggle class
   const filterButton = document.querySelector('img[alt="filter-icon"]');
  
  filterButton.addEventListener('click', event =>{

    //if filters are shown, hide them
    if(searchFilter.classList.contains("shown")){
      searchFilter.classList.remove("shown");
      filterButton.src="assets/icons/collapse-show.png";
    }
    else{ //else if filters are hidden, show them
      searchFilter.classList.add("shown");
      filterButton.src="assets/icons/collapse-hide.png";
    }
    
  })
}

