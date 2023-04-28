import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subproject } from "@app/modules/proyect/pages/Interface/subprojects";
import { SubprojectService } from "@app/modules/proyect/pages/service/subproject.service";
import {MatDialog} from '@angular/material/dialog';
import {SubprojetcAddComponent} from '@app/modules/proyect/pages/subprojetc-add/subprojetc-add.component';
import { SubprojetcEditComponent } from '../subprojetc-edit/subprojetc-edit.component';

@Component({
  selector: 'app-subprojetc',
  templateUrl: './subprojetc.component.html',
  styleUrls: ['./subprojetc.component.css']
})
export class SubprojetcComponent implements OnInit {
  subproject: Subproject | any;

  constructor(
    private formBuilder: FormBuilder,
    private subprojectService: SubprojectService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.subprojectService.getAllSubprojects().subscribe(resp => {
      this.subproject = resp;
    });
  }

abrirModalSubprojetc(): void {
  const dialogRef = this.dialog.open(SubprojetcAddComponent, {width: '500px'});

  dialogRef.afterClosed().subscribe(resul => {
  })
}

editSubProjetModal(subProyectId: number) {

  const dialogRef = this.dialog.open(SubprojetcEditComponent, {width: '500px',    data:{subProjectId: subProyectId }});

   dialogRef.afterClosed().subscribe(resul => {

   })
}

}
