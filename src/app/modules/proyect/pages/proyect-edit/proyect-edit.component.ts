import { Component, OnInit, Inject } from '@angular/core';
import {  FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from '../service/project.service';
import { ActivatedRoute, Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProyectComponent } from '../proyect/proyect.component';
import { Proyect } from '../Interface/proyect';
import {Area} from '@app/modules/area/pages/Interface/interface-area';
import { Client } from '@app/modules/customer/pages/Interface/customer-interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proyect-edit',
  templateUrl: './proyect-edit.component.html',
  styleUrls: ['./proyect-edit.component.css']
})
export class ProyectEditComponent implements OnInit {

  proyect: Proyect [] = [];
  projectId: string = '';
  clients: Client[] = [];
  areas: Area[] = [];

  proyectEditForm: FormGroup = new FormGroup({
    proyectName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    proyectClient: new FormControl(null, [Validators.required]),
    proyectArea: new FormControl(null, [Validators.required]),
  });


  constructor(

    private proyectService: ProjectService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ProyectComponent>,
    private routeurl: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {

    this.projectId = this.data.projectId;
    this.getProyectById(this.projectId)

    this.proyectService.getClient().subscribe((data) => {
      this.clients = data;
    }, (error) => {

    });

    this.proyectService.getArea().subscribe((data) => {
        this.areas = data;
      },
      error => {

      });
  }


  getProyectById(id: string | null) {
    this.proyectService.getProyectById(id).subscribe(resp => {

        this.proyectEditForm.patchValue({
          proyectName: resp.projectName,
          proyectClient: resp.clientId,
          proyectArea: resp.areaId,
        });
      },
      );
  }


  edit() {
    if (this.proyectEditForm.valid) {
      const data = {
        projectName: this.proyectEditForm.get('proyectName')?.value,
        clientId: this.proyectEditForm.get('proyectClient')?.value,
        areaId: this.proyectEditForm.get('proyectArea')?.value,
      }
      this.proyectService.updateProyect(this.projectId, data).subscribe(
        (resp) => {
          this.proyectEditForm.reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Proyecto aditado',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close();
          location.reload();
        },
        error => (console.error(error)));
    }
  }





}
