import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  apiURL = environment.API_URL;
  customHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private httpClient: HttpClient,  private globalService: GlobalService) { }

  getRoom(id): Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.get(`${this.apiURL}room/${id}`,{headers: authHeader})
  }
}
