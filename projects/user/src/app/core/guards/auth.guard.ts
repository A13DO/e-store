import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
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
