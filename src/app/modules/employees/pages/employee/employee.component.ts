import {Component, OnInit} from '@angular/core';
import {EmployeesService} from "@app/modules/employees/pages/service/employees.service";
import {Employee} from "@app/data/interfaces/employee";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({});
  employee: Employee | any;


  constructor(
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeName: new FormControl(null, [Validators.required]),
      employeeCharge: new FormControl(null, [Validators.required]),
      employeeEmail: new FormControl(null, [Validators.required]),
      employeeKnowledge: new FormControl(null, [Validators.required]),
      employeeId: new FormControl()
    });
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeesService.getAllEmployee().subscribe(resp => {
      this.employee = resp;
      console.log(this.employee)
    })
  }

  saveEmployee() {
    if(this.employeeForm.valid) {
      const data = {
        employeeName: this.employeeForm.get('employeeName')?.value,
        employeeCharge: this.employeeForm.get('employeeCharge')?.value,
        employeeEmail: this.employeeForm.get('employeeEmail')?.value,
        employeeKnowledge: this.employeeForm.get('employeeKnowledge')?.value
      }
      this.employeesService.saveEmployee(data).subscribe(
        (resp => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Empleado creado',
            showConfirmButton: false,
            timer: 1500
          })
        this.employeeForm.reset();
        this.getAllEmployee();
      }))
    }
  }

  abrirModalEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeAddComponent);

    dialogRef.afterClosed().subscribe(resul =>  {
    })
  }


}
