import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../core/services/global.service'
import { NotificationsService } from '../../../core/services/notifications.service'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user;
  constructor(private globalService: GlobalService, private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.user = this.globalService.getIdentity();
  }
  logOut(){
    this.globalService.logOut();
    this.notificationsService.success('Ok bye 😞', 'See you soon...')
  }
}
