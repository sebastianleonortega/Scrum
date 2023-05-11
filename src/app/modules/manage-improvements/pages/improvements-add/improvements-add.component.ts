import { Component, OnInit } from '@angular/core';
import {User_storyService} from "@app/modules/subprojects/pages/service/user_story.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ImprovementsService } from '@app/modules/manage-improvements/pages/service/improvements.service';
import { AreaService } from '@app/modules/area/pages/service/area.service';
import { AreaInterface } from '@app/modules/area/pages/Interface/interface-area';

@Component({
  selector: 'app-improvements-add',
  templateUrl: './improvements-add.component.html',
  styleUrls: ['./improvements-add.component.css']
})
export class ImprovementsAddComponent implements OnInit{


  improvementsForm: FormGroup = new FormGroup({
    areaId: new FormControl(null, [Validators.required]),
    teamId: new FormControl(null, [Validators.required]),
    userStoryId: new FormControl(null, [Validators.required]),
    taskId: new FormControl(null, [Validators.required]),
    observationId: new FormControl(null, [Validators.required]),
    observationn: new FormControl(null, [Validators.required, Validators.maxLength(200)])
  });

  areaId: any;
  teamId: any;
  teams: any;
  task: any;
  userStoreId: any;
  userStorys: any;
  observations: any;
  areas : AreaInterface[]= [];

  constructor(
    private userStoryService: User_storyService,
    private areaService : AreaService,
    private improvementsService:ImprovementsService
  ) {
  }

  ngOnInit(): void {

    this.areaService.getAllArea().subscribe((data) => {
      this.areas = data;
    },
  );
  this.getAllTask();
  this.getAllObservations();
  }

  selectArea(){
    this.areaId = this.improvementsForm.get('areaId')?.value;
    this.improvementsService.getTeamArea(this.areaId).subscribe( resp => {
      this.teams = resp;

    })

  }
  selectTeam(){
    this.teamId = this.improvementsForm.get('teamId')?.value;
    this.userStoryService.getUserStoryToTeam(this.teamId).subscribe(resp => {
      this.userStorys = resp;

    })
  }

  getAllTask(){
    this.improvementsService.GetAllTask().subscribe(resp => {
      this.task = resp;

    })
  }
  getAllObservations(){
    this.improvementsService.GetAllObservations().subscribe(resp => {
      this.observations = resp;
    })
  }



  saveImprovements(): void {
    if(this.improvementsForm.valid) {
      const improvements = {
        areaId: this.improvementsForm.get('areaId')?.value,
        teamId: this.improvementsForm.get('teamId')?.value,
        userStoryId: this.improvementsForm.get('userStoryId')?.value,
        taskId: this.improvementsForm.get('taskId')?.value,
        observationId: this.improvementsForm.get('observationId')?.value,
        observationn: this.improvementsForm.get('observationn')?.value
      }
      this.improvementsService.saveImprovements(improvements).subscribe((resp=>{
      }))

    }
  }
}
