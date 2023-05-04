import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './pages/board/board.component';
import {ManageBoardRoutingModule} from "@app/modules/manage-board/manage-board-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { BoardSeeComponent } from './pages/board-see/board-see.component';
import { BoardEditComponent } from './pages/board-edit/board-edit.component';




@NgModule({
  declarations: [
    BoardComponent,
    BoardSeeComponent,
    BoardEditComponent
  ],

    imports: [
        CommonModule,
        ManageBoardRoutingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class ManageBoardModule { }
