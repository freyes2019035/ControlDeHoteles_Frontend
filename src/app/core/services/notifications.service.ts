import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snotify: SnotifyService) { }

  success(title = "Success", subtitle = ""){
    this.snotify.success(subtitle, title,{
      timeout: 3000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false
    });
  }
  warning(title = "Success", subtitle = ""){
    this.snotify.warning(subtitle, title,{
      timeout: 3000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false
    });
  }
  error(title = "Success", subtitle = ""){
    this.snotify.error(subtitle, title,{
      timeout: 3000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false
    });
  }
}
