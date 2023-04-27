import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamsService} from "@app/modules/teams/pages/service/teams.service";
import { AreaService } from '@app/modules/area/pages/service/area.service';
import {Team} from "@app/modules/teams/pages/interface/team";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teams',
  templateUrl: './team-manage.component.html',
  styleUrls: ['./team-manage.component.css']
})
export class TeamManageComponent implements OnInit {

  manageTeamsForm: FormGroup = new FormGroup({});
  areas: any;
  team: Team | any;
  employees = [];
  teams = [];

  constructor(
    private formBuilder: FormBuilder,
    private manageTeamsService: TeamsService,
    private areaService: AreaService,
  ) {
  }

  ngOnInit(): void {
    this.manageTeamsForm = this.formBuilder.group(
      {
        areaId: new FormControl(null, [Validators.required]),
        teamName: new FormControl(null, [Validators.required,]),
        teamId: new FormControl(null),

      },
    );
    this.getAllTeams();
    this.getAllAreaSelect();
  }

  getAllTeams() {
    this.manageTeamsService.getAllTeams().subscribe(resp=>{
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

  getAllAreaSelect() {
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
            timer: 1500
          })
          this.manageTeamsForm.reset();
          this.getAllTeams();
        },
      );
    }

  }
}
