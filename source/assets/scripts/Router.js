/**
 * Router class use to navaiage within SPA
 * It should take in search information and lead the user to 
 * the corresponding page(set up searching result page)
 * It should take user to recipeView when user click on the recipecard
 */

export class Router{
    static routes = {};


    /**
     * Constructor set up the home function user should see the home page
     * @param {function} homeFunc that take users to home page
     */
    constructor(homeFunc){
        this['home'] = homeFunc;
    }

    /**
     * Add route to the router. Each route can take users to a specific page
     * @param {string} page the name of the route
     * @param {function} pageFunc that take users to the page they requested
     */
    insertPage(page,pageFunc){
        this[page] = pageFunc;
    }

    /**
     * Use the route go to the user requested page
     * @param {string} page the name of the route
     * @param {Boolean} state whether the route is set by click or back button
     */
    goTo(page, state){
        if(this[page] != undefined){
            let hash;
            if(page == 'home'){
                hash = ' ';
            }
            else{
                hash = '#' + page;
            }
            if((state != true) && (window.location.hash != hash)){
                console.log('push ' + hash);
                history.pushState(page,window.location.href,hash);
            }
            this[page]();
        }
        else{
            console.log('error, page not found: '+ page);
            return;
        }
    }
}
