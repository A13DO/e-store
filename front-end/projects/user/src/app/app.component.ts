import { Component, HostListener, OnInit } from '@angular/core';
import { RequestsService } from './core/services/requests.service';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../app/store/actions';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-Store';
  showHeader: boolean = true;
  isAuth: boolean = false;
  constructor(private requestsService: RequestsService, private store: Store<any>, private router: Router) {

  }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: Event) {
  //   // Set the reload flag when the page is about to reload
  //   sessionStorage.setItem('isReloading', 'true');
  // }

  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event: Event) {
  //   // If it's a tab close (reload flag is not set), log out the user
  //   if (!sessionStorage.getItem('isReloading')) {
  //     localStorage.removeItem('userData'); // Log out when tab is closed
  //   }
  // }

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.urlAfterRedirects.startsWith('/auth');
        this.isAuth = event.urlAfterRedirects.startsWith('/auth');
      }
    });
    const jsonString: any = localStorage.getItem("userData");
    console.log('Retrieved from localStorage:', jsonString);

    if (jsonString) {
      try {
        const parsedData = JSON.parse(jsonString);
        console.log('Parsed data:', parsedData);
        // Additional logic...
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      console.error('No data found in localStorage.');
    }


    this.requestsService.getCart().subscribe(
      data => {
        this.store.dispatch(new ProductsActions.initializeStateAction(data))
    })

    this.requestsService.getWishlist().subscribe(
      data => {
        console.log(data);
        this.store.dispatch(new ProductsActions.initializeWishlistAction(data))
    })
  }
  isVisible = false; // Determines the visibility of the button
  // Detects scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if (scrollY > 100) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  // Scroll to the top of the page
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  isSticky: boolean = false;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition > 105) { // Adjust 200px to your need
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
}
