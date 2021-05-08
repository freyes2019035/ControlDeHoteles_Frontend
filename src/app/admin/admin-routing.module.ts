import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component'
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'
import { UserComponent } from './components/user/user.component'
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
        path: 'dashboard',
        component: AdminDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
