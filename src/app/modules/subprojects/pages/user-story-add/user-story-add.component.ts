import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {User_storyService} from "@app/modules/subprojects/pages/service/user_story.service";
import {UserStory} from "@app/modules/subprojects/pages/Interface/userStory";
import {SubprojectService} from "@app/modules/proyect/pages/service/subproject.service";
import { UserStoyStatusService } from '@app/modules/subprojects/pages/service/user-stoy-status.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UserStoryComponent } from '../user-story/user-story.component';

@Component({
  selector: 'app-user-story-add',
  templateUrl: './user-story-add.component.html',
  styleUrls: ['./user-story-add.component.css']
})

export class UserStoryAddComponent implements OnInit {

  userStoryForm: FormGroup = new FormGroup({
    subProjectId: new FormControl(null, [Validators.required]),
    userStoryName: new FormControl(null, [Validators.required]),
    userStoryArchive: new FormControl(),
    userStoryStateId: new FormControl(null, [Validators.required]),
    userStoryScore: new FormControl(null, Validators.required),
    fechaMaxima: new FormControl(null, Validators.required)
  });

  userStory: UserStory | any;
  subProjects: any;
  userStoryState: any;

  constructor(
    private userStoryService: User_storyService,
    private subProjectService : SubprojectService,
    private userStoryStatusService: UserStoyStatusService,
    private route: Router,
    private dialogRef : MatDialogRef<UserStoryComponent>
  ) {
  }

  ngOnInit(): void {


    this.getAllSubprojects();
    this.getAlluserStoryStatus()
  }

  getAlluserStoryStatus(){
    this.userStoryStatusService.getAlluser_story_status().subscribe(resp => {
      this.userStoryState = resp;
    }
    )
  }

  getAllSubprojects() {
    this.subProjectService.getAllSubprojects().subscribe(resp => {
      this.subProjects = resp;
    })
  }


  saveStory(): void {
    if (this.userStoryForm.valid) {
      const data = {
        subProjectId: this.userStoryForm.get('subProjectId')?.value,
        userStoryArchive: this.userStoryForm.get('userStoryArchive')?.value,
        userStoryName: this.userStoryForm.get('userStoryName')?.value,
        userStoryScore: this.userStoryForm.get('userStoryScore')?.value,
        userStoryStateId: this.userStoryForm.get('userStoryStateId')?.value,
        fechaMaxima: this.userStoryForm.get('fechaMaxima')?.value

      }

      this.userStoryService.saveUser_story(data).subscribe(
        (resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Historia de usuario creada',
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
          this.userStoryForm.reset();
          this.dialogRef.close();
        },
      );
    }

  };

  CloseModal(): void {
    this.dialogRef.close();


  }


  upload_image(event: any) {
    let archive = event.target.files
    let reader = new FileReader();

    reader.readAsDataURL(archive[0])
    reader.onloadend = () => {
    }

  }

}
