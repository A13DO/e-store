import * as authActions from './store/auth.actions';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  @ViewChild('authForm') authForm!: NgForm; // Add this line to reference the form

  constructor(private store: Store<any>) {}

  onSignupSwitch() {
    this.isLoginMode = false;
    this.clearForm();
    console.log(this.isLoginMode);
  }

  onLoginSwitch() {
    this.isLoginMode = true;
    this.clearForm();
    console.log(this.isLoginMode);
  }

  onSubmit(form: NgForm) {
    const email = form.controls['email'];
    const password = form.controls['password'];

    if (this.isLoginMode) {
      this.store.dispatch(
        new authActions.signInStart({
          email: email.value,
          password: password.value,
        })
      );
    } else {
      const name = form.controls['name'];
      this.store.dispatch(
        new authActions.signUpStart({
          name: name.value,
          email: email.value,
          password: password.value,
        })
      );
    }
  }

  private clearForm() {
    if (this.authForm) {
      this.authForm.resetForm();
    }
  }
}
