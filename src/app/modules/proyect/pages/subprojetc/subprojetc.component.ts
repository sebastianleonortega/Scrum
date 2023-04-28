import { Component, OnInit } from '@angular/core';
import { Subproject } from "@app/modules/proyect/pages/Interface/subprojects";
import { SubprojectService } from "@app/modules/proyect/pages/service/subproject.service";
import {MatDialog} from '@angular/material/dialog';
import {SubprojetcAddComponent} from '@app/modules/proyect/pages/subprojetc-add/subprojetc-add.component';
import { SubprojetcEditComponent } from '../subprojetc-edit/subprojetc-edit.component';
import { UserStoryAddComponent } from '@app/modules/subprojects/pages/user-story-add/user-story-add.component';

@Component({
  selector: 'app-subprojetc',
  templateUrl: './subprojetc.component.html',
  styleUrls: ['./subprojetc.component.css']
})
export class SubprojetcComponent implements OnInit {
  subproject: Subproject | any;

  constructor(

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
abrirModalUserStory(): void {
  const dialogRef = this.dialog.open(UserStoryAddComponent, {width: '500px', maxHeight: '600px' });

  dialogRef.afterClosed().subscribe(resul =>  {
  })
}

}
