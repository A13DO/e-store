import * as authActions from './store/auth.actions';
import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = true;

  constructor(private store: Store<any>) {}
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
    console.log("Email: ", email.value, "Status: ", email.status);
    const password = form.controls['password'];
    console.log("Password: ", password.value, "Status: ", password.status);

    if (this.isLoginMode) {
      this.store.dispatch(new authActions.signInStart({email: email.value, password: password.value}))
    } else if (!this.isLoginMode) {
      const name = form.controls['name'];
      console.log("Name: ", name.value, "Status: ", name.status);
      this.store.dispatch(new authActions.signUpStart({name: name.value, email: email.value, password: password.value}))
      console.log("Sign UP!");
    }
  }
}


// .post<AuthResponseData>(
//   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCql3Npno578hxnzN5mjD4SHjyLcdkWe4U', {


// .post<AuthResponseData>(
//   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCql3Npno578hxnzN5mjD4SHjyLcdkWe4U', {
//     email: email,
