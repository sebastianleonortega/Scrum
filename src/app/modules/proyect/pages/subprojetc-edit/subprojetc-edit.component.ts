import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SubprojectService } from "@app/data/services/subproject/subproject.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { SubprojetcComponent } from '../subprojetc/subprojetc.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subprojetc-edit',
  templateUrl: './subprojetc-edit.component.html',
  styleUrls: ['./subprojetc-edit.component.css']
})
export class SubprojetcEditComponent implements OnInit {
  subprojectEditForm: FormGroup = new FormGroup({});
  subproject: any;
  subProjectId: any;
  teams: any;

  constructor(
    public formBuilder: FormBuilder,
    public subprojectService: SubprojectService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<SubprojetcComponent>,
    private routeurl: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.subprojectEditForm = this.formBuilder.group({
      subprojectName: new FormControl(null, [Validators.required]),
      teamId: new FormControl()
    });
    this.subProjectId = this.route.snapshot.paramMap.get('subProjectId');
    this.getSubProjectById(this.subProjectId)
    this.subProjectId = this.data.subProjectId;
    this.subprojectService.getTeam().subscribe((data) => {
      this.teams = data;
    })
  }

  getSubProjectById(id: string | null) {
    this.subprojectService.getSubProjectById(id).subscribe(resp => {
        this.subproject = resp;

        this.subprojectEditForm.patchValue({
          subprojectName: this.subproject.subProjectName,
        });
      },
      error => {
        console.error(error);
      });
  }
  getAllSubproject(): void {
    this.subprojectService.getAllSubprojects();
  }

  edit() {
    if (this.subprojectEditForm.valid) {
      const data = {
        subProjectName: this.subprojectEditForm.get('subprojectName')?.value,
        teamId: this.subprojectEditForm.get('teamId')?.value
      }
      this.subprojectService.updateSubProject(this.subProjectId, data).subscribe(
        (resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Subproyecto editado',
            showConfirmButton: false,
            timer: 1500
          })


          this.dialogRef.close();
          this.subprojectEditForm.reset();
          //this.getAllSubproject();
          location.reload();
        },
        error => (console.error(error)));
    }
  }
  CloseModal(): void {
    this.dialogRef.close();

  }

}
