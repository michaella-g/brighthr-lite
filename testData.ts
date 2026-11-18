export interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  sendRegistrationEmail: boolean;
  phoneNumber: string;
  startDate: string; // dd/mm/yyyy
  jobTitle: string;
  fullName: string;
}

export function buildEmployee(): EmployeeData {
  // Timestamp keeps names unique across runs;
  // the random suffix separates two employees built in the same test.
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const firstName = 'Test';
  const lastName = `Auto${id}`;

  const start = new Date();
  start.setDate(start.getDate() + 7);
  const dd = String(start.getDate()).padStart(2, '0');
  const mm = String(start.getMonth() + 1).padStart(2, '0');

  return {
    firstName,
    lastName,
    email: `qa.${id}@example.com`,
    sendRegistrationEmail: true,
    phoneNumber: '07700900123',
    startDate: `${dd}/${mm}/${start.getFullYear()}`,
    jobTitle: 'QA Engineer',
    fullName: `${firstName} ${lastName}`,
  };
}
