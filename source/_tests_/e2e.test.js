describe('Basic user flow for Website', () => {
    // First, visit the lab 8 website
    beforeAll(async () => {
      await page.goto('https://group21-recipe.netlify.app/');
    });

    // Check Home Button leads to home
    it('Check home button leads to home', async () => {
        console.log('Checking Home button is functional...');
        // Click on Home Button
        
        await page.click('a[href="#home"]');
        // Expect current url to be the url to the right
        expect(page.url()).toBe("https://group21-recipe.netlify.app/#home");
    });

    // Check Fav Button leads to Fav
    it('Check Fav button leads to Fav', async () => {
        console.log('Checking Fav button is functional...');
        // Click on Fav Button
        
        await page.click('a[href="#fav"]');
        // Expect current url to be the url to the right
        expect(page.url()).toBe("https://group21-recipe.netlify.app/#fav");
    });

    // Check shopList Button leads to shopList
    it('Check shopList button leads to shopList', async () => {
        console.log('Checking shopList button is functional...');
        // Click on shopList Button
        
        await page.click('a[href="#shopList"]');
        // Expect current url to be the url to the right
        expect(page.url()).toBe("https://group21-recipe.netlify.app/#shopList");
    });

    
    // Check Search returns 30 recipe cards
    it('Check Search returns 30 recipe cards', async () => {
        console.log('Checking Search result length with "Rice"...');
        // Search up rice from Homepage
        await page.$eval('#homepage-search-bar', (el) => el.value = 'rice');
        await page.click('#homepage-search-btn');
        // 
        const numRecipes = await page.$$eval('.section-recipe-cards-wrapper > recipe-card', (recipeItems) => {
            return recipeItems.length;
        });
        expect(numRecipes).toBe(30);
    });
  });