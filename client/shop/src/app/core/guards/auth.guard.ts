import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectAuth } from '../../store/selectors';
import { User } from 'firebase/auth';
import { BaseComponent } from 'global/base/base.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends BaseComponent {
  Obrsv$!: Observable<any>;
  user!: User | any;

  constructor(private store: Store<AppState>, private router: Router) {
    super();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.store
      .pipe(select(selectAuth))
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.user = res.user;
      });
    this.user = localStorage.getItem('userData');
    if (this.user) {
      return true;
    } else {
      this.router.navigate(['/auth']);
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
//     this.loginService.User.pipe(takeUntil(this.destroy$)).subscribe(
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
