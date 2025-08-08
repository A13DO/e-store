import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user.model';
import { Observable, takeUntil } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { WishlistService } from '../services/wishlist.service';
import { BaseComponent } from 'global/base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @ViewChild('contentWrapper') contentWrapper!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  wishListLen: number = 0;
  cartLen: number = 0;
  cartStatus: boolean = false;
  isSignedIn: boolean = false;
  showHeader: boolean = true;
  showCtgSelect: boolean = true;
  showNav: boolean = false;
  categories: any[] = [];
  user: User | null = null;
  @Input() sticky: boolean = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) {
    super();
  }

  ngOnInit(): void {
    this.checkAuthStatus();
    this.setupRouterEvents();
    this.loadCategories();
    this.setupCartAndWishlistCounters();
  }

  private checkAuthStatus(): void {
    const userData = localStorage.getItem('userData');
    this.isSignedIn = !!userData;
    this.user = userData ? JSON.parse(userData) : null;
  }

  private setupRouterEvents(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.urlAfterRedirects.startsWith('/auth');
        this.showCtgSelect = !event.urlAfterRedirects.startsWith('/products');
      }
    });
  }

  private loadCategories(): void {
    this.productService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (categories: any) => {
          this.categories = categories;
        },
        (error: any) => {
          console.error('Error loading categories:', error);
        }
      );
  }

  private setupCartAndWishlistCounters(): void {
    this.cartService.cartLength$
      .pipe(takeUntil(this.destroy$))
      .subscribe((length: number) => (this.cartLen = length));

    this.wishlistService.wishlistLength$
      .pipe(takeUntil(this.destroy$))
      .subscribe((length: number) => (this.wishListLen = length));
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      this.onSearch(inputElement);
    }
  }

  onPageSelect(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'dashboard') {
      window.location.href = 'https://dashboard-5b2fd.web.app/';
    }
  }

  cartToggle(): void {
    this.cartService.isCartOpen$.next(true);
  }

  navToggle(): void {
    this.showNav = !this.showNav;
    const contentHeight = this.showNav
      ? `${this.contentWrapper.nativeElement.scrollHeight}px`
      : '0';
    this.renderer.setStyle(
      this.contentWrapper.nativeElement,
      'max-height',
      contentHeight
    );
  }

  navigateToProducts(category: string): void {
    this.router.navigate(['/products'], { state: { category } });
  }

  onSearch(searchInput: HTMLInputElement): void {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
      this.router.navigate(['/products'], {
        queryParams: { search: searchValue },
        queryParamsHandling: 'merge',
      });
      searchInput.value = '';
    }
  }

  login(): void {
    // Implement login logic
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.isSignedIn = false;
    this.user = null;
    // Optional: Navigate to home or login page
    this.router.navigate(['/']);
  }
}
