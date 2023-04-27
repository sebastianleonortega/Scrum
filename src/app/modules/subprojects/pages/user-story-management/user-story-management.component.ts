import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { User_storyService } from "@app/modules/subprojects/pages/service/user_story.service";
import { ActivatedRoute } from "@angular/router";
import { UserStoyStatusService } from '@app/modules/subprojects/pages/service/user-stoy-status.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-story-management',
  templateUrl: './user-story-management.component.html',
  styleUrls: ['./user-story-management.component.css']
})
export class UserStoryManagementComponent implements OnInit {
  userStoryForm: FormGroup = new FormGroup({});
  userStory: any;
  id: any;
  userStoryState;


  constructor(
    private formBuilder: FormBuilder,
    private userStoryService: User_storyService,
    private route: ActivatedRoute,
    private userStoryStateService: UserStoyStatusService,
    private route1:Router,
    ){
  }

  ngOnInit(): void {
    this.userStoryForm = this.formBuilder.group({
      userStoryName: new FormControl(null, [Validators.required]),
      userStoryArchive: new FormControl(null, []),
      userStoryStateId: new FormControl(null, [Validators.required]),
      userStoryScore: new FormControl(null, [Validators.required]),
      fechaMaxima: new FormControl(null, [Validators.required])
    });

    this.id = this.route.snapshot.paramMap.get('userStoryId');
    this.getUserStoryById(this.id)
    this.getUserStoryState()
  }

  getUserStoryState(){
    this.userStoryStateService.getAlluser_story_status().subscribe(resp =>{
      this.userStoryState = resp;
    })
  }

  getUserStoryById(id: string | null) {
    this.userStoryService.getUserStoryById(id).subscribe(resp => {
        this.userStory = resp;
        this.userStoryForm.patchValue({
          userStoryName: this.userStory.userStoryName,
          userStoryStateId: this.userStory.userStoryStateId,
          userStoryScore: this.userStory.userStoryScore,
          fechaMaxima: this.userStory.fechaMaxima,
        });
      },
    );
  }

  edit() {
    if (this.userStoryForm.valid) {
      const data = {
        userStoryArchive: this.userStoryForm.get('userStoryArchive')?.value,
        userStoryName: this.userStoryForm.get('userStoryName')?.value,
        userStoryStateId: this.userStoryForm.get('userStoryStateId')?.value,
        userStoryScore: this.userStoryForm.get('userStoryScore')?.value,
        fechaMaxima: this.userStoryForm.get('fechaMaxima')?.value
      }
      this.userStoryService.updateUserStory(this.id, data).subscribe(
        (resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Historia de usuario editada  ',
            showConfirmButton: false,
            timer: 1500
          })
        },
        );
        this.route1.navigateByUrl('app/user-story').then();
        this.userStoryForm.reset();
    }

  }
}
