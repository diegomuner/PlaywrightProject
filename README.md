Project to Ramp Up Automation with Playwright


Trello Board to Track progress:
https://trello.com/b/XnPThDOn/playwright-project

Private Repo:
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


