import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { UserStory } from '@app/modules/subprojects/pages/Interface/userStory';


@Injectable({
  providedIn: 'root'
})
export class User_storyService {
 private API_SERVER='http://localhost:8020/userstory';
  constructor(
    private httpClient:HttpClient
  ) { }

  public getAllUser_story():Observable<any>{
    return this.httpClient.get(this.API_SERVER+"/userstory/all");
  }
  public saveUser_story(user_story:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER+"/save",user_story);
  }
  getUserStoryById(id:string | null):Observable<any>{
    return this.httpClient.get(this.API_SERVER+"/"+id);
  }
  updateUserStory(id:string,dataUserStory:any){
    return this.httpClient.put(this.API_SERVER+"/"+id,dataUserStory);
  }
  public getAllUserStoryToSubproject(subProjectId: string | null):Observable<UserStory>{
    return this.httpClient.get<UserStory>(this.API_SERVER+"/subproject/"+subProjectId)
  }
  public getUserStoryToTeam(teamId: string){
    return this.httpClient.get(this.API_SERVER+'/userstoryteam/'+teamId)
  }
}
