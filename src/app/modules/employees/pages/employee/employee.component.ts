import {Component, OnInit} from '@angular/core';
import {EmployeesService} from "@app/modules/employees/pages/service/employees.service";
import {Employee} from "@app/modules/employees/pages/Interface/employee";
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeEditFormComponent } from '../employee-edit-form/employee-edit-form.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  employee: Employee[] = [];
  employeeId: string= '';


  constructor(

    private employeesService: EmployeesService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeesService.getAllEmployee().subscribe(resp => {
      this.employee = resp;

    })
  }

  addEmployeeModal(): void {
    const dialogRef = this.dialog.open(EmployeeAddComponent);

    dialogRef.afterClosed().subscribe(resul =>  {
    this.getAllEmployee();

    })
  }

  editEmployeeModal(employeeId: string): void {
    const dialogRef = this.dialog.open(EmployeeEditFormComponent, {width: '500px',    data:{employeeId: employeeId }})

    dialogRef.afterClosed().subscribe( {
      next: (resp)=> {
    this.getAllEmployee();
      }
    })
  }


}
