import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private API_SERVER='http://localhost:8020/board'

  constructor(
    private httpClient:HttpClient
  ) { }

  public getAllBoard():Observable<any>{
    return this.httpClient.get(this.API_SERVER+"/all");
  }
  public saveBoard(board:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER+"/saveboard",board);
  }


  getUserStoryTeam(teamId: string): Observable<any>{
    return this.httpClient.get('http://localhost:8020/userstory/userstoryteam/'+teamId);
  }

  getEmployees(): Observable<any>{
    return this.httpClient.get('http://localhost:8020/employee/all');
  }




}
