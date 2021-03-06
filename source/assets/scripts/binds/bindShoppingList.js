import{
  myStorage as myStorage,
  router as router,
  searchFilter as searchFilter,
  filterToggle as filterToggle
} from "../main.js"
/****************************************************************************
 *                      SHOPPING CARDS
 ****************************************************************************/


/**
 * Connects Shopping button to display user's shopping Lists
 * Hide and display necessary elements.
 */
export function bindShoppingList() {
  const shopButton = document.querySelector('img[alt="nav-shopping-list-icon"]');
  shopButton.addEventListener("click",()=>{
    removeShoppingList();
    let page = "shoppingList";
    router.insertPage(page, function(){
      removeShoppingList();
      const shoppingListCardWrapper = document.querySelector(".my-shopping-list")
      const favoriteList = document.querySelector(".my-favorite-list")
      const homePageSearch = document.querySelector(".section-home-page");
      const shoppingList = JSON.parse(myStorage.getItem("SHOPPING_LIST"));
      const recipeCards = document.querySelector(".section-recipe-cards-wrapper");
      const recipeViewer = document.querySelector(
        ".section-recipe-viewers-wrapper"
      );

      //Show Shopping List
      shoppingListCardWrapper.classList.add("shown");
      //hide the filter toggle 
      filterToggle.classList.remove("shown");
      //Hide Recipe Cards
      recipeCards.classList.remove("shown");
      //Hide Recipe Viewer
      recipeViewer.classList.remove("shown");
      //Hide Search Filter
      searchFilter.classList.remove("shown");
      //Hide Home Page Search Bar
      homePageSearch.classList.remove("shown");
      //Hide Favorite List
      favoriteList.classList.remove("shown");

      for( const recipeTitle in shoppingList ) {
        if(recipeTitle === "Personal Shopping List"){
          const personalShoppingCard = document.createElement("personal-shopping-card")
          personalShoppingCard.data = recipeTitle
          shoppingListCardWrapper.appendChild(personalShoppingCard)
        }else{
          const shoppingCard = document.createElement("shopping-card")
          shoppingCard.data = recipeTitle
          shoppingListCardWrapper.appendChild(shoppingCard)
        }
      }
    });
    router.goTo(page);
  })
}

/**
 * Removes shopping list's list when going back to the main page
 */
 export function removeShoppingList() {
  let shoppingList = document.querySelector(".my-shopping-list");
  while (shoppingList.firstChild) {
    shoppingList.removeChild(shoppingList.firstChild);
  }
}