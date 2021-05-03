import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HotelService } from '../../../core/services/hotel.service'
import { hotelModel } from '../../../core/models/hotel/hotel.model'

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss'],
  providers: [HotelService]
})
export class HotelDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private hotelService: HotelService) { }
  public error: Boolean;
  public hotelId;
  public hotel: hotelModel;
  public rooms;
  public events;
  ngOnInit(): void {
    this.getHotelID()
    this.getHotel();
    this.getHotelRoom()
    this.getHotelEvents()
  }
  getHotelID(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.hotelId = params.id;
        this.error = false;
      }else{
        this.error = true
      }
    }, error => {
      this.error = true;
      console.error(error)
    })
  }
  getHotel(){
    this.hotelService.getHotel(this.hotelId).subscribe(hotel => {
      this.hotel = hotel;
      this.error = false;
    }, error => {
      this.error = true;
      console.error(error);
    });
  }
  getHotelRoom(){
    this.hotelService.getRoomHotel(this.hotelId).subscribe(rooms => {
      this.rooms = rooms;
      console.log(rooms)
      this.error = false;
    }, error => {
      this.error = true;
      console.error(error);
    });
  }
  getHotelEvents(){
    this.hotelService.getHotelEvents(this.hotelId).subscribe(events => {
      console.log(events)
      this.events = events
      this.error = false;
    }, error => {
      this.error = true
      console.error(error)
    })
  }
  refreshPage(){
    window.location.reload()
  }
}
