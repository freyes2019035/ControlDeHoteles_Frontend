import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from 'src/app/core/services/hotel.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'email', 'description', 'creation_Date'];
  dataSource;
  hotelForm: FormGroup;
  images = [];
  newHotel: any;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2020'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  public barChartDataReservations = [];

  constructor(private hotelService: HotelService,private formBuilder: FormBuilder, private notificationsService: NotificationsService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getHotels();
    this.buildStadisticsOfReservations();
  }
  getHotels(){
    this.hotelService.getHotels().subscribe(hotels => {
      console.log(hotels); 
     this.dataSource = hotels;
     this.buildStadistics();
    }, error => {
      console.error(error)
    })
  }
  buildStadistics(){
    let hotelData = this.dataSource;
    for (let i = 0; i < hotelData.length; i++) {
      let label = hotelData[i].name;
      let reservationNumber = hotelData[i].no_reservations;
      let obj = {data: [reservationNumber], label: label}
      this.barChartData.push(obj)
    }
    
  }
  buildStadisticsOfReservations(){
    this.reservationService.getAllReservations().subscribe(reservations => {
      let reservationData = reservations;
      console.log(reservations)
      // for (let i = 0; i < reservationData.length; i++) {
      //   let label = reservationData[i].name;
      //   let reservationNumber = reservationData[i].no_reservations;
      //   let obj = {data: [reservationNumber], label: label}
      //   this.barChartData.push(obj)
      //   console.log(this.barChartData)
      // }
    }, error => {
      this.notificationsService.error("Jmmm..", "error on get al reservations") 
    }) 
  }
  buildForm(){
    this.hotelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      images: ['', [Validators.required]]
    });
  }

  createHotel(event: Event){
    event.preventDefault;
    let values = this.hotelForm.value;
    values.images = this.images;
    this.hotelService.createHotel(values).subscribe(hotel => {
      console.log(hotel)
      this.newHotel = hotel;
      this.hotelForm.reset();
      this.hotelForm.markAsPristine();
      this.images = [];
      this.triggerModal();
      this.getHotels();
      this.notificationsService.success("Sucess !!", "Hotel Succesfuly Created");
    }, error => {
      console.error(error)
      this.notificationsService.error("Jmmm", "some error ocurrs adding the hotel, Try Later");
    })
  }
  addImage(){
    this.images.push(this.hotelForm.get('images').value);
    console.log(this.images) 
  }
  triggerModal(){
    document.getElementById("btnToClick").click();
  }
}

