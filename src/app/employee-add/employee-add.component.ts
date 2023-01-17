import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Employee } from '../shared/employee';
import { EmployeeFactory } from '../shared/employee-factory';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'es-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  
  form!: FormGroup;
  
  constructor(private fb: FormBuilder, private es: ApiService, private router: Router) { }

  employee = EmployeeFactory.empty();
  
  ngOnInit() {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]), 
      surname: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required])
    });
  }

  saveDetails() {
    if (this.form.valid) {
      const employee = {
        firstname: this.form.value.firstname,
        surname: this.form.value.surname,
        position: this.form.value.position,
        salary: this.form.value.salary
      }

      const newEmployee = EmployeeFactory.fromobject(employee);
      this.es.create(newEmployee).subscribe(res => {
        this.router.navigate(['../'])
      })
    } else {
      return
    }
  }
}
