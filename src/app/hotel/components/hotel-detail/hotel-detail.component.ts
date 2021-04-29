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
  public hotel: hotelModel;
  public rooms;
  ngOnInit(): void {
    this.getHotelID()
    this.getHotelRoom()
  }

  getHotelID(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.hotelService.getHotel(params.id).subscribe(hotel => {
          this.hotel = hotel;
          this.error = false;
        }, error => {
          this.error = true;
          console.error(error);
        });
      }else{
        this.error = true;
      }
      
    })
  }
  getHotelRoom(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.hotelService.getRoomHotel(params.id).subscribe(rooms => {
          this.rooms = rooms;
          console.log(rooms)
          this.error = false;
        }, error => {
          this.error = true;
          console.error(error);
        });
      }else{
        this.error = true;
      }
      
    })
  }

}
