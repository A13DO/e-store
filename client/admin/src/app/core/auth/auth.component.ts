import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { User } from 'client/shop/src/app/core/interfaces/user.model';
import { BaseComponent } from 'global/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent extends BaseComponent {
  isLoginMode: boolean = true;
  submitted: boolean = false;
  authError!: any;
  constructor(private authService: AuthService) {
    super();
  }
  onSignupSwitch() {
    this.isLoginMode = false;
    console.log(this.isLoginMode);
  }
  onLoginSwitch() {
    this.isLoginMode = true;
    console.log(this.isLoginMode);
  }
  onSubmit(form: NgForm) {
    const email = form.controls['email'];
    console.log('Email: ', email.value, 'Status: ', email.status);
    const password = form.controls['password'];
    console.log('Password: ', password.value, 'Status: ', password.status);
    this.authService
      .signIn(email.value, password.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (authResponse) => {
          console.log(authResponse);
          let user = new User(
            authResponse._id,
            authResponse.name,
            authResponse.email,
            authResponse.role,
            authResponse.token,
            authResponse.expiresIn
          );
          if (user && user.role === 'admin') {
            localStorage.setItem('adminData', JSON.stringify(user));
            console.log('Successful Login');
          }
          window.location.reload();
        },
        (err) => {
          this.authError = err;
          console.log(err);
        }
      );
    if (this.isLoginMode) {
    } else if (!this.isLoginMode) {
      console.log('Sign UP!');
    }
    this.submitted = true;
  }
}

// .post<AuthResponseData>(
//   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCql3Npno578hxnzN5mjD4SHjyLcdkWe4U', {

// .post<AuthResponseData>(
//   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCql3Npno578hxnzN5mjD4SHjyLcdkWe4U', {
//     email: email,
