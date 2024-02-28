// import * as authActions from "./auth.actions";
import * as authActions from "./auth.actions";


export interface AppState {
  authState: AuthState;
}

export interface AuthState {
  data: string[]
  error: string;

}

const initialState: AuthState = {
  data: [""],
  error: ""
}



export function authReducer(store = initialState, action: any) : AuthState {
  switch (action.type) {
    case authActions.SIGNIN:
      console.log("SIGNIN!");
      console.log(((action as authActions.signIn).payload));
      return store
      case authActions.SIGNUP:
        console.log(((action as authActions.signUp).payload));
      console.log("SIGNUP!");
      return store
    default:
      return store
  }
}
