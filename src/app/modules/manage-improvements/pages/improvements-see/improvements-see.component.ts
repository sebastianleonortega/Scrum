import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImprovementsService } from '../service/improvements.service';
import { ManageImprovements } from '../Interface/manage-improvements';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-improvements-see',
  templateUrl: './improvements-see.component.html',
  styleUrls: ['./improvements-see.component.css']
})
export class ImprovementsSeeComponent implements OnInit{

  improvementsForm: FormGroup = new FormGroup({
    areaName: new FormControl({value:null, disabled: true }),
    teamName: new FormControl(null, [Validators.required]),
    userStoryName: new FormControl(null, [Validators.required]),
    nameTask: new FormControl(null, [Validators.required]),
    observationName: new FormControl(null, [Validators.required]),
    observationn: new FormControl(null, [Validators.required, Validators.maxLength(200)])
  });

  improvements : ManageImprovements[]=[];
  improvementsId: any;

  constructor(
    private improvementsService:ImprovementsService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.improvementsId = this.route.snapshot.paramMap.get('improvementsId');


    this.getImprovementsById(this.improvementsId);
  }

  getImprovementsById(id: string ){
    this.improvementsService.getImprovementsById(id).subscribe(resp => {
      this.improvements = resp;

        // this.improvementsForm.patchValue({
        //   areaName: this.improvements.areaName,
        //   teamName: this.improvements.teamName,
        //   userStoryName: this.improvements.userStoryName,
        //   nameTask: this.improvements.nameTask,
        //   observationName: this.improvements.observationName,
        //   observationn: this.improvements.observationn,
        // });
    })
  }



}
