import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImprovementsAddComponent } from '../improvements-add/improvements-add.component';
import { ImprovementsService } from '../service/improvements.service';

@Component({
  selector: 'app-manage-improvements',
  templateUrl: './manage-improvements.component.html',
  styleUrls: ['./manage-improvements.component.css']
})
export class ManageImprovementsComponent implements OnInit {

  improvements: any;

  constructor(
    private dialog: MatDialog,
    private improvementsService : ImprovementsService,
  ){
  }

ngOnInit(): void {

  this.improvementsService.getAllImprovements().subscribe(resp => {
    this.improvements = resp;
  })
}

  abrirModalImprovements(): void {
    const dialogRef = this.dialog.open(ImprovementsAddComponent, {width: '500px', maxHeight: '600px' });

    dialogRef.afterClosed().subscribe(resul =>  {
    })
  }



}
