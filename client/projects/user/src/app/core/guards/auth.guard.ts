import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectAuth } from '../../store/selectors';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  Obrsv$!: Observable<any>;
  user!: User | any;

  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.store.pipe(select(selectAuth)).subscribe(
        res => {
          this.user = res.user;
        }
      )
      this.user = localStorage.getItem("userData");
      if (this.user) {
        return true;
      } else {
        this.router.navigate(["/auth"])
        return false;
      }
  }
}

// export class LoginAuthGuard {
//   constructor(private router: Router, private loginService: LoginService) {}
//   // status!: boolean;
//   status!: boolean;

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     let isSignedIn = window.localStorage.getItem("isSignedIn");
//     if (isSignedIn == "true") {
//       this.status = true;
//     } else if (!isSignedIn) {
//       this.status = false;
//       this.router.navigate(["/login"]);
//     }
//     this.loginService.User.subscribe(
//       user => {
//         if (user) {
//           console.log(user);
//           this.status = true;
//           this.router.navigate(["/home"]);
//       }
//       }
//     )
//     console.log(this.status);
//     return this.status? true: false;
//   }
// }
