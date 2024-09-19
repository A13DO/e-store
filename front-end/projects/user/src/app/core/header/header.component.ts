import { RequestsService } from '../services/requests.service';
import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { User } from '../interfaces/user.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductsService } from 'projects/admin/src/app/core/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      this.onSearch(inputElement)
    }
  }

  wishListLen!: number;
  cartLen!: number;
  cartStatus: boolean = true
  isSignedIn: boolean = false;
  user!: User | any;
  showHeader: boolean = true;
  showCtgSelect: boolean = true;
  showNav: boolean = false;
  @ViewChild('contentWrapper') contentWrapper!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;
  categories: any;

  constructor(private requestsService: RequestsService, private route: ActivatedRoute,  private productsService: ProductsService, private router: Router, private renderer: Renderer2) {

  }
  @Input() sticky: boolean = false;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.urlAfterRedirects.startsWith('/auth');
        this.showCtgSelect = !event.urlAfterRedirects.startsWith('/products');
      }
    });
    this.productsService.getAllCategories()
    .subscribe(
      (res: any) => {
        this.categories = res.categories;
        console.log(this.categories);
      }
    )
    let user = localStorage.getItem('userData');
    if (user) {
      this.isSignedIn = true;
    }
    this.requestsService.itemsNumbers$.subscribe(
      data => {
        this.cartLen = data[0];
        this.wishListLen = data[1];
        console.log(this.cartLen, this.wishListLen);
      }
    )

  }
  onPageSelect(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'dashboard') {
      window.location.href = 'https://dashboard-5b2fd.web.app/';
    }
  }
  cartToggle() {
    this.requestsService.isCartOpen$.next(true)
  }
  navToggle() {
    this.showNav = !this.showNav;
    if (this.showNav) {
      // Get the actual height of the content
      const contentHeight = this.contentWrapper.nativeElement.scrollHeight + 'px';
      this.renderer.setStyle(this.contentWrapper.nativeElement, 'max-height', contentHeight);
    } else {
      this.renderer.setStyle(this.contentWrapper.nativeElement, 'max-height', '0');
    }
  }
  navigateToProducts(category: string) {
    this.router.navigate(['/products'], { state: { category } });
  }
  onSearch(searchInput: HTMLInputElement) {
    const searchValue = searchInput.value;
    // this.router.navigate(['/products'], { state: { searchValue } });
    this.router.navigate(['/products'], { queryParams: { search: searchValue } });
  }
  // isTopHeaderHidden = false;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const scrollY = window.scrollY || document.documentElement.scrollTop;
  //   this.isTopHeaderHidden = scrollY > 40;
  // }
  Login() {
    // this.isSignedIn = true;
  }
  Logout() {
    localStorage.setItem('userData', "")
    this.isSignedIn = false;
  }
}
