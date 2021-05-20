import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  searchForm: FormGroup;
  isLoading: Boolean;
  identity;
  isError: Boolean;
  reservationsFound = [];
  stateOfReservation: Boolean;
  roomFree = [];
  userFound = [];
  temporal = [];
  constructor(
    private reservationService: ReservationService,
    private globalService: GlobalService, 
    private notificationsService: NotificationsService,
    private hotelService: HotelService, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.identity = this.globalService.getIdentity();
    this.getReservetationOfHotel()
    this.buildForm();
    this.searchPerson();
  }

  getReservetationOfHotel(){
    const hotelEmail = this.identity.user;
    this.isLoading = true;
    this.hotelService.getHotelByEmail(hotelEmail).subscribe(hotel => {
        this.reservationService.getReservetationOfHotel(hotel[0]._id).subscribe(reservations => {
          this.filterArray(reservations)
          reservations.map(reserv => {
            let reservDate = new Date(reserv.dateOfDeparture).toISOString().substring(0,10)
            let arriveDate = new Date(reserv.dateOfArrive).toISOString().substring(0,10)
            let currentDate = new Date().toISOString().substring(0,10);
            
            if(reservDate <= currentDate){
              reserv.status = 'Finalizada';
              this.temporal.push(reserv);
              this.stateOfReservation = false;
            }else if(arriveDate > currentDate){
                reserv.status = 'Pendiente'
            }else if(reservDate > currentDate){
              this.stateOfReservation = true;
              reserv.status = 'En proceso'
            }
            
          })
          this.filterArray(this.temporal);
          this.reservationsFound = reservations;
          this.isLoading = false;
        }, error => {
          this.isError = true;
          this.notificationsService.error('Error !!', 'Something went wrong getting the data')
        })
        
    }, error => {
      this.isError = true;
      this.notificationsService.error('Error !!', 'Something went wrong verifying your hotel') 
    })
  }
  searchPerson(){
    this.userFound = [];
    this.searchForm.get('searchPerson').valueChanges.subscribe(data => {
      this.userFound = [];
      if(data === ""){
        this.userFound = [];
      }else{
        this.reservationsFound.map(reservation => {
            let dataReceived = data;
            let regex = new RegExp(dataReceived, "g");
            let userName = String(reservation.user.name + " " + reservation.user.lastName);
            let found = userName.match(regex);
            if(found){
              this.userFound.push({"reservation": reservation, "user": reservation.user})
            }
        });
      }

    })
  }
  buildForm(){
    this.searchForm = this.formBuilder.group({
      searchPerson: ['', [Validators.required]],
    })
  }
  filterArray(array: any[]){
    let filtered = array.filter(obj => !array[obj.roomID._id] && (array[obj.roomID._id] = true));
    this.roomFree = filtered;
  }
}
