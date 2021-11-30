// unit.test.js

/*TO DO 1:
Add functions from other js files! (e.g. ../assets/components/RecipeCard.js)
*Note: Add module.exports = { functionName, e.g.isStrongPassword, isDate, isHexColor }; to top main.js or other js files?
*/
/*Example of getting functions form main.js: 
    const functions = require('../components/recipeCard.js');
Example test:  
    test('000-000-0000 is valid', () => {
        expect(functions.isPhoneNumber('000-000-0000')).toBe(true);
    });
*/

// Examples
function sum(a,b){
    let c = a + b;
    return c;
  }
  
test('adds 1 + 2 through sum() to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});


