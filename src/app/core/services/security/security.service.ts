import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceConfig } from '../../../config/service-comfig';
import { ChangePasswordModel } from '../../../models/security/change-password.model';
import { PasswordResetModel } from '../../../models/security/password-reset.models';
import { StoreModel } from '../../../models/store/store.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  storeData = new BehaviorSubject<StoreModel>(new StoreModel);

  entity = 'api/user/signin';

  constructor(
    private http: HttpClient
  ) {
    this.verifyCurrentSession();
  }

    verifyCurrentSession(){
      let currentSession = this.getSessionData();
      if(currentSession){
        this.setStoreData(JSON.parse(currentSession));
      }
    }


    setStoreData(store: StoreModel){
      this.storeData.next(store);
    }

    getStoreData(){
      return this.storeData.asObservable();
    }


  StoreLogin(store: StoreModel): Observable<StoreModel>{
      return this.http.post<StoreModel>(`${ServiceConfig.BASE_URL}${this.entity}`,store,{
        headers:new HttpHeaders({
          /*the headers for Example token*/
        })
      })
  }

  PasswordReset(store: PasswordResetModel): Observable<PasswordResetModel>{
    return this.http.post<PasswordResetModel>(`${ServiceConfig.BASE_URL}api/user/password-reset`,store,{
      headers:new HttpHeaders({
        /*the headers for Example token*/
      })
    })
}

changePassword(store: ChangePasswordModel): Observable<ChangePasswordModel>{
  return this.http.post<ChangePasswordModel>(`${ServiceConfig.BASE_URL}api/user/changePassword`,store,{
    headers:new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    })
  })
}

  saveSessionData(sessionData: any): Boolean{
    let currenSession = localStorage.getItem('session');
    if(currenSession){
      return false;
    }else{
      //console.log(sessionData[0].data)
      let data: StoreModel = {
        id: sessionData[0].data.id,
        userId: sessionData[0].data.userId,
        name: sessionData[0].data.name,
        role: sessionData[0].data.role,
        token: sessionData[0].token,
        isLoggend: true
      };
      localStorage.setItem('session', JSON.stringify(data));
      this.setStoreData(data)
      return true;
    }
  }

getSessionData(){
  let currenSession = localStorage.getItem('session');
  return currenSession;
}

sessionExist():Boolean{
  let currentSession = this.getSessionData();
  return (currentSession) ? true: false;
}

verifyRoleInSession(rolId: any): Boolean {
  let currentSession = this.getSessionData();
  if(currentSession){
    let stringCurrentSession = JSON.parse(currentSession);
    return (stringCurrentSession.role == rolId);
  }
return false;
}

getToken():String{
   let currentSession = this.getSessionData();
   if(currentSession){
     let stringCurrentSession = JSON.parse(currentSession);
     return stringCurrentSession.token;
   }
   return '';
}

logout(){
  localStorage.removeItem('session'); //eliminamos la session y setenamos un user new con isloggen en false
  this.setStoreData(new StoreModel());
}


}
