import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, takeUntil } from 'rxjs';
import { AppState } from '../../store/store';
import { Store, select } from '@ngrx/store';
import { selectAuth } from '../../store/selectors';
import { BaseComponent } from 'global/base/base.component';

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard extends BaseComponent {
  Obrsv$!: Observable<any>;
  user: User | any = null;

  constructor(private store: Store<any>, private router: Router) {
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
        this.user = localStorage.getItem('userData');
      });
    if (this.user) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
