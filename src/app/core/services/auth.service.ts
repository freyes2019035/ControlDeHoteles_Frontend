import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userModel } from '../models/user/user.model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL: String = environment.API_URL;
  customHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private httpClient: HttpClient) { }

  login(user, getToken = null): Observable<any>{
    if(getToken){
      user.getToken = 'true';
    }
    const body = JSON.stringify(user)
    return this.httpClient.post(`${this.apiURL}auth/login`, body, {headers: this.customHeaders})
  }
  register(user): Observable<any>{
    const body = JSON.stringify(user);
    return this.httpClient.post(`${this.apiURL}auth/register`, body, {headers: this.customHeaders})
  }


}


