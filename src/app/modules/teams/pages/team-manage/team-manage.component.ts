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
import { TeamAddManageComponent } from '../team-add-manage/team-add-manage.component';

@Component({
  selector: 'app-teams',
  templateUrl: './team-manage.component.html',
  styleUrls: ['./team-manage.component.css']
})
export class TeamManageComponent implements OnInit {

 

  areas: AreaInterface[]=[];
  team: Team[]=[];
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


editTeamModal(teamId: string): void{
  const dialogRef = this.dialog.open(ManageTeamsEditFormComponent, {width: '500px', maxHeight: '600px', data:{teamId: teamId } });
  dialogRef.afterClosed().subscribe({
    next: (resp)=> {
    this.getAllTeams();
    }
  })
}

addTeamModal(): void{
  const dialogRef = this.dialog.open(TeamAddManageComponent, {width: '500px', maxHeight: '600px' });
  dialogRef.afterClosed().subscribe({
    next: (resp)=> {
    this.getAllTeams();
    }
  })
}
}
