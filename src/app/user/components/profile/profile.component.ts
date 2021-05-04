import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { GlobalService } from '../../../core/services/global.service'
import { UserService } from '../../../core/services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile;
  services;

  constructor(
    private globalService: GlobalService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.buildForm();
    this.userService.getUser().subscribe(user => {
      this.profile = user;
      this.profileForm.get('name').setValue(user.name)
      this.profileForm.get('email').setValue(user.email)
      this.profileForm.get('username').setValue(user.username)
    })
    this.getAllMyServices();
  }

  buildForm(){
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
    });
  }
  updateInfo(){
    let formValue = this.profileForm.value;
    this.userService.updateUser(formValue).subscribe(userUpdated => {
      this.profileForm.get('name').setValue(userUpdated.userUpdated.name)
      this.profileForm.get('email').setValue(userUpdated.userUpdated.email)
      this.profileForm.get('username').setValue(userUpdated.userUpdated.username)
      this.notificationsService.success('Info Updated', 'You correctly update your info')
      this.profileForm.markAsPristine()
    }, error => {
      console.error(error)
    })
  }
  getAllMyServices(){
    this.userService.getAllServices().subscribe(services => {
      this.services = services;
      console.log(services)
    }, error => {
      console.error(error)
    })
  }
}
