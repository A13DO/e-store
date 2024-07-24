import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { User } from "firebase/auth";
import { Observable } from "rxjs";
import { AppState } from "../../store/store";
import { Store, select } from '@ngrx/store';
import { selectAuth } from "../../store/selectors";










@Injectable({
  providedIn: 'root'
})
export class SignedInGuard {
  Obrsv$!: Observable<any>;
  user: User | any = null;

  constructor(private store: Store<any>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.store.pipe(select(selectAuth)).subscribe(
        res => {
          this.user = localStorage.getItem('userData');
        }
      )
      if (this.user) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
  }
}
