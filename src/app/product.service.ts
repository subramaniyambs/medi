import { Injectable } from '@angular/core';
// import { Product } from './student';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Product {
  _id: String;
  productName: String;
  price: String;
  quantity: String;
  // subjects: Array<string>;
  // dob: Date;
  // gender: String;
}
export class ProductService {
   //endpoint: string = 'http://localhost:4000/api';
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
   constructor(private http: HttpClient) { }

  // addProduct(value) {
    
  //   console.log(value);
  //   this.http.post(`${this.endpoint}/add`, value)
  //       .subscribe(res => console.log('Done'));
  // }

  // // Add Product
  // AddProduct(data: Product): Observable<any> {
  //   let API_URL = `${this.endpoint}/add-product`;
  //   return this.http.post(API_URL, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

  // // Get all Products
  // GetProducts() {
  //   return this.http.get(`${this.endpoint}`);
  // }

  // // Get Product
  // GetProduct(id): Observable<any> {
  //   let API_URL = `${this.endpoint}/read-product/${id}`;
  //   return this.http.get(API_URL, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }

  // // Update Product
  // UpdateProduct(id, data: Product): Observable<any> {
  //   let API_URL = `${this.endpoint}/update/${id}`;
  //   return this.http.put(API_URL, data, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // // Delete Product
  // DeleteProduct(id): Observable<any> {
  //   var API_URL = `${this.endpoint}/delete-product/${id}`;
  //   return this.http.delete(API_URL).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // // Error handling 
  // errorMgmt(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }
}
