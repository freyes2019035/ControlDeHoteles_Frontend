import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/core/services/hotel.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotelId: any;
  hotel: any;
  hotelImages = [];
  hotelForm: FormGroup;
  constructor(
    private route: ActivatedRoute, 
    private hotelService: HotelService,
    private notificationsService: NotificationsService, 
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id');
    this.buildForm();
    this.getHotel();
  }
  getHotel() {
    this.hotelService.getHotel(this.hotelId).subscribe(hotel => {
      this.hotel = hotel;
      this.hotelImages = hotel.images;
      this.fillForm();
    }, error => {
      this.notificationsService.error('Error', 'Error getting the hotel try later')
    })
  }
  fillForm(){
    this.hotelForm.get('name').setValue(this.hotel.name)
    this.hotelForm.get('description').setValue(this.hotel.description)
    this.hotelForm.get('email').setValue(this.hotel.email)
    this.hotelForm.get('phone').setValue(this.hotel.phone)
    this.hotelForm.get('address').setValue(this.hotel.address)

  }
  removeImg(img: String){
    let imgPosition = this.hotelImages.indexOf(img);
    imgPosition > -1 ? this.hotelImages.splice(imgPosition, 1) : null;
  }
  addImage(){
    let imgValue = this.hotelForm.get('image').value;
    if(imgValue){
      if(!this.hotelImages.includes(imgValue)){
        this.hotelImages.push(imgValue);
      }
    }
  }
  buildForm(){
    this.hotelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }
  updateHotel(event: Event){
    event.preventDefault;
    let id = this.hotelId;
    let data = this.hotelForm.value;
    delete data.image;
    data.images = this.hotelImages;
    this.hotelService.updateHotel(id, data).subscribe(newHotel => {
      this.notificationsService.success('Success', 'Great the hotel is updated')
      this.hotelForm.markAsPristine();
      this.router.navigate(['/admin/hotel'])
    }, error => {
      this.notificationsService.error('Error', 'Error updating hotel');
    })
  }
}
