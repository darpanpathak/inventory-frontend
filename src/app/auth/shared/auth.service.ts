import { IAPIResponse } from './../../shared/classes/api-response';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(payload) : Observable<IAPIResponse>{
    return this.http.post<IAPIResponse>(`${environment.baseURL}/auth/signup`, payload);
  }

  login(payload) : Observable<IAPIResponse>{
    return this.http.post<IAPIResponse>(`${environment.baseURL}/auth/login`, payload);
  }
}
