import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImprovementsAddComponent } from '../improvements-add/improvements-add.component';
import { ImprovementsService } from '../service/improvements.service';
import { ManageImprovements } from '../Interface/manage-improvements';
import Swal from 'sweetalert2';
import { ImprovementsSeeComponent } from '../improvements-see/improvements-see.component';

@Component({
  selector: 'app-manage-improvements',
  templateUrl: './manage-improvements.component.html',
  styleUrls: ['./manage-improvements.component.css']
})
export class ManageImprovementsComponent implements OnInit {

  improvements: ManageImprovements[]=[];

  constructor(
    private dialog: MatDialog,
    private improvementsService : ImprovementsService,
  ){
  }

ngOnInit(): void {


  this.getAllImprovements();
}
getAllImprovements(){
  this.improvementsService.getAllImprovements().subscribe(resp => {
    this.improvements = resp;
  })
}



  abrirModalImprovements(): void {
    const dialogRef = this.dialog.open(ImprovementsAddComponent, {width: '500px', maxHeight: '600px' });

    dialogRef.afterClosed().subscribe(resul =>  {
    })
  }
  seeModalImprovements(): void {
    const dialogRef = this.dialog.open(ImprovementsSeeComponent, {width: '800px', maxHeight: '400px' });

    dialogRef.afterClosed().subscribe(resul =>  {
    })
  }


  deleteImprovements(id: string){
    Swal.fire({
      title: 'Desea eliminar esta mejora?',
      text: " La información eliminada no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
       confirmButtonText: 'si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.improvementsService.deleteImprovements(id).subscribe({
            next: (resp) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'mejora eliminada',
                showConfirmButton: false,
                 timer: 1500
               })

                this.getAllImprovements();

            }})

        }
      })


  }

}
