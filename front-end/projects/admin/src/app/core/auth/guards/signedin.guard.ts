import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { User } from "firebase/auth";
import { Observable } from "rxjs";










@Injectable({
  providedIn: 'root'
})
export class SignedInGuard {
  Obrsv$!: Observable<any>;
  user: User | any = null;

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = localStorage.getItem("adminData");
      if (user) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
  }
}
