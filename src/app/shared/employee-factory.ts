import { Employee } from "./employee";
export class EmployeeFactory {

    static empty(): Employee {
        return new Employee(0, '', '', '', 0);
    }

    static fromobject(rawEmployee: any) {
        return new Employee(
            rawEmployee.id,
            rawEmployee.firstname,
            rawEmployee.surname,
            rawEmployee.position,
            rawEmployee.salary
        );
    }
}