import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-comfig';
import { ProductImageModel } from 'src/app/models/products/product-image.model copy';
import { UploadImageModel } from 'src/app/models/products/upload-image.model';
import { SecurityService } from '../security/security.service';

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {

  entity =  'api/productImage';
  token: String = '';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken();
   }

  getAllRecords():Observable<ProductImageModel[]>{
      return this.http.get<ProductImageModel[]>(`${ServiceConfig.BASE_URL}${this.entity}`,{
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        })
      });
  }

  getRecordById(id:String):Observable<ProductImageModel>{
    return this.http.get<ProductImageModel>(`${ServiceConfig.BASE_URL}${this.entity}/${id}`,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
}

getRecordsByProductId(productId:String):Observable<ProductImageModel[]>{
  return this.http.get<ProductImageModel[]>(`${ServiceConfig.BASE_URL}${this.entity}/${productId}`,{
    headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
    })
  });
}

  UploadProductImage(formData:FormData):Observable<UploadImageModel>{
    return this.http.post<UploadImageModel>(`${ServiceConfig.BASE_URL}${this.entity}`, formData,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }

  editRecord(record:ProductImageModel):Observable<ProductImageModel>{
    return this.http.put<ProductImageModel>(`${ServiceConfig.BASE_URL}${this.entity}`, record,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }

  deleteRecord(recordId:String):Observable<any>{
    console.log('remove image')
    return this.http.delete(`${ServiceConfig.BASE_URL}${this.entity}/${recordId}`,{
      headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
      })
    });
  }
}
