import { EmployeeFactory } from './employee-factory';

describe('EmployeeFactory', () => {
  it('should create an instance', () => {
    expect(new EmployeeFactory()).toBeTruthy();
  });
});
