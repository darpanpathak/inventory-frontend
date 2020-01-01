import { IAPIResponse } from './../../shared/classes/api-response';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.baseURL}/product/list`);
  }

  createProduct(payload) : Observable<IAPIResponse>{
    return this.http.post<IAPIResponse>(`${environment.baseURL}/product/create`, payload);
  }

  updateProduct(payload, id):Observable<IAPIResponse>{
    return this.http.put<IAPIResponse>(`${environment.baseURL}/product/update/${id}`, payload);
  }

  deleteProduct(id): Observable<IAPIResponse>{
    return this.http.delete<IAPIResponse>(`${environment.baseURL}/product/delete/${id}`);
  }

  getCategorries(){
    return this.http.get<IAPIResponse>(`${environment.baseURL}/category/list`);
  }
  
}
