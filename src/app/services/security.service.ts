import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../config/service-comfig';
import { StoreModel } from '../models/store.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  entity = 'api/user/signin';

  constructor(
    private http: HttpClient
  ) { }

  StoreLogin(store: StoreModel): Observable<StoreModel>{
      return this.http.post<StoreModel>(`${ServiceConfig.BASE_URL}${this.entity}`,store,{
        headers:new HttpHeaders({
          /*the headers for Example token*/
        })
      })
  }

  saveSessionData(sessionData: any): Boolean{
    let currenSession = localStorage.getItem('session');
    if(currenSession){
      return false;
    }else{
      let data: StoreModel = {
        id: sessionData.data.id,
        userId: sessionData.data.userId,
        name: sessionData.data.name,
        role: sessionData.data.rol,
        token: sessionData.token,
        isLoggend: true
      };
      localStorage.setItem('session', JSON.stringify(data));
      return true;
    }
  }
}
