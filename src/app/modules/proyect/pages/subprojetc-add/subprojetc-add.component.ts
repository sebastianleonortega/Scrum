import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SubprojectService} from "@app/data/services/subproject/subproject.service";
import {Router} from "@angular/router";
import {Subproject} from "@app/data/interfaces/subprojects";
import {ProyectService} from "@app/data/services/proyect/proyect.service";
import Swal from "sweetalert2";
import {MatDialogRef} from '@angular/material/dialog';
import {SubprojetcComponent} from '@app/modules/proyect/pages/subprojetc/subprojetc.component';

@Component({
  selector: 'app-subprojetc-add',
  templateUrl: './subprojetc-add.component.html',
  styleUrls: ['./subprojetc-add.component.css']
})
export class SubprojetcAddComponent implements OnInit {
  subprojectAddForm: FormGroup = new FormGroup({});
  subproject: Subproject | any;
  projects: any;

  constructor(
    public formBuilder: FormBuilder,
    public subprojectService: SubprojectService,
    public proyectService: ProyectService,
    private route: Router,
    private dialogRef: MatDialogRef<SubprojetcComponent>
  ) {
  }

  ngOnInit(): void {
    this.subprojectAddForm = this.formBuilder.group({
      subProjectName: new FormControl(null, [Validators.required]),
      projectId: new FormControl(null, [Validators.required])
    });
    this.subprojectService.getProyecto().subscribe((data) =>{
      this.projects = data;
    })

  }

  getAllProjects() {
    this.proyectService.getAllProyect().subscribe(resp => {
      this.projects = resp;

    })
  }

  saveSubProject(): void {
    if (this.subprojectAddForm.valid) {
      const data = {
        subProjectName: this.subprojectAddForm.get('subProjectName')?.value,
        projectId:this.subprojectAddForm.get('projectId')?.value

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
