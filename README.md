Project to Ramp Up Automation with Playwright

Main reference document: https://playwright.dev/docs/intro


Trello Board to Track progress:
https://trello.com/b/XnPThDOn/playwright-project

Public Repo:
https://github.com/diegomuner/PlaywrightProject

How to use:

npx playwright test filename                      this runs the spec file by name
npx playwright test                               this runs all spec files
npx playwright codegen                            this opens a tool that helps creating tests by writing the locators and actions for them to be copy pasted into your class
npx playwright test filename --debug              this will run the test in debug mode




Traces - These work as recording of steps execution with screenshots
You can execute a test or tests and save the trace

See the trace: https://trace.playwright.dev/
You can also go to the folder where traces are stored and run: npx playwright show-trace trace.zip


Force trace: npx playwright test --trace on

Or also : 
    trace: 'on-first-retry'
    trace: 'on' 
in the playwright.config.ts file.



Brief explanation of the project:

- The framework uses Page Object Model. All Page classes are inside page_objects folder.
- nopomtests.spec.ts : This test class is not using the page classes, but in it I try to login with multiple sets of data from a Json file (Data Driven Test) // Also i do a beforeEach and if a condition is true i do initial navigation to the sauce labs url.
- apitests.spec.ts this is a very small test file that only does a GET to a public api, and checks one of the values of the responseBody.  Also in it, i call a function that is declared in functions.ts that also performs the get.
- saucetests.spec.ts: in here i do use the page classes to perform tests on Sauce demo site. In here i tried out "mode:serial" for the suites i have in there, sharing the page object across all tests in the suite. Also there are some individual tests.  
- demo-todo-app.spec.ts its a demo test that comes with the framework, i left it there because it can help to understand some of the concepts of Playwright.

