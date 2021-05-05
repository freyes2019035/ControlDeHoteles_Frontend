import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/core/services/hotel.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { RoomService } from '../../../core/services/room.service'
import { ReservationService } from '../../../core/services/reservation.service'
import { GlobalService } from 'src/app/core/services/global.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  public reservationForm: FormGroup;
  public roomID;
  public room;
  public roomIDHotel;
  public hotelServices;
  public servicesSelected = [];
  public servicesSelectedRender = [];
  public reservationSuccess:Boolean;
  public reservationInformation;
  public personName;
  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private router: ActivatedRoute,
    private notificationsService: NotificationsService,
    private hotelService: HotelService, 
    private reservationService: ReservationService, private globalService: GlobalService, private route: Router) { }

  ngOnInit(): void {
    this.personName = this.globalService.getIdentity().user.name;
    this.buildForm();
    this.roomID = this.router.snapshot.paramMap.get('id');
    this.getRoom();
    
  }
  getRoom(){
    this.roomService.getRoom(this.roomID).subscribe(room => {
      this.room = room;
      this.roomIDHotel = room[0].hotel;
      console.log(this.roomIDHotel)
      this.getServices(room[0].hotel);
    }, error => {
      console.error(error)
    })
  }
  getServices(hotelId){
    this.hotelService.getHotelServices(hotelId).subscribe(services => {
      this.hotelServices = services;
    }, error => {
      if(error.status === 404){
        console.error('No services found');
      }
    })
  }

  addService(event: Event, service){
    event.preventDefault;
    // This is just for show in the view
    this.servicesSelectedRender.push(service);
    // This is to send to backend
    let newObject = {_id: service._id, subTotal: service.price}
    this.servicesSelected.push(newObject);
    const index = this.hotelServices.indexOf(service);
    if (index > -1) {
      this.hotelServices.splice(index, 1);
    }
  }
  addReservation(event: Event){
    event.preventDefault;
    let formValue = this.reservationForm.value;
    formValue.dateOfArrive = formValue.dateOfArrive.split("-").join("/")
    formValue.dateOfDeparture = formValue.dateOfDeparture.split("-").join("/")
    let reservation = 
    {
      "dateOfArrive": formValue.dateOfArrive,
      "dateOfDeparture": formValue.dateOfDeparture,
      "roomID": this.roomID,
      "hotel": this.roomIDHotel,
      "services": this.servicesSelected
    }
    this.reservationService.createReservation(reservation).subscribe(reservation => {
      console.log(reservation)
      this.reservationInformation = reservation;
      this.reservationForm.markAsPristine()
      this.reservationSuccess = true;
     document.getElementById("btnToClick").click();

    }, error => {
      this.reservationSuccess = false;
      console.error(error)

    })
  }
  buildForm(){
    this.reservationForm = this.formBuilder.group({
      dateOfArrive: ['', [Validators.required]],
      dateOfDeparture: ['', [Validators.required]],
    });
  }
  navigateToHome(){
    this.route.navigateByUrl('/home');
  }
  ok(){
    document.getElementById("btnToClick").click();
  }
}
