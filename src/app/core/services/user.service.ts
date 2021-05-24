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

  getUsers(): Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.get(`${this.apiURL}user/getUsers/`,{headers: authHeader})
  }
  getUser(): Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.get(`${this.apiURL}user/getUser/`,{headers: authHeader})
  }
  getUserById(id: any): Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.get(`${this.apiURL}user/getUserById/${id}`,{headers: authHeader})
  }
  updateUser(user): Observable<any>{
    let params = JSON.stringify(user);
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.put(`${this.apiURL}user/updateAccount`,params,{headers: authHeader})
  }
  updateUserById(id, user): Observable<any>{
    let params = JSON.stringify(user);
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.put(`${this.apiURL}user/updateAccountById/${id}`,params,{headers: authHeader})
  }
  getAllServices() :Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.get(`${this.apiURL}reservation/my`, {headers: authHeader})
  }
  deleteMyAccount(): Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.delete(`${this.apiURL}user/deleteAccount`, {headers: authHeader})
  }
  deleteAccountById(id): Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.delete(`${this.apiURL}user/deleteAccountById/${id}`, {headers: authHeader})
  }
}
