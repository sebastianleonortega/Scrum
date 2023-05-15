import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import {AreaInterface} from "@app/modules/area/pages/Interface/interface-area";
import {AreaService} from '@app/modules/area/pages/service/area.service';
import Swal from 'sweetalert2';
import { AreaEditComponent } from '../area-edit/area-edit.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  areaForm: FormGroup = new FormGroup({
    areaId: new FormControl(null,),
    areaName: new FormControl(null, [Validators.required , Validators.maxLength(20)] )
  });

  area: AreaInterface[]= [];
  areaId: string= '';


  constructor(
    private areaService: AreaService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllAreas();
  }

  getAllAreas(){
    this.areaService.getAllArea().subscribe(resp => {
        this.area = resp;
      }
    );
  }


  saveArea(): void {
    if (this.areaForm.valid) {
      const data = {
        areaId: this.areaForm.get('areaId')?.value,
        areaName: this.areaForm.get('areaName')?.value
      }

      this.areaService.saveArea(data).subscribe(
        () => {
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Area guardada',
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
          this.areaForm.reset();
          this.getAllAreas();
        },
      );
    }else{
    // this.areaForm.markAllAsTouched();
    }
  };

  deleteArea(id: string){
    Swal.fire({
      title: 'Desea eliminar esta area?',
      text: "Al eliminar el area, elimina: los proyectos, subproyectos y equipos asociados a ella. La información eliminada no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
       confirmButtonText: 'si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.areaService.deleteArea(id).subscribe(resp =>{

            Swal.fire({
              position: 'top-end',
                icon: 'success',
                title: 'Area eliminada',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                customClass: {
                  container: 'my-swal-container',
                  title: 'my-swal-title',
                  icon: 'my-swal-icon',
                  popup: 'my-swal-popup',
                },
                background: '#F44336',

           })

        })
      }})


  }


  editAreaModal(areaId: string) {
    const dialogRef = this.dialog.open(AreaEditComponent, {width: '500px',    data:{areaId: areaId }});
     dialogRef.afterClosed().subscribe(resul => {
      this.getAllAreas();
     })


    }


}

