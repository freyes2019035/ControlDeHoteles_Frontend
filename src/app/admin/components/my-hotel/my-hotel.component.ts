import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/services/global.service';
import { HotelService } from 'src/app/core/services/hotel.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.scss']
})
export class MyHotelComponent implements OnInit {
  searchForm: FormGroup;
  addRoom: FormGroup;
  eventForm: FormGroup;
  serviceForm: FormGroup;
  isLoading: Boolean;
  identity;
  isError: Boolean;
  reservationsFound = [];
  stateOfReservation: Boolean;
  roomFree = [];
  userFound = [];
  temporal = [];
  images = [];
  eventImages = [];
  hotelInfo = [];
  events = [];
  typeOfEvent = []
  constructor(
    private reservationService: ReservationService,
    private globalService: GlobalService, 
    private notificationsService: NotificationsService,
    private hotelService: HotelService, 
    private formBuilder: FormBuilder,
    private roomService: RoomService) { }

  ngOnInit(): void {
    this.identity = this.globalService.getIdentity();
    this.getReservetationOfHotel()
    this.buildForm();
    this.searchPerson();
    this.getTypeOfEvents();
    const hotelEmail = this.identity.user;
    this.hotelService.getHotelByEmail(hotelEmail).subscribe(hotel => {
      this.hotelInfo = hotel;
    });
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
  addImageOfEvent(event: Event){
    event.preventDefault;
    if(this.eventImages.includes(this.eventForm.get('images').value)){
      this.notificationsService.error('Error', 'The image already exists in the selected images')
    }else{
      this.eventImages.push(this.eventForm.get('images').value);
      console.log(this.eventImages) 
    }
  }
  addImage(){
    if(this.images.includes(this.addRoom.get('images').value)){
      this.notificationsService.error('Error', 'The image already exists in the selected images')
    }else{
      this.images.push(this.addRoom.get('images').value);
      console.log(this.images) 
    }
  }
  createRoom(event: Event){
    event.preventDefault;
    const data = this.addRoom.value;
    data.images = this.images;
    data.hotel = this.hotelInfo[0]._id;
    // Send Data
    this.roomService.createRoom(data).subscribe(room => {
      let roomUrl = `http://localhost:4200/room/${room._id}`
      window.open(roomUrl, '_blank');
      this.notificationsService.success('Room Created', `The room was opened in a new tab`)
      this.addRoom.reset();
      this.addRoom.markAsPristine();
      this.images = [];
    }, error => {
      console.error(error)
      if(error.status === 409){
        this.notificationsService.error('Error', 'Error the room already exists');  
      }else{
        this.notificationsService.error('Error', 'Error creating the room');
      }
      
    })
  }
  createEvent(event: Event){
    event.preventDefault;
    let data = this.eventForm.value;
    data.hotel = this.hotelInfo[0]._id;
    data.typeOfEvent = this.typeOfEvent.find(Tevent => Tevent.name === data.typeOfEvent)._id;
    data.images = this.eventImages;
    this.hotelService.createEvent(data).subscribe(newEvent => {
      let hotelURL = `http://localhost:4200/hotel/${this.hotelInfo[0]._id}`
      window.open(hotelURL, '_blank');
      this.notificationsService.success('Sucess', 'Event created correctly')
      this.eventForm.markAsPristine();
      this.eventForm.reset();
      this.eventImages = [];
    }, error => {
      if(error.status === 409){
        this.notificationsService.error('Error', 'Error the event already exists');  
      }else{
        this.notificationsService.error('Error', 'Error creating the event');
      }
    })
    console.log(data)
  }
  createService(event: Event){
    event.preventDefault;
    let data = this.serviceForm.value;
    data.hotel = this.hotelInfo[0]._id;
    this.hotelService.createServiceExtra(data).subscribe(service => {
      this.notificationsService.success('Success','Service correctly created');
      this.serviceForm.markAsPristine();
      this.serviceForm.reset();
    }, error => {
      if(error.status === 409){
        this.notificationsService.error('Error', 'Error the service already exists');  
      }else{
        this.notificationsService.error('Error', 'Error creating the service');
      }
    })
  }
  buildForm(){
    this.searchForm = this.formBuilder.group({
      searchPerson: ['', [Validators.required]],
    });
    this.addRoom = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      images: ['', [Validators.required]]
    })
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      images: ['', [Validators.required]],
      typeOfEvent: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
    this.serviceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }
  getEvents(){
    const hotelId = this.hotelInfo[0]._id;
    this.hotelService.getHotelEvents(hotelId).subscribe(events => {
      this.events = events;
    }, error => {
      this.notificationsService.error('Error', 'Error getting events');
    })
  }
  getTypeOfEvents(){
    this.hotelService.getTypeOfEvents().subscribe(tEvent => {
      this.typeOfEvent = tEvent;
    }, error => {
      console.error(error)
      this.notificationsService.error('Error', 'Error getting type of events');
    })
  }
  filterArray(array: any[]){
    let filtered = array.filter(obj => !array[obj.roomID._id] && (array[obj.roomID._id] = true));
    this.roomFree = filtered;
  }
}
