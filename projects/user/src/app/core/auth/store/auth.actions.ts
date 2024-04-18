import { Action } from "@ngrx/store";
import { Product } from "../../../shared/product.module";

export const SIGNIN_START = "SIGN_IN_START";
export const SIGNUP_START = "SIGN_UP_START";
export const SIGNIN = "SIGN_IN";
export const SIGNUP = "SIGN_UP";
export const SIGNOUT = "SIGN_OUT";
export const SIGNINFAILED = "SIGNIN_FAILED";


export class signInStart implements Action {
  readonly type: string = SIGNIN_START;
  constructor(public payload: {email: string; password: string}) {}
}
export class signUpStart implements Action {
  readonly type: string = SIGNUP_START;
  constructor(public payload: {email: string; password: string}) {}
}
export class signIn implements Action {
  readonly type: string = SIGNIN;
  constructor(public payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }) {}
}
export class signUp implements Action {
  readonly type: string = SIGNUP;
  constructor(public payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }) {}
}
export class signOut implements Action {
  readonly type: string = SIGNOUT;
  constructor(public payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }) {}
}
export class SignInFail implements Action {
  readonly type: string = SIGNINFAILED;
  constructor(public payload: string) {}
}
export type AuthActions =
  signInStart
  | signIn
  | signUpStart
  | signUp
  | SignInFail

