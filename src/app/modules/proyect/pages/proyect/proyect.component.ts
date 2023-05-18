import { Component, OnInit } from '@angular/core';
import { Proyect } from "@app/modules/proyect/pages/Interface/proyect";
import { ProjectService } from '../service/project.service';
import { AreaService } from '@app/modules/area/pages/service/area.service';
import { CustomerService } from "@app/modules/customer/pages/service/customer.service";
import {ProyectAddComponent} from '@app/modules/proyect/pages/proyect-add/proyect-add.component';
import {MatDialog} from '@angular/material/dialog';
import { ProyectEditComponent } from '../proyect-edit/proyect-edit.component';


@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})

export class ProyectComponent implements OnInit {

  proyect: Proyect[] = [];
  projectId: string= '';

  constructor(
    private proyectService: ProjectService,
    private customerService: CustomerService,
    private areaService: AreaService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getAllProject();
  }

  getAllProject():void{
    this.proyectService.getAllProyect().subscribe(resp => {
      resp.forEach(item => {
        this.customerService.getCustomerById(item.clientId).forEach(customer => {
          item.clientId = customer.client_name;
        })


        this.areaService.getArea(item.areaId).forEach(area => {
          item.areaId = area.areaName
        })
      })
      this.proyect = resp;
    });
  }

  addProjetModal(): void {
    const dialogRef = this.dialog.open(ProyectAddComponent, {width: '500px' });

    dialogRef.afterClosed().subscribe(resul =>  {
      this.getAllProject();
    })
  }

  editProjetModal(proyectId: number) {
    const dialogRef = this.dialog.open(ProyectEditComponent, {width: '500px',    data:{projectId: proyectId }});
     dialogRef.afterClosed().subscribe(resul => {
      this.getAllProject();
     })
  }
}
