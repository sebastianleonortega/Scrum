import {Component, OnInit, Inject} from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.css']
})
export class BoardEditComponent implements OnInit {


  boardEditFrom: FormGroup = new FormGroup({
    teamId: new FormControl(null, [Validators.required]),
    userStoryId: new FormControl(null, [Validators.required]),
    taskTeamId: new FormControl(null, [Validators.required]),
    employeeId: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required])
  })

  teams:any;
  userStory: any;
  employees: any;
  teamId: string = '';
  taskTeam: any;
  userStoryTeam: UserStory[] = [];
  board: IBoard[]= [];
  idBoard: string = '';


  constructor(
    private teamService: TeamsService,
    private employeesService: EmployeesService,
    private boardService: BoardService,
    private taskTeamService: TeamTasksService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BoardComponent>,
  ) {
  }

  ngOnInit(): void {

    this.idBoard = this.data.idBoard;
    this.boardService.getAllBoardById(this.idBoard).subscribe({
      next: (resp)=>{
        console.log(resp);

        this.boardEditFrom.patchValue({
          employeeId : resp.employeeId,
          userStoryId : resp.userStoryId,
          teamId : resp.teamId,
          taskTeamId : resp.taskTeamId,
          date : resp.date

      })
      }
    });

    this.boardService.getEmployees().subscribe((data) => {
      this.employees = data;

    })


    this.boardService.getAllUserStory().subscribe((data) => {
      this.userStory = data;
    })


    this.boardService.getAllTeam().subscribe((data)=> {
      this.teams = data;
    })
    this.boardService.getAllTaskTeam().subscribe((data)=> {
      this.taskTeam = data;
    })
    console.log(this.idBoard);
  }



  editBoard(): void {
    if (this.boardEditFrom.valid) {
      const data = {
        teamId: this.boardEditFrom.get('teamId')?.value,
        userStoryId: this.boardEditFrom.get('userStoryId')?.value,
        taskTeamId: this.boardEditFrom.get('taskTeamId')?.value,
        employeeId: this.boardEditFrom.get('employeeId')?.value,
        date: this.boardEditFrom.get('date')?.value
      }
      this.boardService.updateBoard(this.idBoard, data).subscribe((resp) => {
          this.boardEditFrom.reset()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Proyecto aditado',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close();
          location.reload();
        },
      );
    }
  }
  CloseModal(): void {
    this.dialogRef.close();

  }





  // getAllTeams() {
  //   this.teamService.getAllTeams().subscribe(resp => {
  //     this.teams = resp
  //   });
  // }
  // getAllEmployeesTeam(){
  //   this.employeesService.getEmployeesAddToTeam(this.teamId).subscribe(resp=>{
  //     this.employees=resp;

  //   })
  // }


  // getAllTaskTeamByTeam():void {
  //   this.taskTeamService.getAllTaskTeamByTeamId(this.teamId).subscribe(resp => {
  //     this.taskTeam = resp;
  //   })
  // }

  // getUserStoryTeam(){
  //   this.boardService.getUserStoryTeam(this.teamId).subscribe((data) => {
  //     this.userStory = data;
  //   },
  // );
  // }


  // selectTeam() {
  //   this.teamId = this.boardFrom.get('teamId')?.value;
  //   this.getAllEmployeesTeam();
  //   this.getAllTaskTeamByTeam();
  //   this.getUserStoryTeam();
  // }
}
