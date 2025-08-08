import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/product.model';
import { Store, select } from '@ngrx/store';
import * as ProductsActions from '../../store/actions';
import { Observable, Subscription, takeUntil } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { selectCartProducts } from '../../store/selectors';
import { AppState } from '../../store/app.reducer';
import { CartService } from '../services/cart.service';
import { BaseComponent } from 'global/base/base.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent extends BaseComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  totalPrice: number = 0;
  cartStatus: boolean = false;
  readonly cartType = 'CART'; // Marked as readonly since it's a constant

  private subscriptions: Subscription = new Subscription();

  constructor(
    private _CartService: CartService,
    private store: Store<AppState>,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit(): void {
    this.initCartProductsSubscription();
    this.initTotalPriceSubscription();
    this.initCartStatusSubscription();
  }

  private initCartProductsSubscription(): void {
    const cartProducts$ = this.store.pipe(select(selectCartProducts));

    this.subscriptions.add(
      cartProducts$
        .pipe(takeUntil(this.destroy$))
        .subscribe((cartProducts: Product[]) => {
          this.products = cartProducts || [];
          if (this.products.length > 0) {
            this.calculateTotalPrice(this.products);
          }
        })
    );
  }

  private initTotalPriceSubscription(): void {
    this.subscriptions.add(
      this._CartService.totalPrice$
        .pipe(takeUntil(this.destroy$))
        .subscribe((price: number) => (this.totalPrice = price))
    );
  }

  private initCartStatusSubscription(): void {
    this.subscriptions.add(
      this._CartService.isCartOpen$
        .pipe(takeUntil(this.destroy$))
        .subscribe((status: boolean) => {
          this.cartStatus = status;
          console.log('Cart Status:', this.cartStatus);
        })
    );
  }

  toSafeUrl(url: string): SafeResourceUrl {
    const cleanedUrl = url.replace(/["\[\]]/g, '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(cleanedUrl);
  }

  onDeleteProduct(event: Event, product: Product): void {
    event.preventDefault();
    this.store.dispatch(
      new ProductsActions.deleteCartItemAction([this.cartType, product._id])
    );
    this.totalPrice -= product.price * product.unit;
  }

  private calculateTotalPrice(products: Product[]): void {
    this.totalPrice = products.reduce(
      (total, product) => total + product.price * product.unit,
      0
    );
  }

  openCart(): void {
    this.cartStatus = true;
  }

  closeCart(): void {
    this.cartStatus = false;
  }
}
