import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Team} from "@app/modules/teams/pages/interface/team";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private API_SERVER = 'http://localhost:8020/team';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getAllTeams(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "/all");
  }

  public saveTeam(manage_teams: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "/save", manage_teams);
  }

  getTeamById(id: string | null): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "/" + id);
  }

  updateTeam(id: string, team: Team) {
    return this.httpClient.put(this.API_SERVER + "/" + id, team);
  }

  addEmployeeTeam(teamId: string | null,teamEmployee: string[]): Observable<any> {
    return this.httpClient.put(this.API_SERVER + "/saveemployetoteam/"+teamId, teamEmployee  );
  }
  getTeamArea(areaId: string): Observable<any>{
    return this.httpClient.get('http://localhost:8020/team/area/'+areaId);
  }
}
