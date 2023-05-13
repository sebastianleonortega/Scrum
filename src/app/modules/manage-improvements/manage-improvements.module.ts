import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageImprovementsRoutingModule } from './manage-improvements-routing.module';
import { ManageImprovementsComponent } from './pages/manage-improvements/manage-improvements.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ImprovementsAddComponent } from './pages/improvements-add/improvements-add.component';
import { ImprovementsSeeComponent } from './pages/improvements-see/improvements-see.component';


@NgModule({
  declarations: [
    ManageImprovementsComponent,
    ImprovementsAddComponent,
    ImprovementsSeeComponent
  ],
  imports: [
    CommonModule,
    ManageImprovementsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ManageImprovementsModule { }
