import { Action } from "@ngrx/store";

const INCREMENT = "increment";


export interface StoreInterface {
  counter: Counter
}
// Reducer Interface
interface Counter {
  n: number
}

let initialState = {
  n: 0
}
// Action Interface
interface customAction {
  type: string;
  payload?: any;
}

// Action Class : to avoid using {type: "increment", paylaod: 2} when dispatch
export class incrementAction implements Action {
  type: string = "increment";
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}
export class decrementAction implements Action {
  type: string = "decrement";
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}


// ==================== Products =================

export interface product {
  name: string;
  rate: number;
  price: number;
}



// Reducer
export function counterReducer(store = initialState, action: customAction) {
  switch (action.type) {
    case "add-to-cart":
      return {
        n: store.n + action.payload
        // ------------------------
      }
    case INCREMENT:
      return {
        n: store.n + action.payload
      }
      case "decrement":
      return {
        n: store.n - action.payload
      }
    default:
      return store;
  }
}
