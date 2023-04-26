import {Component, OnInit} from '@angular/core';
import {TeamsService} from "@app/modules/teams/shared/teams.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Team} from "@app/modules/teams/shared/team";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teams-edit-form',
  templateUrl: './manage-teams-edit-form.component.html',
  styleUrls: ['./manage-teams-edit-form.component.css']
})
export class ManageTeamsEditFormComponent implements OnInit {
  teamsEditForm: FormGroup = new FormGroup({});
  id: any;
  team: any;
  data : Team | any;

  constructor(
    private formBuilder: FormBuilder,
    public manageTeamService: TeamsService,
    private route: ActivatedRoute,
    public route1: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('teamId');
    this.getManageTeamById(this.id);
    this.teamsEditForm =  new FormGroup({
      teamName: new FormControl(null, [Validators.required]),
    });


  }

  getManageTeamById(id: string | null) {
    this.manageTeamService.getTeamById(id).subscribe(resp => {
      this.team = resp;
      this.teamsEditForm.patchValue({
        teamName: this.team.teamName,
      });


    })
  }

  edit() {

    if (this.teamsEditForm.valid) {

      this.data = {
        teamName: this.teamsEditForm.get('teamName')?.value,

      }
      this.manageTeamService.updateTeam(this.id, this.data).subscribe(
        (resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Nombre del equipo aditada',
            showConfirmButton: false,
            timer: 1500
          })
          this.teamsEditForm.reset();
          this.route1.navigateByUrl('app/teams').then();
      });
    }
  }
}
