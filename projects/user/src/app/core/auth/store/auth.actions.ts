import { Action } from "@ngrx/store";
import { Product } from "../../../shared/product.module";

export const SIGNIN = "SIGN_IN";
export const SIGNUP = "SIGN_UP";
export const SIGNOUT = "SIGN_OUT";
export const AUTHSUCCESS = "AUTH_SUCCESS";
export const AUTHFAILED = "AUTH_FAILED";


export class signIn implements Action {
  readonly type: string = SIGNIN;
  payload: string[]
  constructor(payload: string[]) {
    this.payload = payload;
  }
}
export class signUp implements Action {
  readonly type: string = SIGNUP;
  payload: string[]
  constructor(payload: string[]) {
    this.payload = payload;
  }
}
export class authSuccess implements Action {
  readonly type: string = AUTHSUCCESS;
  payload: any
  constructor(payload: any) {
    this.payload = payload;
  }
}
export class authFailed implements Action {
  readonly type: string = AUTHFAILED;
  payload: any
  constructor(payload: any) {
    this.payload = payload;
  }
}
export type AuthActions =
  signIn
  | signUp
  | authSuccess
  | authFailed

