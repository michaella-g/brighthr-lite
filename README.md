End to end tests for adding employees in the BrightHR Lite sandbox

### Installation 
`npm ci`\
`npm playwright install`\
`cp .env.example .env`\
Fill in `.env` with your sandbox login.

### What's covered
**Add an employee** filling in all fields\
**Add another employee**\
**Check both employees** appear in the employee list

The scenarios are kept in one test on purpose. 
Scenario 3 checks the two employees created in scenarios 1 and 2, 
so the steps depend on each other. 
Each scenario is a separate `test.step`, so the report still shows them one by one.

### Running the tests
`npx playwright test --headed`

### How it's organised
tests/\
  auth.setup.ts &emsp; &emsp; &emsp;&emsp;&emsp; Logs in once and saves the session\
  add-employee.spec.ts &emsp; The scenarios\
pages/\
  EmployeesPage.ts &emsp; &emsp; Page object for the Employees tab and the Add employee dialog\
utils/\
  testData.ts &emsp; &emsp; &emsp; &emsp;&emsp; Builds unique employee data for each run

  ### CI
  [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) runs the tests on pushes 
  and pull requests to `main`. You can also start it manually from the Actions tab.

  ### Known limitations
  - The tests create real employees in the sandbox account and don't delete them afterwards.
  - They only run in Chomium.
