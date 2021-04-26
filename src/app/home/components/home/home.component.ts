import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../../core/services/hotel.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    HotelService
  ]
})
export class HomeComponent implements OnInit {

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.hotelService.getConfig().subscribe(data => {
      console.log(data)
    }, err => {
      console.error(err)
    })
    
  }

}
