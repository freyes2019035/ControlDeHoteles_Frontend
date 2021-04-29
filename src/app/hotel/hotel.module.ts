import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';

import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HotelDetailComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    HttpClientModule
  ]
})
export class HotelModule { }
