import {Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamTasksService} from "@app/modules/teams/pages/service/team-tasks.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-team-tasks-edit-form',
  templateUrl: './team-tasks-edit-form.component.html',
  styleUrls: ['./team-tasks-edit-form.component.css']
})
export class TeamTasksEditFormComponent implements OnInit {

  tasksFormEdit: FormGroup = new FormGroup({
    taskTeamName: new FormControl(null, [Validators.required])
  })
  id: any;
  taskTeamEdit: any;

  constructor(
    private teamTasksService: TeamTasksService,
    private route: ActivatedRoute,
    private route1: Router,
    @Inject (MAT_DIALOG_DATA) public data: any,
    ) {
  }

  ngOnInit(): void {

    this.id = this.data.taskTeamId;
    this.getTaskTeamById(this.id);
  }

  getTaskTeamById(id: string | null) {
    this.teamTasksService.getTeamTasks(id).subscribe(resp => {
      this.taskTeamEdit = resp;
      this.tasksFormEdit.patchValue({
        taskTeamName: this.taskTeamEdit.taskTeamName
      })
    });

  }

  editTasks() {
    if (this.tasksFormEdit.valid) {
      const data = {
        taskTeamName: this.tasksFormEdit.get('taskTeamName')?.value,
      }
      this.teamTasksService.updateTeamTasks(this.id, data).subscribe((resp => {
            this.tasksFormEdit.reset();
            Swal.fire({
              position: 'top-end',
                icon: 'success',
                title: 'Area editada',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                customClass: {
                  container: 'my-swal-container',
                  title: 'my-swal-title',
                  icon: 'my-swal-icon',
                  popup: 'my-swal-popup',
                },
                background: '#F44336',
            })
            this.route1.navigateByUrl('app/teams/team-task').then();
          }
        )
      )
    }
  }
}
