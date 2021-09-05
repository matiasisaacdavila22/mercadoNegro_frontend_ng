import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceConfig } from 'src/app/config/service-comfig';
import { ProductModel } from 'src/app/models/products/product.model';
import { SecurityService } from '../security/security.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
//import * as Sentry from '@sentry/browser';

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
      })
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
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

  editState(id:String, status:number):Observable<any>{
    return this.http.put<any>(`${ServiceConfig.BASE_URL}${this.entity}/${id}/status`, {status},{
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
    })
    .pipe(
      retry(2),
      catchError(this.handleError),
    );
  }


  getRandomUsers(): Observable<ProductModel[]> {
    return this.http.get('https://randomuser.me/api/?results=2')
    .pipe(
      retry(2),
      catchError(this.handleError),
      map((response: any) => response.results as ProductModel[]),
    );
  }

  getFile() {
    return this.http.get('assets/files/test.txt', {responseType: 'text'});
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    //Sentry.captureException(error);
    return throwError('ups algo salio mal');
  }
}


