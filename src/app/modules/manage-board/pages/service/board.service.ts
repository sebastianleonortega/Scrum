import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IBoard } from '../interface/board.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private API_SERVER='http://localhost:8020/board'

  constructor(
    private httpClient:HttpClient
  ) { }

  public getAllBoard():Observable<any>{
    return this.httpClient.get(this.API_SERVER+"/allboards");
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

  deleteBoard(id: string):Observable<IBoard[]>{
    return this.httpClient.delete<IBoard[]>(this.API_SERVER+"/deleteboard/"+id);
  }

  updateBoard(idBoard: String, dataBoard: any){
    return this.httpClient.put(this.API_SERVER+""+idBoard,dataBoard);
  }



}
