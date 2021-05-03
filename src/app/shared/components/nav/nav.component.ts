import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../core/services/global.service'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user;
  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.user = this.globalService.getIdentity();
  }

}
