import { Component, OnInit  } from '@angular/core';
import { SubprojectService} from '@app/modules/proyect/pages/service/subproject.service';
import { ActivatedRoute, Router } from "@angular/router";
import { SubprojectById } from '@app/data/interfaces/subprojects';
import { User_storyService } from '@app/modules/subprojects/pages/service/user_story.service';
import { UserStory } from '@app/data/interfaces/userStory';

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
   userStory: UserStory = {
    subProjectId: 0,
    userStoryId: 0,
    userStoryStateId: 0,
    userStoryArchive: '',
    userStoryName: '',
    userStoryScore: 0,
  };


  constructor(

    private subprojectService: SubprojectService,
    private route: ActivatedRoute,
    private UserStoryService: User_storyService,

  ){}

  ngOnInit(): void {

    this.subProjectId = this.route.snapshot.paramMap.get('subProjectId');
    this.getSubProjectById(this.subProjectId)
    this.getAllUserStoryToSubproject(this.subProjectId)

  }

  getAllUserStoryToSubproject(subProjectId){
    this.UserStoryService.getAllUserStoryToSubproject(subProjectId).subscribe({
      next:(rep)=> {
        this.userStory = rep;
      },
    });
  }


  getSubProjectById(id: string | null) {
    this.subprojectService.getSubProjectById(id).subscribe({
      next:(res)=> {
          this.subproject = res;
      },
    });
  }

}
