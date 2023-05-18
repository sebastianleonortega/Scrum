import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import {CustomerInterface} from "@app/modules/customer/pages/Interface/customer-interface";
import {CustomerService} from "@app/modules/customer/pages/service/customer.service";
import Swal from 'sweetalert2';
import { CustomerEditFormComponent } from '../customer-edit-form/customer-edit-form.component';
import { CustomerAddComponent } from '../customer-add/customer-add.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  customer: CustomerInterface | any;
  clientNit: string = '';

  constructor(

    private customerService: CustomerService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

   this.getAllCustomer();

  }

  getAllCustomer(): void{
    this.customerService.getAllCustomer().subscribe(resp => {
      this.customer = resp;
    })
  }

    editCustomerModal(clientNit: string){
      const dialogRef = this.dialog.open(CustomerEditFormComponent, {width: '500px', data:{clientNit: clientNit}})
      dialogRef.afterClosed().subscribe(resp =>{
        this.getAllCustomer();
      })
    }

    addCustomerModal(){
      const dialogRef = this.dialog.open(CustomerAddComponent, {width: '500px'})
      dialogRef.afterClosed().subscribe(resp =>{
        this.getAllCustomer();
      })
    }

}
