import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Product } from '../../shared/product.model';
import * as ProductsActions from '../../store/actions';
import { Observable, Subscription, takeUntil, tap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { selectCartProducts } from '../../store/selectors';
import { BaseComponent } from 'global/base/base.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  [x: string]: any;
  products: Product[] = [];
  value1: number = 0;
  inputSize = 25;
  one = 1;
  two = 2;
  three = 3;
  four = 4;
  five = 5;
  selected: number = 0;
  cart = 'CART';
  totalPrice!: number;
  storeSub!: Subscription;
  ProductsObrsv$!: Observable<Product[]>;
  value: any;
  constructor(private store: Store<any>, private sanitizer: DomSanitizer) {
    super();
  }
  ngOnInit(): void {
    // this.store.select("cartReducer")
    // this.storeSub = this.store.pipe(takeUntil(this.destroy$)).subscribe(
    //   data => {
    //     this.products = data.cartReducer.products
    //     console.log(this.products);
    //     if (this.products !== null) {this.getTotalPrice(this.products)}
    //   }
    // )

    // this.value1 = product.unit;
    this.ProductsObrsv$ = this.store.pipe(select(selectCartProducts));
    this.storeSub = this.ProductsObrsv$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((cartProducts: Product[]) => {
      this.products = cartProducts;
      if (this.products !== null) {
        // Loop over the cart products array
        this.getTotalPrice(this.products);
      }
    });
  }
  toSafeUrl(url: any) {
    url = url.replace(/["\[\]]/g, '');
    let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return safeUrl;
  }
  onQuantityChange(selectedValue: number, product: Product) {
    // Update the product
    product = { ...product, unit: selectedValue };

    console.log(product);
    // Add the updated product to the products
    const index = this.products.findIndex((p) => p._id === product._id);
    let array = [...this.products];

    array[index] = product;
    // save products
    this.store.dispatch(new ProductsActions.updateProducts(array));
  }
  generateStockArray(stockQuantity: number = 1): number[] {
    return Array.from({ length: stockQuantity }, (_, i) => i + 1);
  }
  getTotalPrice(products: Product[]) {
    this.totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      this.totalPrice += products[i].price * products[i].unit;
    }
  }
  onDeleteProduct(product: Product) {
    this.store.dispatch(
      new ProductsActions.deleteCartItemAction([this.cart, product._id])
    );
    this.totalPrice -= product.price * product.unit;
  }

  getSafeImageUrl(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  removeDuplicates(array: Product[], product: Product): Product[] {
    console.log('=============================================');

    const index = array.findIndex((p) => p._id === product._id);

    if (index !== -1) {
      // If the object is found, create a modified object with the 'unit' property incremented
      const modifiedObject: Product = {
        ...array[index],
        unit: array[index].unit,
      };

      // Update the array with the modified object
      array[index] = modifiedObject;

      // Return a new array with the modified object
      return [...array];
    }

    // If the object is not found, add it to the array

    return [...array, product];
  }
}
