import { Injectable } from '@angular/core';
import { GlobalService } from '../../core/services/global.service';
import { CanActivate, Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private globalService: GlobalService){
  
  }
  canActivate(): boolean{
    if(this.globalService.getIdentity()){
      return true;
    }else{
      this.router.navigate(['/auth/login'])
      return false;
    }
  }
  
}
