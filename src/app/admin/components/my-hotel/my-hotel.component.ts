import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { HotelService } from 'src/app/core/services/hotel.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.scss']
})
export class MyHotelComponent implements OnInit {
  isLoading: Boolean;
  identity;
  isError: Boolean;
  reservationsFound = [];
  stateOfReservation: Boolean;
  constructor(
    private reservationService: ReservationService,
    private globalService: GlobalService, 
    private notificationsService: NotificationsService,
    private hotelService: HotelService) { }

  ngOnInit(): void {
    this.identity = this.globalService.getIdentity();
    this.getReservetationOfHotel()
  }

  getReservetationOfHotel(){
    const hotelEmail = this.identity.user;
    this.hotelService.getHotelByEmail(hotelEmail).subscribe(hotel => {
        this.reservationService.getReservetationOfHotel(hotel[0]._id).subscribe(reservations => {
          reservations.map(reserv => {
            let reservDate = new Date(reserv.dateOfDeparture).toISOString().substring(0,10)
            let currentDate = new Date().toISOString().substring(0,10);
            
            if(reservDate <= currentDate){
              reserv.status = 'Finalizada'
              this.stateOfReservation = false;
            }else if(reservDate > currentDate){
              this.stateOfReservation = true;
              reserv.status = 'En proceso'
            }
            
          })
          this.reservationsFound = reservations;
        }, error => {
          this.isError = true;
          this.notificationsService.error('Error !!', 'Something went wrong getting the data')
        })
    }, error => {
      this.isError = true;
      this.notificationsService.error('Error !!', 'Something went wrong verifying your hotel') 
    })
  }
}
