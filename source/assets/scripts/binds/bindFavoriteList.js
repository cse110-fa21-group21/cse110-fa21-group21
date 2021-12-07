import{
  router as router,
  searchFilter as searchFilter,
  myStorage as myStorage
} from "../main.js";

import{
  bindRecipeViewers
} from "./bindRecipeViewers.js";
/****************************************************************************
 *                      FAVORITE LIST
 ****************************************************************************/
/**
 * Connects FavoriteList button to display user's favorite recipes
 */
export function bindFavoriteList() {
  const favButton = document.querySelector('img[alt="nav-favorite-icon"]');
  favButton.addEventListener("click", () => {
    let page = "favoriteList";
    let numidx = 0;
    router.insertPage(page, function () {
      removeFavoriteList();
      let favoriteList = document.querySelector(".my-favorite-list");
      const shoppingList = document.querySelector(".my-shopping-list")
      const recipeCards = document.querySelector(".section-recipe-cards-wrapper");
      const recipeViewer = document.querySelector(
        ".section-recipe-viewers-wrapper"
      );
      const homePageSearch = document.querySelector(".section-home-page");
      //Show Favorite List
      favoriteList.classList.add("shown");
      //Hide Recipe Cards
      recipeCards.classList.remove("shown");
      //Hide Recipe Viewer
      recipeViewer.classList.remove("shown");
      //Hide Search Filter
      searchFilter.classList.remove("shown");
      //Hide Home Page Search Bar
      homePageSearch.classList.remove("shown");
      //Hide Shopping List
      shoppingList.classList.remove("shown")

      const localFavoriteList = JSON.parse(myStorage.getItem("FAVORITE_LIST"));
      for (const recipeTitle in localFavoriteList) {
        const favoriteCard = document.createElement("recipe-card");
        favoriteList.appendChild(favoriteCard);
        favoriteCard.data = localFavoriteList[recipeTitle]

        const favoriteButton = favoriteCard.shadowRoot.querySelector('button');
        favoriteButton.onclick = (event) => {
            event.stopPropagation();//use to stop recipecard's event listener to execute
            console.log(`Removing ${recipeTitle}: ${JSON.stringify(localFavoriteList[recipeTitle])} from favorite list...`)
            delete localFavoriteList[recipeTitle]
            favoriteCard.remove()
            myStorage.setItem("FAVORITE_LIST",JSON.stringify(localFavoriteList))
        }
        let favoritePage = "favoriteList" + recipeTitle
        router.insertPage(favoritePage, function () {
          const recipeViewersWrapper = document.querySelector(
            ".section-recipe-viewers-wrapper"
          );
          //Hide Search Filter
          searchFilter.classList.remove("shown");
          //Hide Favorite Lis
          favoriteList.classList.remove("shown");
          //Hide Shopping List
          shoppingList.classList.remove("shown")
          recipeViewersWrapper.classList.add("shown");

          document.querySelector("recipe-viewer").data = localFavoriteList[recipeTitle]
        });
        bindRecipeViewers(favoriteCard, favoritePage, true);
        numidx++;
      }
    });
    router.goTo(page);
    console.log(document.querySelector(".my-favorite-list").classList);
  });
}

/**
 * Removes favorite list's recipe card when going back to the main page
 */
export function removeFavoriteList() {
  let favoriteList = document.querySelector(".my-favorite-list");
  while (favoriteList.firstChild) {
    favoriteList.removeChild(favoriteList.firstChild);
  }
}
