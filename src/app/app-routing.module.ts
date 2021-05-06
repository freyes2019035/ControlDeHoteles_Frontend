import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardGuard } from './core/guards/auth-guard.guard';
import { AuthAdminGuard } from './core/guards/auth-admin.guard';
import { LayoutComponent } from './layout/components/layout/layout.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(home =>  home.HomeModule),
        canActivate: [AuthGuardGuard],
      },
      {
        path: 'hotel',
        loadChildren: () => import('./hotel/hotel.module').then(hotel => hotel.HotelModule),
        canActivate: [AuthGuardGuard],
      },
      {
        path: 'room',
        loadChildren: () => import('./room/room.module').then(room => room.RoomModule),
        canActivate: [AuthGuardGuard],
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(user => user.UserModule),
        canActivate: [AuthGuardGuard],
      }
    ],
    
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(admin => admin.AdminModule),
    canActivate: [AuthAdminGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
