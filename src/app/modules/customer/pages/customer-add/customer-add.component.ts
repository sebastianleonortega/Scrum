import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerInterface } from '../Interface/customer-interface';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup = new FormGroup({
    clientNit: new FormControl(null, [Validators.required]),
    clientName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    clientId: new FormControl()
  });

  customer: CustomerInterface | any;
  clientNit: string = '';

  constructor(
    private dialogRef: MatDialogRef<CustomerComponent>,
    private customerService: CustomerService,
  ){
  }
ngOnInit(): void {

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
            timer: 1500,
            toast: true,
            customClass: {
              container: 'my-swal-container',
              title: 'my-swal-title',
              icon: 'my-swal-icon',
            },
            background: '#E6F4EA',
          })
          this.customerForm.reset();
          this.dialogRef.close();
        }
      )
    }

  }
}
