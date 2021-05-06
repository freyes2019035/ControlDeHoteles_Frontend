import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { hotelModel } from '../models/hotel/hotel.model';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  apiURL: String = environment.API_URL;
  customHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private httpClient: HttpClient, private globalService: GlobalService){

  }
  getHotelByName(name: String): Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    let body = JSON.stringify(name);
    return this.httpClient.post(`${this.apiURL}hotel/searchByName`,body,{headers: authHeader});
  }
  getHotels(): Observable<any>{
    return this.httpClient.get(`${this.apiURL}hotel`, {headers: this.customHeaders})
  }
  getHotel(id): Observable<any>{
    return this.httpClient.get(`${this.apiURL}hotel/${id}`, {headers: this.customHeaders})
  }
  getRoomHotel(id): Observable<any>{
    return this.httpClient.get(`${this.apiURL}room/hotel/${id}`, {headers: this.customHeaders})
  }
  getHotelEvents(id): Observable<any>{
    return this.httpClient.get(`${this.apiURL}event/hotel/${id}`, {headers: this.customHeaders})
  }
  getHotelServices(id): Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.get(`${this.apiURL}service/hotel/${id}`, {headers: authHeader})
  }
}
