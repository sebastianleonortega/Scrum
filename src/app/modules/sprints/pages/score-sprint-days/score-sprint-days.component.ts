import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SprintsService} from "@app/modules/sprints/pages/service/sprints.service";
import { DateItem } from '../Interface/sprints-interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-score-sprint-days',
  templateUrl: './score-sprint-days.component.html',
  styleUrls: ['./score-sprint-days.component.css']
})
export class ScoreSprintDaysComponent implements OnInit {

  dayForm: FormGroup = new FormGroup({

    date: new FormControl(null, [Validators.required ] ),
    dotteddays: new FormControl(null, [Validators.required  ])
  });

  sprintId: string | null = '';
  arrayDates: any[] =[];
  startDate: any;
  endDate: any;
  currentDate : any;
  DateItem: DateItem[]=[];



  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintsService,

  ) {
  }

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');
     this.getAllDatesSprint();

  }


  // getAllDatesSprint(){
  //   this.sprintService.getSprintById(this.sprintId).subscribe({
  //     next: (data) => {
  //       this.startDate = new Date(data.sprintStart);
  //       this.endDate = new Date(data.sprintEnd);

  //       this.currentDate = this.startDate;

  //       while (this.currentDate <= this.endDate) {
  //         if (this.currentDate.getDay() !== 0) {
  //           const formattedDate = `${this.currentDate.getDate().toString().padStart(2, '0')}/${(this.currentDate.getMonth() + 1).toString().padStart(2, '0')}/${this.currentDate.getFullYear().toString()}`;
  //           const dateItem: DateItem = {
  //             date: formattedDate,
  //             name: 'dain1',
  //           };
  //           this.arrayDates.push(formattedDate);
  //         }
  //         this.currentDate.setDate(this.currentDate.getDate() + 1);
  //       }
  //       console.log(this.DateItem);
  //     }
  //    })
  // }

  getAllDatesSprint() {
    this.sprintService.getSprintById(this.sprintId).subscribe({
      next: (data) => {
        this.startDate = new Date(data.sprintStart);
        this.endDate = new Date(data.sprintEnd);

        this.currentDate = this.startDate;
        this.arrayDates = [];

        while (this.currentDate <= this.endDate) {
          if (this.currentDate.getDay() !== 0) {
            const formattedDate = `${this.currentDate.getDate().toString().padStart(2, '0')}/${(this.currentDate.getMonth() + 1).toString().padStart(2, '0')}/${this.currentDate.getFullYear().toString()}`;
            const dateItem: DateItem = {
              date: formattedDate,

            };
            this.arrayDates.push(dateItem);
          }
          this.currentDate.setDate(this.currentDate.getDate() + 1);
        }
        console.log(this.arrayDates);
      }
    });
  }

  saveDatesSprints(){
    if (this.dayForm.valid) {
      const data = {
        dayp: this.dayForm.get('dotteddays')?.value,
        date: this.dayForm.get('date')?.value,
      }
    }

  }

}
