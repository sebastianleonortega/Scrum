import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {AreaService} from '@app/modules/area/pages/service/area.service';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.css']
})
export class AreaEditComponent implements OnInit {
  areaEdit: any;
  id: any;

  areaEditForm: FormGroup = new FormGroup({
    areaName: new FormControl(null, [Validators.required, Validators.maxLength(20)])
  });

  constructor(

    private areaService: AreaService,
    private route: ActivatedRoute,
    private route1: Router,

    ) {

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('areaId');
    this.getArea(this.id);

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
        },
       );
    }
  }

}
