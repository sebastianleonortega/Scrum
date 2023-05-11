import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImprovementsService {
  private API_SERVER = 'http://localhost:8020/improvements/';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getAllImprovements(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "/all");
  }

  public saveImprovements(improvements: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + 'saveimprovements', improvements)
  }

  getTeamArea(areaId: string): Observable<any>{
    return this.httpClient.get('http://localhost:8020/team/area/'+areaId);
  }

  GetAllTask():Observable<any>{
    return this.httpClient.get(this.API_SERVER+'http://localhost:8020/task/all')
  }
  GetAllObservations():Observable<any>{
    return this.httpClient.get(this.API_SERVER+'http://localhost:8020/observation/all')
  }

}





