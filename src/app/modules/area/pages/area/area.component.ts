import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Area} from "@app/data/interfaces/interface-area";
import {AreaService} from "@app/data/services/area/area.service";
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import {AreaEditComponent} from '@app/modules/area/pages/area-edit/area-edit.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  areaForm: FormGroup = new FormGroup({});
  area: Area | any;
  employees = [];
  teams = [];


  constructor(
    public formBuilder: FormBuilder,
    public areaService: AreaService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.areaForm = this.formBuilder.group({
      areaId: new FormControl(null,),
      areaName: new FormControl(null, [Validators.required]),
    });
    this.getAllAreas()
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

        areaName: this.areaForm.get('areaName')?.value
      }
      this.areaService.saveArea(data).subscribe(
        () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Area guardada',
            showConfirmButton: false,
            timer: 1500
          })
          this.areaForm.reset();
          this.getAllAreas();
        },
      );
    }
  };

  deleteArea(id: string){
        this.areaService.deleteArea(id).subscribe(
          () => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Area eliminada',
              showConfirmButton: false,
              timer: 1500
            })
                this.areaForm.reset();
                this.getAllAreas();
          },
        );
  }

  abriModalArea(): void {
    const dialogRef = this.dialog.open(AreaEditComponent);
  }


}

