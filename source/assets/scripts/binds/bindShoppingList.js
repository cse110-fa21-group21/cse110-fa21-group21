import{
  router as router,
  myStorage as myStorage,
  searchFilter as searchFilter
} from "../main.js" 
/****************************************************************************
 *                      SHOPPING LIST
 ****************************************************************************/
/**
 * Connects ShoppingList button to display user's shopping list
 */
export function bindShoppingList() {
  
  // MUST CHANGE 1 LINE BELOW TO: const shopButton = document.querySelector('img[alt="nav-shopping-list-icon"]');
  const shopButton = document.querySelector("#shop-list");
  shopButton.addEventListener("click", () => {
    let page = "shoppingList";
    router.insertPage(page, function () {
      removeShoppingList();
      let shoppingList = document.querySelector(".my-shopping-list");

      let homePageSearch = document.querySelector(".section-home-page");
      //Show Shopping List
      shoppingList.classList.add("shown");
      //Hide Search Filter
      searchFilter.classList.remove("shown");
      //Hide Home Page Search Bar
      homePageSearch.classList.remove("shown");
    });

    for (let i = 0; i < myStorage.length; i++) {

      //if key does not have "_SLK" it is not relevant to the shopping list.
      //Thus, we skip that element when iterating through localStorage
      if (!myStorage.key(i).includes("_SLK")) { continue; }

      if (myStorage.key(i).includes("_SLK")) {
        console.log(myStorage.key(i));
      } 

    }

    router.goTo(page);
    console.log(document.querySelector(".my-shopping-list").classList);
  });
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

