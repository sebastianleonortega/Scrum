import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SubprojectService} from "@app/data/services/subproject/subproject.service";
import {Router} from "@angular/router";
import {Subproject} from "@app/data/interfaces/subprojects";
import {ProyectService} from "@app/data/services/proyect/proyect.service";
import Swal from "sweetalert2";
import {MatDialogRef} from '@angular/material/dialog';
import {SubprojetcComponent} from '@app/modules/proyect/pages/subprojetc/subprojetc.component';
import { TeamsService } from '@app/modules/teams/shared/teams.service';

@Component({
  selector: 'app-subprojetc-add',
  templateUrl: './subprojetc-add.component.html',
  styleUrls: ['./subprojetc-add.component.css']
})
export class SubprojetcAddComponent implements OnInit {
  subprojectAddForm: FormGroup = new FormGroup({});
  subproject: Subproject | any;
  projects: any;
  teams: any;

  constructor(
    public formBuilder: FormBuilder,
    public subprojectService: SubprojectService,
    public proyectService: ProyectService,
    private route: Router,
    private dialogRef: MatDialogRef<SubprojetcComponent>,
    private teamService: TeamsService
  ) {
  }

  ngOnInit(): void {
    this.subprojectAddForm = this.formBuilder.group({
      subProjectName: new FormControl(null, [Validators.required]),
      projectId: new FormControl(null, [Validators.required]),
      teamId: new FormControl()
    });
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
