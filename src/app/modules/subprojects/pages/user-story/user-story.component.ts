import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User_storyService} from "@app/data/services/user_story/user_story.service";
import {UserStory} from "@app/data/interfaces/userStory";
import {SubprojectService} from "@app/data/services/subproject/subproject.service";
import { MatDialog } from '@angular/material/dialog';
import { UserStoryAddComponent } from '../user-story-add/user-story-add.component';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {

  userStoryForm: FormGroup = new FormGroup({});
  userStory: UserStory | any;
  subProjects: any;

  constructor(
    private formBuilder: FormBuilder,
    private userStoryService: User_storyService,
    private subProjectService : SubprojectService,
  ) {
  }

  ngOnInit(): void {

    this.userStoryForm = this.formBuilder.group({
      subProjectId: new FormControl(null, [Validators.required]),
      userStoryName: new FormControl(null, [Validators.required]),
      userStoryArchive: new FormControl(null, [Validators.required]),
      userStoryStateId: new FormControl(null, [Validators.required]),
      userStoryStateName: new FormControl(null, [Validators.required]),
      userStoryScore: new FormControl(null, Validators.required),
      fechaMaxima: new FormControl(null, Validators.required)
    });

    this.getAllSubprojects()
    this. getAllUserStory()
  }
  getAllUserStory(){
    this.userStoryService.getAllUser_story().subscribe(resp => {
        this.userStory = resp;
      },
    );
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
        fechaMaxima: this.userStoryForm.get('fechaMaxima')?.value,
        userStoryStateName: this.userStoryForm.get('userStoryStateName')
      }
      this.userStoryService.saveUser_story(data).subscribe(
        (resp) => {
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
