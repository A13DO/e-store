
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthResponseData, AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { switchMap, map, catchError, of, tap } from "rxjs";
import * as authActions from '../store/auth.actions';
import { User } from "../../interfaces/user.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffect {

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private authService: AuthService) {}

  authLogin = createEffect(() =>
  this.actions$.pipe(
    ofType(authActions.SIGNIN_START),
    switchMap((authData: authActions.signInStart) => {
      // const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCql3Npno578hxnzN5mjD4SHjyLcdkWe4U'; (firebase)
      const url = 'https://e-commerce-api-wvh5.onrender.com/api/v1/auth/login';
      return this.http
        // .post<AuthResponseData>( (firebase)
        .post<AuthResponseData>(
          url,
          {
            email: authData.payload.email,
            password: authData.payload.password
            // ,returnSecureToken: true (firebase)
          }
        )
        .pipe(
          tap(resData => {
            console.log("start");
            this.authService.setLogoutTimer(+resData.expiresIn)
          }),
          map(resData => {
            this.store.dispatch(new authActions.signIn(
              {
                uid: resData.uid,
                name: resData.name,
                email: resData.email,
                role: resData.role,
                token: resData.token,
                expiresIn: +resData.expiresIn
              }))
            handleAuthentication(resData.uid, resData.name, resData.email, resData.role, resData.token, +resData.expiresIn)
            this.router.navigate(['/home']);
            window.location.reload();
          }),
          catchError(errorRes => {
            console.log(errorRes);
            this.store.dispatch(new authActions.SignInFail(handleError(errorRes)))
            return handleError(errorRes)
          })
        );
    })
    )
    , { dispatch: false })
  authSignup = createEffect(() =>
  this.actions$.pipe(
    ofType(authActions.SIGNUP_START),
    switchMap((authData: authActions.signUpStart) => {
      // const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.fireBaseAPIKey;
      // const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCql3Npno578hxnzN5mjD4SHjyLcdkWe4U';
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCql3Npno578hxnzN5mjD4SHjyLcdkWe4U';
      // const url = 'https://e-commerce-api-wvh5.onrender.com/api/v1/auth/register';
      return this.http
        .post<AuthResponseData>(
          url,
          {
            name: "name",
            email: authData.payload.email,
            password: authData.payload.password,
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
          }),
          map(resData => {
            // return new authActions.signIn({email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: new Date(
            //   new Date().getTime() + +resData.expiresIn * 1000
            // ), redirect: true})
            this.store.dispatch(new authActions.signUp({uid: resData.uid, name: resData.name, email: resData.email, role: resData.role, token: resData.token, expiresIn: +resData.expiresIn}))
            handleAuthentication(resData.uid, resData.name, resData.email, resData.role, resData.token, +resData.expiresIn)
            this.router.navigate(['/home']);
            window.location.reload();
          }),
          catchError(errorRes => {
            console.log(errorRes);
            this.store.dispatch(new authActions.SignInFail(handleError(errorRes)))
            return handleError(errorRes)
          })
        );
    })
    )
    , { dispatch: false })

}

const handleAuthentication = (uid: string, name: string, email: string, role: string, token: string, expiresIn: number) => {
  // const user = new User(name, email, userId, token, expirationDate)
  const user = new User(uid, name, email, role, token,  expiresIn)
  localStorage.setItem('userData', JSON.stringify(user))
  console.log(user);

  // return new authActions.signIn({email: email, userId: userId, token: token, expirationDate: expirationDate, redirect: true})
}
function handleError(errorRes: any): any {
  let errorMessage = 'An unknown error occurred!';
  switch (errorRes) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'INVALID_LOGIN_CREDENTIALS':
      errorMessage = 'invalid email or password.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case "MISSING_PASSWORD":
      errorMessage = 'This password is not correct.';
      break;
  }
  return errorMessage;
  // return of(new authActions.SignInFail(errorMessage));
}
// const handleAuthentication = (
//   email: string,
//   userId: string,
//   token: string,
//   expiresIn: number
//   ) => {
//   const expirationDate = new Date(
//     new Date().getTime() + +expiresIn * 1000
//     );
//     const user = new User(
//       email,
//       userId,
//       token,
//       expirationDate
//     );
//     localStorage.setItem('userData', JSON.stringify(user))
//     return new AuthActions.Login({
//     email: email,
//     userId: userId,
//     token: token,
//     expirationDate: expirationDate,
//     redirect: true
//   });
// }





// switchMap operator to handle the asynchronous operation and dispatch new actions based on the outcome.
  // signIn$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(authActions.SIGNIN),
  //     switchMap(authData: authActions.signInStart => {
  //     //   this.authService.signInStart((action as authActions.signInStart).payload["email"],(action as authActions.signInStart).payload["password"])
  //       this.http
  //     })
  //     // // switchMap((action) =>
  //     //   // send the new product (in service there fetched data update it then send)
  //     //   this.authService.signInStart((action as authActions.signInStart).payload["email"],(action as authActions.signInStart).payload["password"])
  //     //   .pipe(
  //     //     map(user => new authActions.authSuccess({ user })),
  //     //     catchError(error => of(new authActions.authFailed({ error })))
  //     //   )
  //     )
  //   )
  // );
