# Phase 1 Pipeline

## Diagram
![phase1diagram](https://github.com/cse110-fa21-group21/cse110-fa21-group21/blob/cicd/admin/cipipeline/phase1.drawio.png)

*Push = for all branches!

**Current Status**

Linting: Functional
* Uses github/super-linter for linting. Checks HTML, CSS, JS. 
* Will display errors within Github Actions page.
* Errors are like W3Validator for HTML files!

Code Quality Check: 
* Using Codefactor Free Version. (Currently in Reduced Feature Mode)
* Analysis and notifications are real time
* Statuses for GitHub pull requests
* Many tools are paid and/or its free version is only allowed for open source repositories

**In Progress**

Pull Requests: Need to pay?????
* Pull requests: Branch Protection Rules is a feature that must be paid for...
* Want there to be a requirement that the errors from linting must be all resolved before pull request can be done
* Debating about whether or not to enable required approvals (i.e. before merge at least 1 other person must approve pull request)


**Planned**

Unit Testing:
* Planning on using Jest (Since it was used in lab)

Documentation Generation:
* JSDoc
* Also, looking into ESDoc (Exploratory Programming!)

E2E Testing:
* Planning on using Jest-Puppeteer (Again, since it was used in lab)

Pixel Testing:
* Figure out how exactly to do this
* Exploratory Programming!
