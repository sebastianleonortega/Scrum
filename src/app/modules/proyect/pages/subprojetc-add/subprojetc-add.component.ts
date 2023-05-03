import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {SubprojectService} from "@app/modules/proyect/pages/service/subproject.service";
import {Router} from "@angular/router";
import {Subproject} from "@app/modules/proyect/pages/Interface/subprojects";
import { ProjectService } from '../service/project.service';
import Swal from "sweetalert2";
import {MatDialogRef} from '@angular/material/dialog';
import {SubprojetcComponent} from '@app/modules/proyect/pages/subprojetc/subprojetc.component';
import { TeamsService } from '@app/modules/teams/pages/service/teams.service';
import { Team } from '@app/modules/teams/pages/interface/team';

@Component({
  selector: 'app-subprojetc-add',
  templateUrl: './subprojetc-add.component.html',
  styleUrls: ['./subprojetc-add.component.css']
})
export class SubprojetcAddComponent implements OnInit {

  subprojectAddForm: FormGroup = new FormGroup({
    subProjectName: new FormControl(null, [Validators.required]),
    projectId: new FormControl(null, [Validators.required]),
    teamId: new FormControl(null, [Validators.required])
  });

  subproject: Subproject[]=[] ;
  teams: Team[] = [];
  projects: any;

  constructor(
    private subprojectService: SubprojectService,
    private proyectService: ProjectService,
    private route: Router,
    private dialogRef: MatDialogRef<SubprojetcComponent>,
    private teamService: TeamsService
  ) {
  }

  ngOnInit(): void {

    this.subprojectService.getProyecto().subscribe((data) =>{
      this.projects = data;
    })
    this.subprojectService.getTeam().subscribe((data) => {
      this.teams = data;
    })

  }



  saveSubProject(): void {
    if (this.subprojectAddForm.valid) {
      const data = {
        subProjectName: this.subprojectAddForm.get('subProjectName')?.value,
        projectId:this.subprojectAddForm.get('projectId')?.value,
        teamId: this.subprojectAddForm.get('teamId')?.value

      }

      this.subprojectService.saveSubProject(data).subscribe((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Subproyecto agreado',
          showConfirmButton: false,
          timer: 1500
        })

        this.subprojectAddForm.reset()
        location.reload();
      },);
    }
  }
 closeModal(): void {
  this.dialogRef.close();
 }


}
