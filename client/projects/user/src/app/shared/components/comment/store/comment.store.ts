import { CommentsActions, INITIALIZECOMMENTS, ADDCOMMENT, UPDATECOMMENT, COMMENTS_SUCCESS }  from "./comment.actions";
import { Comment }  from "../../../../core/interfaces/comment.model";



export interface AppState {
  commentsState: CommentsState;
}



export interface CommentsState {
  comments: any[];
  error: string;
}

export const initialState: CommentsState = {
  comments: [],
  error: ""
};

export function commentsReducer(
  state: CommentsState = initialState,
  action: any
): CommentsState {
    switch (action.type) {
    case INITIALIZECOMMENTS:
      // const initComments = action.payload || state.comments;
      // return { ...state, comments: [...state.comments, ...initComments] };
      const initComments = action.payload !== undefined ? action.payload : state.comments;
      return { ...state, comments: initComments };
    case ADDCOMMENT:
      const { comment: newComment } = action.payload;
      return { ...state, comments: [...state.comments, newComment] };

    case UPDATECOMMENT:
      const { comment: updatedComment } = action.payload;
      let tempState = [...state.comments]
      for (let i = 0; i < tempState.length; i++) {
        if (tempState[i].uid == updatedComment.uid) {
          tempState[i] = updatedComment;
          console.log(tempState);
        }
      }
      return { ...state, comments: tempState };
    case COMMENTS_SUCCESS:
      let result: any = [];
      const { comments } = action.payload
      console.log(Object.keys(comments));
      for (let key of Object.keys(comments)) {
        result.push(new Comment(comments[key].uid, comments[key].username, comments[key].comment, comments[key].rating))
        console.log(result);
      }
      return { ...state, comments: result};
    default:
      return state;
  }
}
// {
//   "username": "Omar",
//   "comment": "Good.",
//   "rating": 4
// }


// import * as authActions from "./auth.actions";
// import { User } from "../../../../core/interfaces/user.model";
// import * as authActions from "../../../../core/auth/store/auth.actions";
// import { CommentsActions, INITIALIZECOMMENTS, ADDCOMMENT, UPDATECOMMENT }  from "./comment.actions";


// export interface AppState {
//   commentsState: CommentsState;
// }

// export interface CommentsState {
//   user: User | null;
//   comment: string | null;
//   loading: boolean;

// }

// const initialState: CommentsState = {
//   user: null,
//   comment: null,
//   loading: false
// }



// export function commentsReducer(store = initialState, action: any) : CommentsState {
//   switch (action.type) {
//     case authActions.SIGNIN_START:
//       console.log("SIGNINStart!");
//       return store;
//     case authActions.SIGNUP_START:
//       console.log("SIGNINStart!");
//       return store;
//     case authActions.SIGNIN:
//       const user = new User(action.payload.email, action.payload.userId, action.payload.token,  action.payload.expirationDate)
//       console.log(user);
//       return store
//       case authActions.SIGNUP:
//       const userd = new User(action.payload.email, action.payload.userId, action.payload.token,  action.payload.expirationDate)
//         return store
//     case authActions.SIGNINFAILED:
//       return store
//     default:
//       return store
//   }
// }
