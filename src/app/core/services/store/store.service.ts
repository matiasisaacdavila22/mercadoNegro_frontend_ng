import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {StoreModel } from '../../../models/store/store.model';
import { ServiceConfig } from '../../../config/service-comfig';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  entity = 'api/user/signup';

  entityStore = 'api/store';

  constructor(
    private http: HttpClient
  ) { }

  StoreRegistering(store: StoreModel): Observable<StoreModel>{
      return this.http.post<StoreModel>(`${ServiceConfig.BASE_URL}${this.entity}`,store,{
        headers:new HttpHeaders({
          /*the headers for Example token*/
        })
      })
  }

  getAllRecords():Observable<StoreModel[]>{
    return this.http.get<StoreModel[]>(`${ServiceConfig.BASE_URL}${this.entityStore}`,{
      headers: new HttpHeaders({
        //  Authorization: `Bearer ${this.token}`
      })
    });
}

getRecordById(id:String):Observable<StoreModel>{
  return this.http.get<StoreModel>(`${ServiceConfig.BASE_URL}${this.entityStore}/${id}`,{
    headers: new HttpHeaders({
      //  Authorization: `Bearer ${this.token}`
    })
  });
}

}
