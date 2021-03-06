import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from 'src/app/core/services/global.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isAdminAPP: Boolean;
  isHotelAdmin: Boolean;
  isDifferent: Boolean;
  constructor(private breakpointObserver: BreakpointObserver, private globalService: GlobalService, private notificationsService: NotificationsService) {
    this.checkRol();
  }
  logOut(){
    this.globalService.logOut();
    this.notificationsService.success('Ok bye 😞', 'See you soon...')
  }
  checkRol(){
    let identity = this.globalService.getIdentity();
    identity.user.rol == "ROL_ADMINAPP" 
    ? 
    this.isAdminAPP = true
    : 
    identity.user.rol == "ROL_ADMINHOTEL" 
    ?
    this.isHotelAdmin = true
    : 
    this.isDifferent = true;
  }
  
}
