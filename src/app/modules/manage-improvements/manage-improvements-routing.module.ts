import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageImprovementsComponent } from "@app/modules/manage-improvements/pages/manage-improvements/manage-improvements.component";
import { ImprovementsAddComponent } from './pages/improvements-add/improvements-add.component';
import { ImprovementsSeeComponent } from './pages/improvements-see/improvements-see.component';

const routes: Routes = [
  {
    path: '',
    component: ManageImprovementsComponent
  },
  {
    path: 'add',
    component: ImprovementsAddComponent
  },
  {
    path: 'see/:improvementsId',
    component: ImprovementsSeeComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageImprovementsRoutingModule { }
