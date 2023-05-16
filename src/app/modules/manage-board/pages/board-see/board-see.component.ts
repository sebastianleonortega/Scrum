
import {Component, OnInit} from '@angular/core';
import {TeamsService} from "@app/modules/teams/pages/service/teams.service";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {Team} from "@app/modules/teams/pages/interface/team";
import {Router} from "@angular/router";
import { BoardService } from '../service/board.service';
import {UserStory} from "@app/modules/subprojects/pages/Interface/userStory";
import {User_storyService} from "@app/modules/subprojects/pages/service/user_story.service";
import {EmployeesService} from "@app/modules/employees/pages/service/employees.service";
import {Employee} from "@app/modules/employees/pages/Interface/employee";
import {TeamTasksService} from "@app/modules/teams/pages/service/team-tasks.service";
import { Tasks } from '@app/modules/teams/pages/interface/tasks';
import { IBoard } from '../interface/board.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { BoardEditComponent } from '../board-edit/board-edit.component';
import { AreaService } from '@app/modules/area/pages/service/area.service';
import { AreaInterface } from '@app/modules/area/pages/Interface/interface-area';

@Component({
  selector: 'app-board-see',
  templateUrl: './board-see.component.html',
  styleUrls: ['./board-see.component.css']
})
export class BoardSeeComponent implements OnInit{

  boardFrom: FormGroup = new FormGroup({
    teamId: new FormControl(null, [Validators.required]),
    areaId: new FormControl(null, [Validators.required]),
    userStoryId: new FormControl(null, [Validators.required]),

  })

  teams: Team[] = [];
  teamId: string = '';
  areas: AreaInterface[]=[];
  areaId: string='';
  userStorys: any;

  board: IBoard[]= [];


  constructor(
    private areaServise: AreaService,
    private userStoryService: User_storyService,
    private employeesService: EmployeesService,
    private boardService: BoardService,
    private route: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllBoard();
    this.getAllArea();
  }

  getAllBoard(){
     this.boardService.getAllBoard().subscribe(resp =>{ //Trae todos los tabkeros
      this.board = resp;
    })
  }

  getAllArea(){
    this.areaServise.getAllArea().subscribe({  //Trae todas las areas
      next: (r)=> {
        this.areas = r;
      }
    })
  }
  selectArea(){
  this.areaId = this.boardFrom.get('areaId')?.value;
  this.boardService.getTeamArea(this.areaId).subscribe({  //Trae los equipos segun el area
    next: (r)=>{
      this.teams = r;
      console.log(this.teams);

    }
  })
 }

 selectTeam() {
  this.teamId = this.boardFrom.get('teamId')?.value;
  this.userStoryService.getUserStoryToTeam(this.teamId).subscribe({ //trae todas las hu segun el equipo
    next: (r)=> {
      this.userStorys = r;
    }
  })
}


  filterboard(): void {
    if (this.boardFrom.valid) {
      const data = {
        teamId: this.boardFrom.get('teamId')?.value,
        userStoryId: this.boardFrom.get('userStoryId')?.value,
        employeeId: this.boardFrom.get('areaId')?.value,
      }
      this.boardService.saveBoard(data).subscribe((resp) => {
          this.boardFrom.reset()
          this.route.navigateByUrl('app/board');
        },
      );
    }
  }

  deleteBoard(id: string): void{
    Swal.fire({
      title: 'Desea eliminar este tablero?',
      text: "La información eliminada no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
       confirmButtonText: 'si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.boardService.deleteBoard(id).subscribe(resp =>{
            Swal.fire({
              position: 'top-end',
                icon: 'success',
                title: 'Tablero eliminado',
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
              this.boardFrom.reset();
              this.boardService.getAllBoard();
           })

        }
      })

  }

  editBoardModal(idBoard: String) {
    const dialogRef = this.dialog.open(BoardEditComponent, {width: '500px',    data:{idBoard: idBoard }});
     dialogRef.afterClosed().subscribe(resul => {

     })
  }

}
