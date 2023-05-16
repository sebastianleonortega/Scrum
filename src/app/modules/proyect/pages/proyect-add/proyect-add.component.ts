import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from '../service/project.service';
import { Router } from "@angular/router";
import { Area } from '@app/modules/area/pages/Interface/interface-area';
import { Client } from '@app/modules/customer/pages/Interface/customer-interface';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { ProyectModule } from '../../proyect.module';


@Component({
  selector: 'app-proyect-add',
  templateUrl: './proyect-add.component.html',
  styleUrls: ['./proyect-add.component.css']
})
export class ProyectAddComponent implements OnInit {

  projectAddForm: FormGroup = new FormGroup({
  projectName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
  projectClient: new FormControl(null, [Validators.required]),
  projectArea: new FormControl(null, [Validators.required]),
  archive: new FormControl(null, [Validators.required]),
  });

  public clients : Client[] = [];
  public areas : Area[] = [];

  constructor(

    private projectService: ProjectService,
    private route: Router,
    private dialogRef: MatDialogRef<ProyectModule>,
  ) {
  }

  ngOnInit(): void {

    this.getAllClient();
    this.getAllAreas();
  }

  getAllAreas():void {
    this.projectService.getArea().subscribe({
      next: (resp)=> {
        this.areas = resp;

      }})
  }
  getAllClient():void{
    this.projectService.getClient().subscribe({
      next: (resp)=> {
        this.clients = resp;
      }
    })
  }

  saveProject(): void {
    if (this.projectAddForm.valid) {
      const data = {
        projectName: this.projectAddForm.get('projectName')?.value,
        clientId: this.projectAddForm.get('projectClient')?.value,
        areaId: this.projectAddForm.get('projectArea')?.value,
        archive: this.projectAddForm.get('archive')?.value,
      }
      this.projectService.saveProyect(data).subscribe((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proyecto creado',
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
        this.dialogRef.close();
        this.projectAddForm.reset()
      }, );
    }
  }

  CloseModal(): void {
    this.dialogRef.close();
  }

  upload_image(event: any) {
    let archive = event.target.files
    let reader = new FileReader();

    reader.readAsDataURL(archive[0])
    reader.onloadend = () => {
    }

  }

  // upload_image(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result as string;
  //       this.projectAddForm.patchValue({ archive: base64String });
  //       this.projectAddForm.get('archive')?.updateValueAndValidity();
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }


}
