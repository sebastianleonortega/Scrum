import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AreaInterface} from "@app/data/interfaces/interface-area";
import {AreaService} from "@app/data/services/area/area.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  areaForm: FormGroup = new FormGroup({});
  area: AreaInterface | any;


  constructor(
    public formBuilder: FormBuilder,
    public areaService: AreaService,
  ) {
  }

  ngOnInit(): void {
    this.areaForm = this.formBuilder.group({
      areaId: new FormControl(null,),
      area_name: new FormControl(null, [Validators.required]),
    });
    this.areaService.getAllArea().subscribe(resp => {
      this.area = resp;
    })
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
        area_name: this.areaForm.get('area_name')?.value
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




}

