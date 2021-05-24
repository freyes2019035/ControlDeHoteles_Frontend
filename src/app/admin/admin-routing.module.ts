import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component'
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'
import { UserComponent } from './components/user/user.component'
import { UserDetailComponent } from './components/user-detail/user-detail.component'
import { HotelComponent } from './components/hotel/hotel.component';
import { MyHotelComponent } from './components/my-hotel/my-hotel.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
const routes: Routes = [
  {
    path: '',
    component: AdminNavComponent,
    children: [
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'user/update/:id',
        component: UserDetailComponent
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'hotel',
        component: HotelComponent
      },
      {
        path: 'hotel/update/:id',
        component: HotelDetailComponent
      },
      {
        path: 'myHotel',
        component: MyHotelComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
