import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { hotelModel } from '../models/hotel/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  apiURL: String = environment.API_URL;
  customHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private httpClient: HttpClient){

  }
  getHotels(): Observable<any>{
    return this.httpClient.get(`${this.apiURL}hotel`, {headers: this.customHeaders})
  }
}
