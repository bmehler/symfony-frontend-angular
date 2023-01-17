import { Component, OnInit, TemplateRef, ViewChild, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../shared/employee';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss']
})

export class EmployeeDeleteComponent {
  
  fromDialog!: string;
  employee!: Employee;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) { }

  yesDialog() {
    this.dialogRef.close({ event: 'yes-option', data: this.mydata });
  }
  noDialog() {
    this.dialogRef.close({ event: 'no-option', data: this.fromDialog });
  }
  maybeDialog() {
    this.dialogRef.close({ event: 'maybe-option', data: this.fromDialog });
  }
}
/*
export class EmployeeDeleteComponent implements OnInit {

  //constructor() { }

  ngOnInit(): void {
  }

  title = 'angular-material-dialog-app';

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  myFooList = ['Some Item', 'Item Second', 'Other In Row', 'What to write', 'Blah To Do']

  constructor(public dialog: MatDialog) { }

  openTempDialog() {
    const myTempDialog = this.dialog.open(this.dialogRef, { data: this.myFooList });
    myTempDialog.afterClosed().subscribe((res) => {

      // Data back from dialog
      console.log({ res });
    });
  }

}*/
