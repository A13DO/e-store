import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../shared/product.model';
import { RequestsService } from '../core/services/requests.service';
import * as ProductsActions from '../store/actions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ProductsService } from 'client/admin/src/app/core/services/products.service';
import { Route, Router } from '@angular/router';
import { Carousel } from 'primeng/carousel';





interface SortByOption {
  name: string;
  code: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})

export class HomeComponent implements OnInit {
// })
brands = [
  { image: 'pngwing.com (10).webp' },
  { image: 'pngwing.com (3).webp' },
  { image: 'pngwing.com (12).webp' },
  { image: 'pngwing.com (13).webp' },
  { image: 'pngwing.com (6).webp' },
  { image: 'pngwing.com (2).webp' },
  { image: 'pngwing.com (4).webp' },
  { image: 'pngwing.com (8).webp' },
  { image: 'pngwing.com (5).webp' },
  { image: 'pngwing.com (7).webp' },
  { image: 'pngwing.com (9).webp' },
  { image: 'pngwing.com.webp' }
];
  products!: Product[];
  productsLen: number = 0;
  rangeValues: number[] = [1, 670];
  productsStatus: string = "all";

  count: any;
  sortByOptions: SortByOption[] = [
    {name:"Avg. Customer Review", code: "-rating"},
    {name:"Price: Low to High", code: "price"},
    {name:"Price: High to Low", code: "-price"},
    {name:"Newest Arrivals", code: "createdAt"}
  ];
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;

  selectedSortByOption: SortByOption = {name:"Avg. Customer Review", code: "-rating"};
  currentCategory: string | undefined;
  categories: any;
  cartToggle: boolean = false;
  constructor(private requestsService: RequestsService, private productsService: ProductsService,private router: Router, private store: Store<any>) {
  // this.requestsService.getWishlist().subscribe(
  //   data => {
  //     this.products = data;
  //     if (this.products == null) {
  //       this.products = []
  //     }
  //   }
  // )
  // this.store.subscribe(data => {
  //   this.count = data.counter.n
  // })
}


ngOnDestroy() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
}
  ngOnInit() {
    this.onGetAll(undefined, this.selectedSortByOption.code)
    this.productsService.getAllCategories()
    .subscribe(
      (res: any) => {
        this.categories = res.categories;
        console.log(this.categories);
      }
    )

  }
  convertRangeToCurrency(range: number[]): string {
    if (range[1] == 670) {
      return [`$${range[0]}`, `$${range[1]}+`].join(" - ");
    }
    return [`$${range[0]}`, `$${range[1]}`].join(" - ");
  }
  onSortOptionChange(event: any) {
    this.selectedSortByOption = event.value
    this.onGetAll(this.currentCategory, this.selectedSortByOption.code)
  }
  getProductswithRangePrice(range: number[]) {
    console.log(range.join(","));
    this.onGetAll(this.currentCategory, this.selectedSortByOption.code, range.join(","))
  }
  onAddToWishlist() {
    // this.requestsService.addToWishlist()
  }
  onAddToCart(product: any) {
    if (!this.isSignedIn()) {
      this.router.navigate(['/auth']);
    }
    if (this.cartToggle == false) {
      this.cartToggle = true;
      this.store.dispatch(new ProductsActions.addToCartAction(product))
    } else {
      this.store.dispatch(new ProductsActions.addToCartAction(product))
    }
  }
  clothing: string = "clothing";
  furniture: string = "furniture";
  electronics: string = "electronics";
  accessories: string = "accessories";
  onGetAll(category?: string, sortOption: string = this.selectedSortByOption.code, numericFilter?: string, limit?: number) {
    this.currentCategory = category;
    console.log(sortOption);
    console.log( category , sortOption, numericFilter);
    this.requestsService.getAll(undefined, category , sortOption, numericFilter, 4).subscribe(
      (resProducts: Product[]) => {
        const data: Product[] = resProducts
          this.products = data
          this.productsLen = this.products.length;
      }
    )
  }
  navigateToProducts(category: string) {
    this.router.navigate(['/products'], { state: { category } });
  }
  isSignedIn() {
    let user = localStorage.getItem('userData');
    console.log(user);
    return user
  }
private extendedBrands: any[] = [];
private currentIndex = 0;
private autoPlayInterval = 3000; // 3 seconds
private intervalId!: number;
private slideWidth = 20; // Width percentage for 5 items
private resetIndex = this.brands.length - 6 // Set to 1 less than the number of original items

ngAfterViewInit() {
  this.setupCarousel();
  this.startAutoPlay();
}

setupCarousel() {
  // Duplicate the array to handle seamless looping
  this.extendedBrands = [...this.brands, ...this.brands, ...this.brands];
  const carouselWrapper = this.carouselWrapper.nativeElement as HTMLElement;
  const initialOffset = -this.brands.length * this.slideWidth;
  carouselWrapper.style.transform = `translateX(${initialOffset}%)`;
}

startAutoPlay() {
  this.intervalId = window.setInterval(() => {
    this.currentIndex = (this.currentIndex + 1) % this.extendedBrands.length;
    const offset = -this.currentIndex * this.slideWidth;
    const carouselWrapper = this.carouselWrapper.nativeElement as HTMLElement;
    carouselWrapper.style.transform = `translateX(${offset}%)`;

    // Reset index when reaching the reset point of duplicated items
    if (this.currentIndex > this.resetIndex) {
      setTimeout(() => {
        this.currentIndex = 0;
        carouselWrapper.style.transition = 'none'; // Disable transition
        carouselWrapper.style.transform = `translateX(${-this.brands.length * this.slideWidth}%)`;
        setTimeout(() => {
          carouselWrapper.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
        }, 50); // Small delay to re-enable transition
      }, this.autoPlayInterval - 500); // Adjust the delay to reset earlier
    }
  }, this.autoPlayInterval);
}
}

