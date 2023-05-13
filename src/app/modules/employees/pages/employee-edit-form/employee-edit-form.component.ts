import {Component, OnInit} from '@angular/core';
import {EmployeesService} from "@app/modules/employees/pages/service/employees.service";
import {ActivatedRoute, Router} from "@angular/router";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-edit-form',
  templateUrl: './employee-edit-form.component.html',
  styleUrls: ['./employee-edit-form.component.css']
})
export class EmployeeEditFormComponent implements OnInit {
  employeeEditForm: FormGroup = new FormGroup({
    employeeName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      employeeCharge: new FormControl(null, [Validators.required]),
      employeeEmail: new FormControl(null, [Validators.required, Validators.email]),
      employeeKnowledge: new FormControl(null, [Validators.required]),
      employeeId: new FormControl()
  })
  employee: any;
  id: any;

  constructor(

    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private routeurl: Router
  ) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('employeeId');
    this.getEmployeeById(this.id)
  }

  getEmployeeById(id: string | null) {
    this.employeesService.getEmployeeById(id).subscribe(resp => {
      this.employee = resp;

      this.employeeEditForm.patchValue({
        employeeName: resp.employeeName,
        employeeCharge: resp.employeeCharge,
        employeeEmail: resp.employeeEmail,
        employeeKnowledge: resp.employeeKnowledge,
      })
    })
  }


  editEmployee() {
    if (this.employeeEditForm.valid) {
      const data = {
        employeeName: this.employeeEditForm.get('employeeName')?.value,
        employeeCharge: this.employeeEditForm.get('employeeCharge')?.value,
        employeeEmail: this.employeeEditForm.get('employeeEmail')?.value,
        employeeKnowledge: this.employeeEditForm.get('employeeKnowledge')?.value,
      }

      this.employeesService.updateEmployee(this.id, data).subscribe((res) =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Empleado editado',
          showConfirmButton: false,
          timer: 1500
        }),
        this.employeeEditForm.reset();
        this.routeurl.navigateByUrl('app/employees').then();
      })

    }

  }
}
