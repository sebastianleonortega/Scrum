import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardComponent} from "@app/modules/manage-board/pages/board/board.component";
import { BoardSeeComponent } from './pages/board-see/board-see.component';



const routes: Routes = [
  {
    path: '',
    component: BoardComponent
  },
  {
    path: 'Boardsee',
    component: BoardSeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBoardRoutingModule { }
