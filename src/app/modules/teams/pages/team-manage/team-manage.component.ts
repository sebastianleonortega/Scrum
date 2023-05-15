import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamsService} from "@app/modules/teams/pages/service/teams.service";
import { AreaService } from '@app/modules/area/pages/service/area.service';
import {Team} from "@app/modules/teams/pages/interface/team";
import Swal from 'sweetalert2';
import { AreaInterface } from '@app/modules/area/pages/Interface/interface-area';
import { TeamTasksEditFormComponent } from '../team-tasks-edit-form/team-tasks-edit-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageTeamsEditFormComponent } from '../team-manage-edit-form/manage-teams-edit-form.component';

@Component({
  selector: 'app-teams',
  templateUrl: './team-manage.component.html',
  styleUrls: ['./team-manage.component.css']
})
export class TeamManageComponent implements OnInit {

  manageTeamsForm: FormGroup = new FormGroup({
    areaId: new FormControl(null, [Validators.required]),
    teamName: new FormControl(null, [Validators.required,]),
    teamId: new FormControl(null),
  });

  areas: AreaInterface[]=[];
  team: Team[]=[];
  employees = [];
  area: any;
  teamId: string='';

  constructor(
    private manageTeamsService: TeamsService,
    private areaService: AreaService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getAllTeams();
    this.getAllArea();
  }

  getAllTeams() {
    this.manageTeamsService.getAllTeams().subscribe(  resp=>{
      resp.forEach(
        team => {
          this.areaService.getArea(team.areaId).subscribe(area =>{
            team.areaId=area.areaName
            this.team = resp;
          })
        }
      )
    })
  }

  getAllArea() {
    this.areaService.getAllArea().subscribe(resp => {
      this.areas = resp;
    });
  }


  saveTeams(): void {
    if (this.manageTeamsForm.valid) {
      const data = {
        areaId: this.manageTeamsForm.get('areaId')?.value,
        teamName: this.manageTeamsForm.get('teamName')?.value,

      }
      this.manageTeamsService.saveTeam(data).subscribe(
        () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Equipo creado',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            customClass: {
              container: 'my-swal-container',
              title: 'my-swal-title',
              icon: 'my-swal-icon',
            },
            background: '#E6F4EA',
          })
          this.manageTeamsForm.reset();
          this.getAllTeams();
        },
      );
    }

  }


editTeamModal(teamId: string): void{
  const dialogRef = this.dialog.open(ManageTeamsEditFormComponent, {width: '500px', maxHeight: '600px', data:{teamId: teamId } });
  dialogRef.afterClosed().subscribe({
    next: (resp)=> {
    this.getAllTeams();
    }
  })
}
}
