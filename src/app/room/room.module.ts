import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';

import { RoomDetailComponent } from './components/room-detail/room-detail.component'

@NgModule({
  declarations: [
    RoomDetailComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule
  ]
})
export class RoomModule { }
