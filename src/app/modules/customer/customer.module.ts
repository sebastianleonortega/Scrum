import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './pages/customer/customer.component';
import {customerRoutingModule} from "@app/modules/customer/customer-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerEditFormComponent} from "@app/modules/customer/pages/customer-edit-form/customer-edit-form.component";
import { CustomerAddComponent } from './pages/customer-add/customer-add.component';




@NgModule({
  declarations: [
    CustomerComponent,
    CustomerEditFormComponent,
    CustomerAddComponent
  ],
    imports: [
        CommonModule,
        customerRoutingModule,
        ReactiveFormsModule
    ]
})
export class CustomerModule { }
