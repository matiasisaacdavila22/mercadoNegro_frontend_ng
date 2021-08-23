import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStoreModel } from 'src/app/models/store/userStore.model';
import { SecurityService } from '../security/security.service';
import { ServiceConfig } from 'src/app/config/service-comfig';
import { UploadImageModel } from 'src/app/models/products/upload-image.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  entity =  'api/user';
  token: String = '';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken()
   }


getAllRecords(storeId:String):Observable<UserStoreModel[]>{
  return this.http.post<UserStoreModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`,{storeId},{
    headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
    })
  });
}

deleteRecord(recordId:String):Observable<any>{
  console.log('remove User')
  return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`,{
    headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
    })
  });
}

getRecordById(id:string):Observable<UserStoreModel>{
  return this.http.get<UserStoreModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/`,{
    headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
    })
  });
}

editRecord(formData:FormData):Observable<UploadImageModel>{
  return this.http.put<UploadImageModel>(`${ServiceConfig.BASE_URL}${this.entity}`, formData,{
    headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
    })
  });
}

}
