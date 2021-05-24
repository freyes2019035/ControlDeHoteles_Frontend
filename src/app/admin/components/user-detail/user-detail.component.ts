import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: any;
  user: any;
  formUser: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private notificationsService: NotificationsService, 
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')
    this.buildForm();
    this.getData();
  }

  getData(){
    this.userService.getUserById(this.userId).subscribe(user => {
      this.user = user;
      this.fillForm();
      
    }, error => {
      this.notificationsService.error('Error', 'Jmmm some error ocurrs fetching the user. Try later');
    })
  }
  buildForm(){
    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }
  fillForm(){
    this.formUser.get('name').setValue(this.user.name);
    this.formUser.get('lastName').setValue(this.user.lastName);
    this.formUser.get('username').setValue(this.user.username);
    this.formUser.get('email').setValue(this.user.email);
  }
  updateUser(event: Event){
    let userUpdated = this.formUser.value;
    this.userService.updateUserById(this.userId, userUpdated).subscribe(user => {
      this.formUser.get('name').setValue(user.userUpdated.name);
      this.formUser.get('lastName').setValue(user.userUpdated.lastName);
      this.formUser.get('username').setValue(user.userUpdated.username);
      this.formUser.get('email').setValue(user.userUpdated.email);
      this.formUser.markAsPristine();
      this.notificationsService.success('Success', 'The account was updated')
      this.router.navigate(['/admin/user'])
    }, error => {
      this.notificationsService.error('Error', 'Error updating the user, try later')
    })
    
  }
}
