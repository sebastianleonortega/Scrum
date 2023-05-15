import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@app/modules/proyect/pages/service/project.service';
import {CommonModule} from '@angular/common';
import { AreaService } from '@app/modules/area/pages/service/area.service';
import { CustomerService } from '@app/modules/customer/pages/service/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  project: any;

  constructor(
    private projectService: ProjectService,
    private areaService: AreaService,
    private customerService: CustomerService,

  ) { }

  ngOnInit(): void {
    this.projectService.getAllProyect().subscribe(resp => {
      resp.forEach(item => {
        this.customerService.getCustomerById(item.clientId).forEach(customer => {
          item.clientId = customer.client_name;
        })


        this.areaService.getArea(item.areaId).forEach(area => {
          item.areaId = area.areaName
        })
      })
      this.project = resp;
    });

  }





}
