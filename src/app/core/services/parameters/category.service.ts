import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-comfig';
import { CategoryModel } from 'src/app/models/parameters/category.model';
import { SecurityService } from '../security/security.service';
import { UploadImageModel } from 'src/app/models/products/upload-image.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  entity =  'api/category';
  token: String = '';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken();
   }

  getAllRecords():Observable<CategoryModel[]>{
      return this.http.get<CategoryModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`,{
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        })
      });
  }

  getRecordById(id:String):Observable<CategoryModel>{
    return this.http.get<CategoryModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/edit`,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
}

saveNewRecord(formData:FormData):Observable<UploadImageModel>{
  return this.http.post<UploadImageModel>(`${ServiceConfig.BASE_URL}${this.entity}`, formData,{
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

  deleteRecord(recordId:String):Observable<any>{
    console.log('remove category')
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }
}
