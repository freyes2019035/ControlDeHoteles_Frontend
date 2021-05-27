import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HotelService } from '../../../core/services/hotel.service'
import { hotelModel } from '../../../core/models/hotel/hotel.model'
import { NotificationsService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss'],
  providers: [HotelService]
})
export class HotelDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private hotelService: HotelService, private notificationsService: NotificationsService) { }
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
  generatePDF(){
    this.notificationsService.warning('Loading...', 'The pdf is preparing')
    this.hotelService.generatePDF(this.hotelId).subscribe(data => {
      let name = this.hotel.name;
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = `${name}.pdf`;
      link.click();
    
      this.notificationsService.success('Success', 'PDF Created successfuly')
    }, error  => {
      console.log(error);
      
      this.notificationsService.error('Error', 'Error creating pdf try later')
    })
  }
}
