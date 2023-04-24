import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {User_storyService} from "@app/data/services/user_story/user_story.service";
import {UserStory} from "@app/data/interfaces/userStory";
import {SubprojectService} from "@app/data/services/subproject/subproject.service";
import { UserStoyStatusService } from '@app/data/services/user-story-status/user-stoy-status.service';

@Component({
  selector: 'app-user-story-add',
  templateUrl: './user-story-add.component.html',
  styleUrls: ['./user-story-add.component.css']
})

export class UserStoryAddComponent implements OnInit {

  userStoryForm: FormGroup = new FormGroup({});
  userStory: UserStory | any;
  subProjects: any;
  userStoryState: any;

  constructor(
    private formBuilder: FormBuilder,
    private userStoryService: User_storyService,
    private subProjectService : SubprojectService,
    private userStoryStatusService: UserStoyStatusService
  ) {
  }

  ngOnInit(): void {

    this.userStoryForm = this.formBuilder.group({
      subProjectId: new FormControl(null, [Validators.required]),
      userStoryName: new FormControl(null, [Validators.required]),
      userStoryArchive: new FormControl(),
      userStoryStateId: new FormControl(null, [Validators.required]),
      userStoryScore: new FormControl(null, Validators.required),
      fechaMaxima: new FormControl(null, Validators.required)
    });

    this.getAllSubprojects()
    this. getAllUserStory()
    this.getAlluserStoryStatus()
  }
  getAllUserStory(){
    this.userStoryService.getAllUser_story().subscribe(resp => {
        this.userStory = resp;
      },
    );
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
            title: 'Historia de Usuario creada',
            showConfirmButton: false,
            timer: 1500
          })
          this.userStoryForm.reset();
          this. getAllUserStory()
        },
      );
    }

  };


  upload_image(event: any) {
    let archive = event.target.files
    let reader = new FileReader();

    reader.readAsDataURL(archive[0])
    reader.onloadend = () => {
    }

  }

}