import { Component,OnInit } from '@angular/core';
import {EmployeesService} from "@app/modules/employees/pages/service/employees.service";
import {Employee} from "@app/modules/employees/pages/Interface/employee";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({});
  employee: Employee | any;

  constructor(
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
  ) {
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeName: new FormControl(null, [Validators.required]),
      employeeCharge: new FormControl(null, [Validators.required]),
      employeeEmail: new FormControl(null, [Validators.required, Validators.email]),
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
        location.reload();
      }))
    }
  }

}
