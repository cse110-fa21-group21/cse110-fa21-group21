# Phase 2 Pipeline

## Diagram

![phase2diagram](./cipipeline/phase2.drawio.png)

**Push to any Branch:**

Linting:
* Uses github/super-linter for linting. 
  * Using `HTML:HTMLHint`, `CSS:stylelint`, `JS:ESLint` 
* Will display errors within Github Actions page.
* Errors are like W3Validator for HTML files!

Unit Testing: 
* Uses `Jest`

Code Quality Review:
* Using Codefactor Free Version.
* Analysis and notifications are real time
* Click on "details" to open up full analysis

**Pull Request: `predeploytest`**

E2E Testing:
* E2E Tests using `Jest-Puppeteer`
* `predeploytest` branch is basically the staging branch before full deploy.
* Need to be in this staging branch for E2E because Puppeteer requires a link, and that 
link in `e2e.test.js` is directing to Netlify Branch Deploy of `predeploytest` branch

**Pull Request: `main`**

Checks:
* Runs all 3 Checks from before: Linting, Unit Test, Code Quality Review. 
* Require all checks to pass before being able to merge

Human Review: 
* Require at least 1 teammate to approve pull request before merge
Pull Requests:  Need to pay?????
* Pull requests: Branch Protection Rules is a feature that must be paid for...
* Want there to be a requirement that the errors from linting must be all resolved before pull request can be done
* Debating about whether or not to enable required approvals (i.e. before merge at least 1 other person must approve pull request)

**Merge:**

Documentation: 
* After successful merge, Documentation is generated using `JSDoc`
* Deployed using Github Pages
