import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamsService} from "@app/modules/teams/shared/teams.service";
import {Tasks} from "@app/data/interfaces/tasks";
import {TeamTasksService} from "@app/data/services/team-tasks/team-tasks.service";
import {Team} from "@app/modules/teams/shared/team";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-tasks',
  templateUrl: './team-tasks.component.html',
  styleUrls: ['./team-tasks.component.css']
})
export class TeamTasksComponent implements OnInit {
  tasksForm: FormGroup = new FormGroup({})
  filterTaskTeamForm:FormGroup=new FormGroup({})
  teams: any;
  tasks: Tasks | any;
  tasksTeams: any;



  constructor(
    private manageTeamsService: TeamsService,
    private formBuilder: FormBuilder,
    private teamTasksService: TeamTasksService
  ) {
  }

  ngOnInit(): void {
    this.tasksForm = this.formBuilder.group({
      taskTeamName: new FormControl(null, [Validators.required]),
      teamId: new FormControl(null, [Validators.required]),
      taskTeamId: new FormControl(null,)
    })
    this.getAllTeamsSelect();
    this.getAllTasksTeams();
    this.filterTaskTeamForm = this.formBuilder.group({
      teamIdFilter: new FormControl(null, [Validators.required])
    })
  }

  getAllTeamsSelect() {
    this.manageTeamsService.getAllTeams().subscribe(resp => { //Trae todos los equipos
      this.teams = resp
      console.log(resp)
    });
  }

  getAllTasksTeams(){
    this.teamTasksService.getAllTeamTasks().subscribe(resp => { // trae todas las tares por equipo
      this.tasksTeams = resp;
      console.log(resp)
    });
  }


  saveTasks(): void {
    console.log(this.tasksForm.get('teamId')?.value)


    if (this.tasksForm.valid){
      const data = {
        teamId:this.tasksForm.get('teamId')?.value,
        taskTeamName:this.tasksForm.get('taskTeamName')?.value,
      }
      console.log(data)
      this.teamTasksService.saveTeamTasks(data).subscribe(
        (resp)=>{
        this.tasksForm.reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tarea creada',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllTasksTeams();
      })
    }
  }


  deleteTasks(id){

    this.teamTasksService.deleteTeamTasks(id).subscribe(resp=>{
      Swal.fire({
        title: 'Desea eliminar tarea?',
        text: "despues de eliminada no podra recuperar los datos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Area  eliminada',
            showConfirmButton: false,
            timer: 1500
          })
          this.tasksForm.reset();
          this.getAllTasksTeams();
        }
      })
    })
  }

  selectTeamFilter() {
    const teamId = this.filterTaskTeamForm.get('teamIdFilter')?.value
    this.teamTasksService.getAllTaskTeamByTeamId(teamId).subscribe(resp=>{
      this.tasks=resp;
    })

  }
}
