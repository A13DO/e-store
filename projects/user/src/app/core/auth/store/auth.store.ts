// import * as authActions from "./auth.actions";
import { User } from "../../interfaces/user.model";
import * as authActions from "./auth.actions";


export interface AppState {
  authState: AuthState;
}

export interface AuthState {
  user: User | null;
  authError: string | null;
  loading: boolean;

}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
}



export function authReducer(store = initialState, action: any) : AuthState {
  switch (action.type) {
    case authActions.SIGNIN_START:
      console.log("SIGNINStart!");
      return store;
    case authActions.SIGNUP_START:
      console.log("SIGNINStart!");
      return store;
    case authActions.SIGNIN:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token,  action.payload.expirationDate)
      console.log(user);
      return {
        user: user,
        authError: null,
        loading: false
      }
      case authActions.SIGNUP:
      const userd = new User(action.payload.email, action.payload.userId, action.payload.token,  action.payload.expirationDate)
        return {
          user: userd,
          authError: null,
          loading: false
        }
    case authActions.SIGNINFAILED:
      return {
        user: null,
        authError: action.payload,
        loading: false
      }
    default:
      return store
  }
}
