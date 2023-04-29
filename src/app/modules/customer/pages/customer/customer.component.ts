import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import {CustomerInterface} from "@app/modules/customer/pages/Interface/customer-interface";
import {CustomerService} from "@app/modules/customer/pages/service/customer.service";
import Swal from 'sweetalert2';
import { CustomerEditFormComponent } from '../customer-edit-form/customer-edit-form.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup = new FormGroup({
    clientNit: new FormControl(null, [Validators.required]),
      clientName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      clientId: new FormControl()
  });

  customer: CustomerInterface | any;
  clientNit: string = '';

  constructor(

    private customerService: CustomerService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.customerService.getAllCustomer().subscribe(resp => {
      this.customer = resp;
    })

  }

  getAllCustomer(): void{
    this.customerService.getAllCustomer().subscribe(resp => {
      this.customer = resp;
    })
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      const data = {
        clientNit: this.customerForm.get('clientNit')?.value,
        client_name: this.customerForm.get('clientName')?.value
      }
      this.customerService.saveCustomer(data).subscribe(
        () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente creado',
            showConfirmButton: false,
            timer: 1500
          })
          this.customerForm.reset();
          this.getAllCustomer();
        }
      )
    }

  }

    editCustomerModal(clientNit: string){
      const dialogRef = this.dialog.open(CustomerEditFormComponent, {width: '500px', data:{clientNit: clientNit}})
      dialogRef.afterClosed().subscribe(resp =>{

      })
    }

}
