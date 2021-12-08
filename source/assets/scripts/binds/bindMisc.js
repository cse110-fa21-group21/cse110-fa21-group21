import { 
  router as router, 
  filter as filter
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
    filter.filtering();
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
