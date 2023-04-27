import { Injectable } from '@angular/core';
import {Observable, observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserStoyStatusService {

  private API_SERVER = 'http://localhost:8020/userstorystatus';


  constructor( private httpCliente: HttpClient) { }

  public getAlluser_story_status(): Observable<any>{
    return this.httpCliente.get(this.API_SERVER+"/statusall")
  }
}
