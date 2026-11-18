import { test, expect } from '@playwright/test';
import { EmployeesPage } from '../pages/EmployeesPage';
import { buildEmployee } from '../utils/testData';

/**
 * Scenarios 1-3 from the brief, as one user journey:
 * scenario 3 verifies the two employees created in scenarios 1 and 2,
 * so the steps depend on each other by design.
 */
test('add two employees and verify both are displayed', async ({ page }) => {
  const employees = new EmployeesPage(page);
  const firstEmployee = buildEmployee();
  const secondEmployee = buildEmployee();

  await test.step('Scenario 1: add an employee with all fields, including optional', async () => {
    await employees.navigateViaSideNav();
    await employees.addEmployee(firstEmployee);
  });

  await test.step('Scenario 2: add another employee', async () => {
    await employees.addAnotherEmployee(secondEmployee);
  });

  await test.step('Scenario 3: verify both employees are displayed', async () => {
    await employees.navigateViaSideNav();
    await expect(employees.employeeInList(firstEmployee.fullName)).toBeVisible();
    await expect(employees.employeeInList(secondEmployee.fullName)).toBeVisible();
  });
});
