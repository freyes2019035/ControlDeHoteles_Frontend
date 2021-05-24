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
  getHotelByEmail(email): Observable<any>{
    let body = JSON.stringify(email);
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.post(`${this.apiURL}hotel/getHotelByEmail/`, body ,{headers: authHeader})
  }
  getTypeOfEvents(): Observable<any>{
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.get(`${this.apiURL}TEvent/`, {headers: authHeader})
  }
  createEvent(event): Observable<any>{
    let body = JSON.stringify(event);
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.post(`${this.apiURL}event/create`, body ,{headers: authHeader})
  }
  createServiceExtra(service): Observable<any>{
    let body = JSON.stringify(service);
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.post(`${this.apiURL}service/create`, body ,{headers: authHeader})
  }
  createHotel(hotel){
    let body = JSON.stringify(hotel);
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.post(`${this.apiURL}hotel/create`, body ,{headers: authHeader})
  }
  updateHotel(id, hotel){
    let body = JSON.stringify(hotel);
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.put(`${this.apiURL}hotel/update/${id}`, body ,{headers: authHeader})
  }
  deleteHotel(id){
    let authHeader = this.customHeaders.set('Authorization', this.globalService.getToken())
    return this.httpClient.delete(`${this.apiURL}hotel/delete/${id}`, {headers: authHeader})
  }
}
