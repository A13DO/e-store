import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../shared/product.model';
import * as ProductsActions from '../../store/actions';
import { Observable, Subscription, tap } from 'rxjs';
import { selectCartProducts } from '../../store/selectors';
import { select } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
interface UserInfo {
  name: string;
  email: string;
  contactNumber: number;
  totalCost: number;
}

// Define a nested interface for products
interface OrderProduct {
  name: string;
  quantity: number;
  price: number;
}

// Define the main interface for the order
interface Order {
  userInfo: UserInfo;
  products: OrderProduct[];
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  minDate: string;
  maxDate: string;
  expirationDate: string = 'MM/YY';
  isCardFlip: boolean = false;
  cvv: string = 'CVV';
  constructor(
    private store: Store<any>,
    private _OrderService: OrderService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    const currentDate = new Date();

    // Set the min date to the current month and year
    this.minDate = this.formatDate(currentDate);

    // Set the max date to 2 years from the current date
    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() + 7);
    this.maxDate = this.formatDate(maxDate);
  }

  isFlipped: boolean = false;
  formattedValue = '#### #### #### ####';
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  products!: Product[];
  cart = 'CART';
  totalPrice!: number;
  storeSub!: Subscription;
  order!: Order;
  ProductsObrsv$!: Observable<Product[]>;
  userEmail: any;
  cardNumber: any;
  cardHolder: string = '';
  CardMask = '#### #### #### ####';

  ngOnInit(): void {
    this.ProductsObrsv$ = this.store.pipe(select(selectCartProducts));
    this.storeSub = this.ProductsObrsv$.subscribe((cartProducts: Product[]) => {
      this.products = cartProducts;
      console.log(this.products);
      if (this.products !== null) {
        // Loop over the cart products array
        this.getTotalPrice(this.products);
      }
    });
    console.log(this.totalPrice);
    const user = localStorage.getItem('userData');

    if (user) {
      const email = JSON.parse(user).email;
      this.userEmail = email;
      console.log(this.order);
    }
  }
  getTotalPrice(products: Product[]) {
    this.totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      this.totalPrice += products[i].price * products[i].unit;
    }
    // this.order.userInfo.totalCost = this.totalPrice;
  }
  onDeleteProduct(product: Product) {
    this.store.dispatch(
      new ProductsActions.deleteCartItemAction([this.cart, product._id])
    );
    this.totalPrice -= product.price * product.unit;
  }
  limitCardNumberLength(event: Event) {
    const input = event.target as HTMLInputElement;

    // Remove all non-digit characters
    // let value = input.value;
    let value = input.value.replace(/\D/g, '');

    // Limit to 16 digits
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    // Format the value in groups of four digits separated by spaces
    value = value.match(/.{1,4}/g)?.join(' ') || value;
    // if (value.length > 5 || value.length < 15 ) {
    //   value = "*"
    // }
    // Format the value with masking
    console.log(value.length);
    console.log(value);

    // Update the model and input field
    this.cardNumber = value;
  }
  onSubmit(form: NgForm) {
    let NewOrder: Order = {
      userInfo: {
        name: form.value.name,
        email: this.userEmail,
        contactNumber: form.value['contact-number'],
        totalCost: this.totalPrice,
      },
      products: [],
    };
    for (let product of this.products) {
      NewOrder.products.push({
        name: product.title,
        quantity: product.unit,
        price: product.price,
      });
    }
    console.log(NewOrder);
    this._OrderService.createOrder(NewOrder);
  }
  onCardNumberFocus() {
    const element = this.el.nativeElement.querySelector('.card-item__focus');
    const targetElement =
      this.el.nativeElement.querySelector('.card .card-number');
    // Define the padding you want to apply
    const paddingX = 30; // horizontal padding (left + right)
    const paddingY = 15; // vertical padding (top + bottom)
    // Get the dimensions of the target element
    const rect = targetElement.getBoundingClientRect();
    // Add padding to the calculated width and height
    const widthWithPadding = rect.width + paddingX;
    const heightWithPadding = rect.height + paddingY;
    this.renderer.addClass(element, 'focus-active');
    this.renderer.setStyle(element, 'width', `${widthWithPadding}px`);
    this.renderer.setStyle(element, 'height', `${heightWithPadding}px`);
    this.renderer.setStyle(
      element,
      'transform',
      'translateX(68px) translateY(72px)'
    );
  }
  onCardHolderFocus() {
    const element = this.el.nativeElement.querySelector('.card-item__focus');
    const targetElement = this.el.nativeElement.querySelector(
      '.card .card-holder-wrapper'
    );
    // Define the padding you want to apply
    const paddingX = 0; // horizontal padding (left + right)
    const paddingY = 0; // vertical padding (top + bottom)
    // Get the dimensions of the target element
    const rect = targetElement.getBoundingClientRect();
    // Add padding to the calculated width and height
    const widthWithPadding = rect.width + paddingX;
    const heightWithPadding = rect.height + paddingY;
    this.renderer.addClass(element, 'focus-active');
    this.renderer.setStyle(element, 'width', `${widthWithPadding}px`);
    this.renderer.setStyle(element, 'height', `${heightWithPadding}px`);
    this.renderer.setStyle(
      element,
      'transform',
      'translateX(5px) translateY(133px)'
    );
  }
  onExpirationDateFocus() {
    const element = this.el.nativeElement.querySelector('.card-item__focus');
    const targetElement = this.el.nativeElement.querySelector(
      '.card .date-wrapper'
    );
    // Define the padding you want to apply
    const paddingX = 20; // horizontal padding (left + right)
    const paddingY = 0; // vertical padding (top + bottom)
    // Get the dimensions of the target element
    const rect = targetElement.getBoundingClientRect();
    // Add padding to the calculated width and height
    const widthWithPadding = rect.width + paddingX;
    const heightWithPadding = rect.height + paddingY;
    this.renderer.addClass(element, 'focus-active');
    this.renderer.setStyle(element, 'width', `${widthWithPadding}px`);
    this.renderer.setStyle(element, 'height', `${heightWithPadding}px`);
    this.renderer.setStyle(
      element,
      'transform',
      'translateX(287px) translateY(133px)'
    );
  }

  dateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // Split the input string by '-'
    const [year, month] = input.value.split('-');
    // Return the formatted string as MM/YY
    this.expirationDate = `${month}/${year.slice(2)}`;
    console.log(`${month}/${year.slice(2)}`);
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }
  cvvInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.cvv = input.value;
  }
  onFocus() {
    this.isCardFlip = true;
  }

  onBlur() {
    this.isCardFlip = false;
  }
  getCardStyle() {
    return {
      transform: this.isCardFlip ? 'rotateY(-180deg)' : 'rotateY(0deg)',
      transition: 'transform 0.6s',
    };
  }
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
