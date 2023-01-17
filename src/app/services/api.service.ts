import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';
import { Employee } from '../shared/employee';
import { EmployeeFactory } from '../shared/employee-factory';
import { EmployeeRaw } from '../shared/employee-raw';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private api = 'http://employeeapi.local.com/api';

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.api}/employee`);
  }

  create(employee: Employee): Observable<any> {
    this.messageService.add(employee.firstname + ' ' + employee.surname + ' created!');
    return this.http
      .post(`${this.api}/employee`, employee, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getSingleEmployees(id: number): Observable<Employee> {
    return this.http
      .get<EmployeeRaw>(`${this.api}/employee/${id}`)
      .pipe(
        retry(3),
        map(rawEmployee => EmployeeFactory.fromobject(rawEmployee))
      );
  }

  update(employee: Employee): Observable<Employee> {
    this.messageService.add(employee.firstname + ' ' + employee.surname + ' updated!');
    return this.http
      .put(`${this.api}/employee/${employee.id}`, employee, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  remove(employee:Employee): Observable<any> {
    this.messageService.add(employee.firstname + ' ' + employee.surname + ' removed!');
    return this.http
      .delete(`${this.api}/employee/${employee.id}`, { responseType: 'text' })
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => new Error(error))
  }
}