import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-comfig';
import { CategoryModel } from 'src/app/models/parameters/category.model';
import { SecurityService } from '../security.service';

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

  saveNewRecord(record:CategoryModel):Observable<CategoryModel>{
    return this.http.post<CategoryModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }

  editRecord(record:CategoryModel):Observable<CategoryModel>{
    return this.http.put<CategoryModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }

  deleteRecord(recordId:String):Observable<any>{
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }
}
