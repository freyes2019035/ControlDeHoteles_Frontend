import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../../core/services/hotel.service'
import { hotelModel } from '../../../core/models/hotel/hotel.model'
import { NotificationsService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    HotelService
  ]
})
export class HomeComponent implements OnInit {
  hotels:Array<hotelModel> = [];
  constructor(private hotelService: HotelService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getHotels()
  }
  getHotels(){
    this.hotelService.getHotels().subscribe(data => {
      this.hotels = data;
    }, err => {
      this.notificationsService.error('Error', 'Error connecting to API')
    })
    
  }

}
