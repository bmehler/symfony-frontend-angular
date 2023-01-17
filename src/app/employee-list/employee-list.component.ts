import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { Employee } from '../shared/employee';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';

@Component({
  selector: 'es-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
    
export class EmployeeListComponent implements AfterViewInit {

  employees!: Employee[];
  employee!: Employee;

  displayedColumns = ['id', 'firstname', 'surname', 'position', 'salary', 'actions'];
  dataSource = new MatTableDataSource<Employee>();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer,private router: Router, private es: ApiService, public dialog: MatDialog) {
    router.events.subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit() {
    this.getAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAll() {
    this.es.getAllEmployees()
      .subscribe((res) => {
        //console.log(res);
        this.dataSource.data = res;
      })
  }

  deleteDialog(id: number) {
    this.es.getSingleEmployees(id)
      .subscribe(res => {
        this.employee = res
        console.log('single', this.employee);
        const dialogRef = this.dialog.open(EmployeeDeleteComponent, { data: this.employee });
        dialogRef.afterClosed().subscribe((res) => {
          console.log({ res });
          switch (res.event) {
            case "yes-option":
              console.log('Yes Clicked');
              console.log('Delete', res.data.id);
              this.es.remove(res.data).subscribe(
                res => {
                  this.getAll(),
                  this.router.navigate(['../'])
                })
              break;
            case "no-option":
              console.log('No Clicked');
              break;
            default:
              break;
          }
        });
      });
  }
}