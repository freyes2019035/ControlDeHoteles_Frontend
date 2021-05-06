import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  identity;
  constructor(private router: Router, private globalService: GlobalService, private notificationsService: NotificationsService){

  }
  canActivate(): boolean{
    this.identity = this.globalService.getIdentity();
    if(this.identity.user.rol === "ROL_ADMINAPP" || this.identity.user.rol === "ROL_ADMINHOTEL"){
      return true;
    }else{
      this.router.navigate(['/home'])
      this.notificationsService.warning("WARNING", "Verify your permissions")
      return false;
    }
  }
  
}
