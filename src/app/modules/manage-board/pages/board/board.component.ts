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

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  boardFrom: FormGroup = new FormGroup({
    teamId: new FormControl(null, [Validators.required]),
      userStoryId: new FormControl(null, [Validators.required]),
      taskTeamId: new FormControl(null, [Validators.required]),
      employeeId: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required])
  })
  teams: Team[] = [];
  userStory: UserStory[] = [];
  employees: Employee[] = [];
  teamId: string = '';
  taskTeam: Tasks []=[];

  constructor(
    private teamService: TeamsService,
    private userStoryService: User_storyService,
    private employeesService: EmployeesService,
    private boardService: BoardService,
    private taskTeamService: TeamTasksService,
    private route: Router
  ) {
  }

  ngOnInit(): void {

    this.getAllTeams();

  }

  getAllTeams() {
    this.teamService.getAllTeams().subscribe(resp => {
      this.teams = resp
    });
  }
  getAllEmployeesTeam(){
    this.employeesService.getEmployeesAddToTeam(this.teamId).subscribe(resp=>{
      this.employees=resp;

    })
  }
  getAllTaskTeamByTeam(){
    this.taskTeamService.getAllTaskTeamByTeamId(this.teamId).subscribe(resp=>{
      this.taskTeam=resp;

    })
  }

  selectTeam() {
    this.teamId = this.boardFrom.get('teamId')?.value;
    this.boardService.getUserStoryTeam(this.teamId).subscribe((data) => {
        this.userStory = data;
      },
    );
    this.getAllEmployeesTeam();
    this.getAllTaskTeamByTeam();
  }


  saveBoard(): void {
    if (this.boardFrom.valid) {
      const data = {
        teamId: this.boardFrom.get('teamId')?.value,
        userStoryId: this.boardFrom.get('userStoryId')?.value,
        taskTeamId: this.boardFrom.get('taskTeamId')?.value,
        employeeId: this.boardFrom.get('employeeId')?.value,
        date: this.boardFrom.get('date')?.value
      }
      this.boardService.saveBoard(data).subscribe((resp) => {
          this.boardFrom.reset()
          this.route.navigateByUrl('app/board');
        },
      );
    }
  }

}
