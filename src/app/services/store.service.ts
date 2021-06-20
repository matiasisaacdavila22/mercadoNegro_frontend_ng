import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {StoreModel } from '../models/store.model';
import { ServiceConfig } from '../config/service-comfig';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  entity = 'api/user/signup';

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
}
