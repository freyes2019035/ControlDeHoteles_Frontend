import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service'
import { GlobalService } from '../../../core/services/global.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private globalService: GlobalService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }
  register(event: Event){
    event.preventDefault();
    const user = this.registerForm.value;
    this.authService.register(user).subscribe(newUser => {
      this.router.navigate(['/auth/login'])
    }, error => {
      console.error('Error saving user')
      console.error(error);
    })
  }
  buildForm(){
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
