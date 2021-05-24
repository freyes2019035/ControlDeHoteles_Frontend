import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UserComponent } from './components/user/user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HotelComponent } from './components/hotel/hotel.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MyHotelComponent } from './components/my-hotel/my-hotel.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminNavComponent,
    UserComponent,
    HotelComponent,
    MyHotelComponent,
    UserDetailComponent,
    HotelDetailComponent
  ],
  imports: [
    ChartsModule,
    MatTableModule,
    CommonModule,
    AdminRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
