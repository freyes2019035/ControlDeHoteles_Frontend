import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component'
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(home =>  home.HomeModule)
      },
      {
        path: 'hotel',
        loadChildren: () => import('./hotel/hotel.module').then(hotel => hotel.HotelModule)
      },
      {
        path: 'room',
        loadChildren: () => import('./room/room.module').then(room => room.RoomModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
