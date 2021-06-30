import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-comfig';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  entity =  'api/brand';
  token: String = '';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken();
   }

  getAllRecords():Observable<BrandModel[]>{
      return this.http.get<BrandModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`,{
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        })
      });
  }

  getRecordById(id:String):Observable<BrandModel>{
    return this.http.get<BrandModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/edit`,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
}

  saveNewRecord(record:BrandModel):Observable<BrandModel>{
    return this.http.post<BrandModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }

  editRecord(record:BrandModel):Observable<BrandModel>{
    return this.http.put<BrandModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }

  deleteRecord(recordId:String):Observable<any>{
    console.log('remove brand')
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }
}

