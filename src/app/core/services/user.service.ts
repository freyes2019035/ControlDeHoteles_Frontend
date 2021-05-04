import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = environment.API_URL;
  customHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private httpClient: HttpClient,  private globalService: GlobalService) { }


  getUser(): Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.get(`${this.apiURL}user/getUser/`,{headers: authHeader})
  }
  updateUser(user): Observable<any>{
    let params = JSON.stringify(user);
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.put(`${this.apiURL}user/updateAccount`,params,{headers: authHeader})
  }
  getAllServices() :Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.get(`${this.apiURL}reservation/my`, {headers: authHeader})
  }
}
