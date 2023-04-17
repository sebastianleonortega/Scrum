import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserStoryComponent} from "@app/modules/subprojects/pages/user-story/user-story.component";
import {UserStoryManagementComponent} from "@app/modules/subprojects/pages/user-story-management/user-story-management.component";
import { UserStoryAddComponent } from '../subprojects/pages/user-story-add/user-story-add.component';

const routes: Routes = [
  {
    path: '',
    component: UserStoryComponent
  },
  {
    path:'user_story_management_form/:userStoryId',
    component: UserStoryManagementComponent
  },
  {
    path: 'subprojet-add',
    component: UserStoryAddComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubprojectsRoutingModule { }
