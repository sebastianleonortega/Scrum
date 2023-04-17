import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "@app/data/services/customer/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-edit-form',
  templateUrl: './customer-edit-form.component.html',
  styleUrls: ['./customer-edit-form.component.css']
})
export class CustomerEditFormComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({});
  customer: any;
  id: any;


  constructor(
    public formBuilder: FormBuilder,
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private route1: Router
      ) {
  }

  ngOnInit(): void {

    this.customerForm = this.formBuilder.group({
      clientNit: new FormControl(null, [Validators.required]),
      clientName: new FormControl(null, [Validators.required])
    });
    this.id = this.route.snapshot.paramMap.get('clientId');
    this.getCustomerById(this.id)

  }

  getCustomerById(id: string | null) {
    this.customerService.getCustomerById(id).subscribe(resp => {
      this.customer = resp;
      this.customerForm.patchValue({
        clientNit: this.customer.clientNit,
        clientName: this.customer.clientName
      });
    })
  }

  edit() {
    if (this.customerForm.valid){
      const data ={
        clientNit:this.customerForm.get('clientNit')?.value,
        clientName:this.customerForm.get('clientName')?.value,
      }
      this.customerService.updateCustomer(this.id,data).subscribe(
        (resp) =>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente aditado',
            showConfirmButton: false,
            timer: 1500
          })
          this.customerForm.reset();
          this.route1.navigateByUrl('app/customer').then();
        },);
    }
  }
}
