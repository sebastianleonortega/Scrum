import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerInterface} from "@app/data/interfaces/customer-interface";
import {CustomerService} from "@app/modules/customer/pages/service/customer.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({});
  customer: CustomerInterface | any;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
  ) {
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      clientNit: new FormControl(null, [Validators.required]),
      clientName: new FormControl(null, [Validators.required]),
      clientId: new FormControl()
    });
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
}
