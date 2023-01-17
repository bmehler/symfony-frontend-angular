import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Employee } from '../shared/employee';
import { EmployeeFactory } from '../shared/employee-factory';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'es-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  constructor(private fb: FormBuilder, private es: ApiService, private router: Router, private route: ActivatedRoute) { }

  employee = EmployeeFactory.empty();

  form!: FormGroup;

  ngOnInit(): void {

    this.form = new FormGroup({
      id: new FormControl(0),
      firstname: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required])
    });
  
    const params = this.route.snapshot.params;
    this.es.getSingleEmployees(params['id']).subscribe(
      res => {
        this.employee = res;
        console.log('single', this.employee);
        this.form.patchValue({
          id: this.employee.id,
          firstname: this.employee.firstname,
          surname: this.employee.surname,
          position: this.employee.position,
          salary: this.employee.salary
        });
      }
    );
  }

  updateDetails() {
    if (this.form.valid) {
      const employee = {
        id: this.form.value.id,
        firstname: this.form.value.firstname,
        surname: this.form.value.surname,
        position: this.form.value.position,
        salary: this.form.value.salary
      }

      console.log('update', employee);

      const newEmployee = EmployeeFactory.fromobject(employee);

      console.log('newEmployee', newEmployee);
      this.es.update(newEmployee).subscribe(() => {
        this.router.navigate(['../'])
      })
    } else {
      return
    }
  }
}