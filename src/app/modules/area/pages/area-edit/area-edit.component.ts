import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AreaService} from "@app/data/services/area/area.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';
import {MatDialogRef} from '@angular/material/dialog';
import {AreaComponent} from '@app/modules/area/pages/area/area.component';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.css']
})
export class AreaEditComponent implements OnInit {
  areaEdit: any;
  id: any;
  areaEditForm: FormGroup = new FormGroup({});

  constructor(
    public formBuilder: FormBuilder,
    public areaService: AreaService,
    private route: ActivatedRoute,
    public route1: Router,
    public dialog: MatDialogRef<AreaComponent>
    ) {

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('areaId');
    this.getArea(this.id);
    this.areaEditForm = new FormGroup({
      areaName: new FormControl(null, [Validators.required])
    });
  }

  getArea(id: string | null) {
    this.areaService.getArea(id).subscribe(resp => {
        this.areaEdit = resp;
        this.areaEditForm.patchValue({
          areaName: this.areaEdit.areaName
        });
      },
    );
  }

  editArea() {
    if (this.areaEditForm.valid) {
      const data = {
        areaName: this.areaEditForm.get('areaName')?.value,
      }

      this.areaService.updateArea(this.id, data).subscribe(
        (resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Area aditada',
            showConfirmButton: false,
            timer: 1500
          })
          this.areaEditForm.reset();
          this.route1.navigateByUrl('app/area').then();
          this.dialog.close();
        },
       );
    }
  }

  deleteArea(id: string){
    this.areaService.deleteArea(id);
    console.log(id);
  }


}
