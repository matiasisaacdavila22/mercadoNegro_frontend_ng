import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-comfig';
import { ProductModel } from 'src/app/models/products/product.model';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  entity =  'api/product';
  token: String = '';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken();
   }

  getAllRecords():Observable<ProductModel[]>{
      return this.http.get<ProductModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`,{
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        })
      });
  }

  getRecordById(id:String):Observable<ProductModel>{
    return this.http.get<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/edit`,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
}

  saveNewRecord(record:ProductModel):Observable<ProductModel>{
    return this.http.post<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }

  editRecord(record:ProductModel):Observable<ProductModel>{
    return this.http.put<ProductModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record,{
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


