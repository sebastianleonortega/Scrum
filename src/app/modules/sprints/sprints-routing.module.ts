import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSprintsComponent } from "@app/modules/sprints/pages/manage-sprints/manage-sprints.component";
import { SprintsUpdateComponent } from "@app/modules/sprints/pages/add-userStory-sprint/sprints-update.component";
import {CalculateSprintPointsComponent} from "@app/modules/sprints/pages/calculate-sprint-points/calculate-sprint-points.component";
import {EditEmployeeSprintComponent} from "@app/modules/sprints/pages/edit-employee-sprint/edit-employee-sprint.component";
import {ScoreSprintDaysComponent} from "@app/modules/sprints/pages/score-sprint-days/score-sprint-days.component";
import { SprintAddComponent } from './pages/sprint-add/sprint-add.component';


const routes: Routes = [
  {
    path: '',
    component: ManageSprintsComponent
  },
  {
    path:'add-userStory-sprint/:areaId/:sprintId',
    component: SprintsUpdateComponent
  },
  {
    path: 'calculateSprintPoints/:sprintId/:teamId',
    component: CalculateSprintPointsComponent
  },
  {
    path: 'edit-add-employee-sprint/:sprintEmployeeId/:sprintDays/:sprintId/:teamId',
    component: EditEmployeeSprintComponent
  },
  {
    path: 'score-sprint-days/:sprintId',
    component: ScoreSprintDaysComponent
  },
  {
    path: 'sprint-add',
    component: SprintAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintsRoutingModule {
}
