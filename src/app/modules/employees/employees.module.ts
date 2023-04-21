import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeesRoutingModule} from './employees-routing.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {EmployeeComponent} from "@app/modules/employees/pages/employee/employee.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmployeeEditFormComponent } from './pages/employee-edit-form/employee-edit-form.component';
import { EmployeeAddComponent } from './pages/employee-add/employee-add.component';


@NgModule({
    declarations: [

      EmployeeComponent,
      EmployeeEditFormComponent,
      EmployeeAddComponent
    ],

    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        EmployeesRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class EmployeesModule {
}
