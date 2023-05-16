import {Component, OnInit} from '@angular/core';
import {SprintsService} from "@app/modules/sprints/pages/service/sprints.service";
import { Sprints } from '../Interface/sprints-interfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { SprintAddComponent } from '../sprint-add/sprint-add.component';


@Component({
  selector: 'app-manage-sprints',
  templateUrl: './manage-sprints.component.html',
  styleUrls: ['./manage-sprints.component.css']
})
export class ManageSprintsComponent implements OnInit {


  sprints: Sprints[]=[];
  currenDate = new Date();

  constructor(
    public sprintService: SprintsService,
    private route: Router,
    private dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    this.getAllSprints();
  }

  getAllSprints() {
    this.sprintService.getAllASprint().subscribe((data) => {
      this.sprints = data;

    })
  }

  sendToChosenButton(sprint, route: string) {
    let dateSprintEnd = new Date(sprint.sprintEnd)
    dateSprintEnd.setDate(dateSprintEnd.getDate() + 1);
    if (dateSprintEnd >= this.currenDate) {
      switch (route) {
        case 'calculate_points_sprint': {
          this.route.navigateByUrl('/app/sprints/calculateSprintPoints/' + sprint.sprintId + '/' + sprint.teamId).then();
          break;
        }
        default: {
          break;
        }
        case 'add-userStory-sprint': {
          this.route.navigateByUrl('/app/sprints/add-userStory-sprint/'+sprint.team.areaId+'/'+sprint.sprintId).then();
          break;
        }
        case 'score-sprint-days':{
          this.route.navigateByUrl('/app/sprints/score-sprint-days/'+sprint.sprintId)
        }
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: '¡No es Posible Realizar esta acción!',
        text: 'El Sprint ya Culminó'
      })
    }
  }

AddSprintModal():void{
  const dialogRef = this.dialog.open(SprintAddComponent, {width: '500px', maxHeight: '600px'})
  dialogRef.afterClosed().subscribe({
    next: (resp)=>{
      this.getAllSprints();
    }
  })
}


}

