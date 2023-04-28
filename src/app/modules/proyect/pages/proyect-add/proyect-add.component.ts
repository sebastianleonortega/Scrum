import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from '../service/project.service';
import { Router } from "@angular/router";
import { Area } from '@app/modules/area/pages/Interface/interface-area';
import { Client } from '@app/modules/customer/pages/Interface/customer-interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proyect-add',
  templateUrl: './proyect-add.component.html',
  styleUrls: ['./proyect-add.component.css']
})
export class ProyectAddComponent implements OnInit {

  proyectAddForm: FormGroup = new FormGroup({
    proyectName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      proyectClient: new FormControl(null, [Validators.required]),
      proyectArea: new FormControl(null, [Validators.required]),
  });

  public clients : Client[] = [];
  public areas : Area[] = [];

  constructor(

    private projectService: ProjectService,
    private route: Router,
  ) {
  }

  ngOnInit(): void {

    this.projectService.getClient().subscribe((data) => {
      this.clients = data;
    }, );

    this.projectService.getArea().subscribe((data) => {
      this.areas = data;
    },
     );
  }

  saveProyect(): void {
    if (this.proyectAddForm.valid) {
      const data = {
        projectName: this.proyectAddForm.get('proyectName')?.value,
        clientId: this.proyectAddForm.get('proyectClient')?.value,
        areaId: this.proyectAddForm.get('proyectArea')?.value,
      }
      this.projectService.saveProyect(data).subscribe((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proyecto agregado',
          showConfirmButton: false,
          timer: 1500
        })

        this.proyectAddForm.reset()
        location.reload();

      }, );
    }
  }



  upload_image(event: any) {
    let archive = event.target.files
    let reader = new FileReader();

    reader.readAsDataURL(archive[0])
    reader.onloadend = () => {
    }

  }
}
