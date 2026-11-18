import { Page, Locator, expect } from '@playwright/test';
import { EmployeeData } from '../utils/testData';

/*
 * Locator choice: form fields are found by their accessible labels (getByLabel),
 * matching how a user identifies them and staying stable if markup changes.
 */
export class EmployeesPage {
  readonly page: Page;
  readonly addEmployeeButton: Locator;
  readonly dialog: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly sendRegistrationEmail: Locator;
  readonly phoneNumber: Locator;
  readonly startDate: Locator;
  readonly jobTitle: Locator;
  readonly saveButton: Locator;
  readonly addAnotherButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addEmployeeButton = page.getByRole('button', { name: 'Add employee', exact: true });
    this.dialog = page.getByRole('dialog');
    this.firstName = this.dialog.getByLabel('First name');
    this.lastName = this.dialog.getByLabel('Last name');
    this.email = this.dialog.getByLabel('Email address');
    this.sendRegistrationEmail = this.dialog.getByLabel('Send registration email');
    this.phoneNumber = this.dialog.getByLabel('Phone number');
    this.startDate = this.dialog.getByLabel('Start date');
    this.jobTitle = this.dialog.getByLabel('Job title');
    this.saveButton = this.dialog.getByRole('button', { name: 'Save new employee' });
    this.addAnotherButton = this.dialog.getByRole('button', { name: 'Add another employee' });
  }

  /** Go to the Employees tab via the left-hand navigation, as the brief asks. */
  async navigateViaSideNav() {
    await this.page.goto('/dashboard');
    await this.page.locator('[data-e2e="employees"]').click();
    await expect(this.page).toHaveURL(/employee-hub/);
  }

  async openAddEmployeeForm() {
    await this.addEmployeeButton.click();
    await expect(this.dialog).toBeVisible();
  }

  async fillEmployeeForm(data: EmployeeData) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.sendRegistrationEmail.setChecked(data.sendRegistrationEmail);
    await this.phoneNumber.fill(data.phoneNumber);
    await this.startDate.fill(data.startDate);
    await this.jobTitle.fill(data.jobTitle);
  }

  async saveEmployee() {
    await this.saveButton.click();
    await expect(this.dialog.getByRole('heading', { name: 'Success! New employee added' })).toBeVisible({
      timeout: 15_000,
    });
  }

  async addAnotherEmployee(data: EmployeeData) {
    await this.addAnotherButton.click();
    await expect(this.firstName).toBeVisible();
    await this.fillEmployeeForm(data);
    await this.saveEmployee();
  }

  async addEmployee(data: EmployeeData) {
    await this.openAddEmployeeForm();
    await this.fillEmployeeForm(data);
    await this.saveEmployee();
  }

  employeeInList(fullName: string): Locator {
    return this.page.getByRole('heading', { name: fullName, exact: true });
  }
}
