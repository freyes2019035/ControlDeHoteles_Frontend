import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from 'src/app/core/services/hotel.service';
import { GlobalService } from '../../../core/services/global.service'
import { NotificationsService } from '../../../core/services/notifications.service'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  searchForm: FormGroup;
  user;
  hotelsFound;
  formChange: boolean;
  constructor(
    private globalService: GlobalService,
    private notificationsService: NotificationsService, 
    private formBuilder: FormBuilder,
    private hotelService: HotelService) { }

  ngOnInit(): void {
    this.user = this.globalService.getIdentity();
    this.buildForm();
    this.onChanges()
    console.log(this.user);
    
  }
  logOut(){
    this.globalService.logOut();
    this.notificationsService.success('Ok bye 😞', 'See you soon...')
  }
  onChanges(){ 
      this.searchForm.valueChanges.subscribe(name => {
        this.formChange = true;
        this.hotelService.getHotelByName(name).subscribe(hotel => {
          this.hotelsFound = hotel;
        },error => {
          this.formChange = false;
          console.clear();
        })
      }, error => {
        console.error(error)
      });
  }
  buildForm(){
    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    })
  }
}
