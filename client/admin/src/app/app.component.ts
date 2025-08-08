import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from 'global/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'Dashboard';
  isSigned = true;
  isAuth: boolean = false;
  constructor(private router: Router) {
    super();
  }
  // @HostListener('window:beforeunload', ['$event'])
  // unloadHandler(event: Event) {
  //   if (!this.isAuth) {
  //     localStorage.removeItem("adminData")
  //   }
  // }
  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuth = event.urlAfterRedirects.startsWith('/dashboard/auth');
      }
    });
    const user = localStorage.getItem('adminData');
    if (user !== null) {
      const parsedData = JSON.parse(user);
      console.log(parsedData);
      setTimeout(() => {
        localStorage.removeItem('adminData');
        console.log('Logout');
        window.location.reload();
      }, parsedData._tokenExpirationDate);
    }
    if (user) {
      this.isSigned = true;
    } else if (!user) {
      this.isSigned = false;
    }
  }
  onPageSelect(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'client') {
      window.location.href = 'https://e-commerce-86f86.web.app/';
    }
  }
  Login() {
    this.router.navigate(['/dashboard/auth']);
  }
  Logout() {
    localStorage.removeItem('adminData');
    this.isSigned = false;
    window.location.reload();
  }
}
