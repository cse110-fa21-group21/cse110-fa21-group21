
// E2E Test that checks code from predeploytest branch!
let MAIN_URL = 'https://predeploytest--group21-recipe.netlify.app/';

function delay(time) {
    return new Promise(function(resolve) {
       setTimeout(resolve, time)
    });
 }

describe('Basic user flow for Website', () => {
    // First, visit the lab 8 website
    beforeAll(async () => {
      await page.goto(MAIN_URL);
    });

    // 1. Check Home Button leads to home
    it('Check home button leads to home', async () => {
        console.log('Checking Home button is functional...');
        // Click on Home Button
        
        await page.$eval('img[alt="nav-home-icon"]', (el) => el.click());
        // Expect current url to be the url to the right
        expect(page.url()).toBe(MAIN_URL);
    });

    // 2. Check Fav Button leads to Fav
    it('Check Fav button leads to Fav', async () => {
        console.log('Checking Fav button is functional...');
        // Click on Fav Button
        
        //page.click() doesn't work! (That only works for buttons it seems
        await page.$eval('img[alt="nav-favorite-icon"]', (el) => el.click());
        // Expect current url to be the url to the right
        expect(page.url()).toBe(MAIN_URL + "#favoriteList");
    });

    // 3. Check shopList Button leads to shopList
    /*it('Check shopList button leads to shopList', async () => {
        console.log('Checking shopList button is functional...');
        // Click on shopList Button
        
        await page.click('button#shop-list');
        // Expect current url to be the url to the right
        expect(page.url()).toBe("https://group21-recipe.netlify.app/#shop-list");
    });*/

    
    //4. Check Search returns 30 recipe cards
    it('Check Search returns 30 recipe cards', async () => {
        console.log('Checking Search result length with "Rice"...');
        // Search up rice from Homepage
        await page.$eval('img[alt="nav-home-icon"]', (el) => el.click());
        await page.$eval('#homepage-search-bar', (el) => el.value = 'rice');
        await page.$eval('#homepage-search-btn', (el) => el.click());
         
        const numRecipes = await page.$$eval('.section-recipe-cards-wrapper > recipe-card', (recipeItems) => {
            return recipeItems.length;
        });

        //Expect returned number to be 30 recipes!
        expect(numRecipes).toBe(30);
    });
    
    //5. Check that favorite list is functional!
    it('Adding recipe to Favorite List', async () => {
        console.log('Checking favorite list add with button on RecipeCard...');
        //This delay is necessary to interact with recipe cards! (If not, it says favbtn doesn't exist!)
        await delay(1000);
        const recipeCard = await page.$('.section-recipe-cards-wrapper > recipe-card');
        //Click on favorite btn on first recipe card
        let shadowrt = await recipeCard.getProperty('shadowRoot');
        //let plainValue = await shadowrt.jsonValue();
        let favbtn = await shadowrt.asElement().$('button#fav-btn'); //shadowrt & recieCards[index] is JSHandle@node', but favbtn = null;
        await favbtn.click();
        
        

        //Go to Favorite List Page, expect 1
        await page.$eval('img[alt="nav-favorite-icon"]', (el) => el.click());
        const numRecipes = await page.$$eval('.my-favorite-list > recipe-card', (recipeCards) => {
            return recipeCards.length;
        });
        
        //Expect favorite list to have 1 recipe card now!
        expect(numRecipes).toBe(1);
    }, 10000);

    //6. Check that clicking on big "Bytes & Bites" button leads to home!
    it('Check nav-title button leads to home', async () => {
        console.log('Checking Big Nav Title button is functional...');
        
        // Click on nav-title button
        await page.$eval('img[alt="nav-title"]', (el) => el.click());
        expect(page.url()).toBe(MAIN_URL);
    });

  });