import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service'
import { GlobalService } from '../../../core/services/global.service'
import {Router} from '@angular/router'
import { NotificationsService } from '../../../core/services/notifications.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private globalService: GlobalService,
    private router: Router, private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.buildForm();
  }
  getToken(){
    const values = this.loginForm.value;
    this.authService.login(values, true).subscribe(token => {
      this.globalService.setToken(token.token)
    }, error => {
      console.error(error)
    })
  }
  login(event: Event){
    event.preventDefault();
    if(this.loginForm.valid){
      const values = this.loginForm.value;
      this.authService.login(values, false).subscribe(data => {
        this.globalService.setIdentity(data);
        this.getToken();
        console.log(data);
        if(data.user.rol === "ROL_ADMINAPP" || data.user.rol === "ROL_ADMINHOTEL"){
          this.router.navigate(['/admin'])
        }else {
          this.router.navigate(['/home'])
        }
        this.notificationsService.success('Welcome back !!', 'This is great to have you here')
      }, error => {
        if(error.status === 401){
          this.notificationsService.warning("Jmmmm...", "Your email or password are incorrect")
        }else if(error.status === 404){
          this.notificationsService.warning("Jmmmm...", "That user do not exist in our records, Maybe you can register")
        }
      })
    }else{
      alert('Completa los campos')
    }
  }

  buildForm(){
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  

}
