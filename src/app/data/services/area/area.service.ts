import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private API_SERVER = 'http://localhost:8020/area';

  constructor(private httpClient: HttpClient) {
  }
  public getAllArea():Observable<any>{
    return this.httpClient.get(this.API_SERVER+"/all");
  }
 saveArea(area:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER+"/save/",area)
  }
  getArea(id:string | null):Observable<any>{
    return this.httpClient.get(this.API_SERVER+"/"+id);
  }
  updateArea(id:string,dataArea:any){
    return this.httpClient.put(this.API_SERVER+"/"+id,dataArea);
  }
  deleteArea(id: string,){
    return this.httpClient.delete(this.API_SERVER+"/deletearea/"+id);
  }

}
