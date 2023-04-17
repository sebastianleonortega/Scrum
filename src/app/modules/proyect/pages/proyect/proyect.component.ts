import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Proyect } from "@app/data/interfaces/proyect";
import { ProyectService } from "@app/data/services/proyect/proyect.service";
import { AreaService } from "@app/data/services/area/area.service";
import { CustomerService } from "@app/data/services/customer/customer.service";
import {ProyectAddComponent} from '@app/modules/proyect/pages/proyect-add/proyect-add.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})



export class ProyectComponent implements OnInit {

  proyectFrom: FormGroup = new FormGroup({});
  proyect: Proyect[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private proyectService: ProyectService,
    private customerService: CustomerService,
    private areaService: AreaService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.proyectService.getAllProyect().subscribe(resp => {
      resp.forEach(item => {
        this.customerService.getCustomerById(item.clientId).forEach(customer => {
          item.clientId = customer.client_name
        })
        this.areaService.getArea(item.areaId).forEach(area => {
          item.areaId = area.areaName
        })
      })
      this.proyect = resp;
    });
  }
  abrirModalProjet(): void {
    const dialogRef = this.dialog.open(ProyectAddComponent);

    dialogRef.afterClosed().subscribe(resul =>  {
    })
  }
}

