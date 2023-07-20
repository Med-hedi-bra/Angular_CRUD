import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
    
import { Product } from './product';
import { ProductFilter } from './product.filter';
     
@Injectable({
  providedIn: 'root'
})
export class ProductService {
     
  private apiURL = "http://localhost:3000";
     
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
     
  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/products/')

    .pipe(
      catchError(this.errorHandler)
    )
  }
  getAllFilter(filter: ProductFilter): Observable<any> {
    const params = {
      'name': filter.name,
    };
    return this.httpClient.get(this.apiURL + '/products/' , {params:params})

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  create(product:Product): Observable<any> {

    return this.httpClient.post(this.apiURL + '/products/', JSON.stringify(product), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }  
     
  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/products/' + id)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  update(id:number, product:Product): Observable<any> {

    return this.httpClient.put(this.apiURL + '/products/' + id, JSON.stringify(product), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/products/' + id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
    
    
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}