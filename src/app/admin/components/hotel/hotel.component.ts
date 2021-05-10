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
  // Tabla Data
  displayedColumns: string[] = ['name', 'phone', 'email', 'description', 'creation_Date'];
  hotelsFound;
  // Reservation Form
  reservationStadisticsForm: FormGroup;
  reservationsFound = [];
  // Add New Hotel
  hotelForm: FormGroup;
  images = [];
  newHotel: any;
  // Chart Vars
  public isHotelSelected: Boolean;
  dataSource;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2020'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  // Reservation Chart Vars
  public barChartLabelsReservation = ['2021'];
  public barChartDataReservations = [];
  public reservationsLength;
  public reservationsTotal;
  public promedyOfDaysInReservation;
  constructor(private hotelService: HotelService,private formBuilder: FormBuilder, private notificationsService: NotificationsService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getHotels();
  }
  getHotels(){
    this.hotelService.getHotels().subscribe(hotels => {
      console.log(hotels); 
     this.dataSource = hotels;
     this.hotelsFound = hotels;
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
  buildForm(){
    this.hotelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      images: ['', [Validators.required]]
    });
    this.reservationStadisticsForm = this.formBuilder.group({
      hotelId: ['', [Validators.required]]
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
  generateReport(event: Event){
    event.preventDefault;
    const {hotelId} = this.reservationStadisticsForm.value;
    this.reservationService.getReservetationOfHotel(hotelId).subscribe(hotelReservations => {
      if(hotelReservations.length === 0){
        this.notificationsService.warning("Jmmmm...", "We can not find any reservation");
      }else{
        console.log(hotelReservations)
        this.reservationsLength = hotelReservations.length;
        this.reservationsFound = hotelReservations;
        this.buildStadisticsOfReservationsDays();
        this.calcTotalOfReservations();
        this.calcPromedyOfDaysInReservation();
        this.isHotelSelected = true;
        
        this.notificationsService.success("Success !!", "Loading ....")
      }
    }, error => {
      this.notificationsService.error("Jmmm", "some error ocurrs fetching reservations")
    })
    
  }
  buildStadisticsOfReservationsDays(){
    let hotelData = this.reservationsFound;
    console.log(hotelData)
    for (let i = 0; i < hotelData.length; i++) {
      let label = hotelData[i].roomID.name;
      let numberOfDays = hotelData[i].noOfDaysOfStay;
      let obj = {data: [numberOfDays], label: label}
      this.barChartDataReservations.push(obj);
    }
  }
  calcPromedyOfDaysInReservation(){
    let data = this.reservationsFound;
    let d = 0;
    data.map((hotel) => {
      d += Number(hotel.noOfDaysOfStay);
    });
    this.promedyOfDaysInReservation = Math.round(d / data.length).toFixed(0);
  }
  calcTotalOfReservations(){
    let data = this.reservationsFound;
    let a = 0;
    data.map((hotel) => {
      a += Number(hotel.subTotalRoom + hotel.subTotalServices);
    });
    this.reservationsTotal = a;
  }
}

