import { Component, OnInit  } from '@angular/core';
import { SubprojectService} from '@app/data/services/subproject/subproject.service';
import { ActivatedRoute, Router } from "@angular/router";
import { SubprojectById } from '@app/data/interfaces/subprojects';


@Component({
  selector: 'app-subprojetc-see',
  templateUrl: './subprojetc-see.component.html',
  styleUrls: ['./subprojetc-see.component.css']
})
export class SubprojetcSeeComponent implements OnInit {

  subproject: SubprojectById = {
    projectId:0,
    subProjectId:0,
    subProjectName: '',
    projectName:''
  };
  subProjectId: string | null = '';


  constructor(

    private subprojectService: SubprojectService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {

    this.subProjectId = this.route.snapshot.paramMap.get('subProjectId');
    this.getSubProjectById(this.subProjectId)

  }

  getSubProjectById(id: string | null) {
    this.subprojectService.getSubProjectById(id).subscribe({
      next:(res)=> {
          this.subproject = res;
          console.log(res)
      },
    });
  }

}
