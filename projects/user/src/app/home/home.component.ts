import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../shared/product.module';
import { RequestsService } from '../shared/requests.service';
import * as ProductsActions from '../store/actions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit{
  products!: Product[];
  productsLen: number = 0;
  // products: Product[] = [
  //   {
  //   id: 1,
  //   name: "NIKE",
  //   rate: 9,
  //   price: 200,
  //   unit: 1
  //   },
  //   {
  //   id: 2,
  //   name: "ADIDAS",
  //   rate: 8,
  //   price: 200,
  //   unit: 1
  //   },
  //   {
  //   id: 3,
  //   name: "YEEZY",
  //   rate: 8,
  //   price: 200,
  //   unit: 1
  //   },
  //   {
  //   id: 4,
  //   name: "RICK OWENS",
  //   rate: 8,
  //   price: 200,
  //   unit: 1
  //   },
  //   {
  //   id: 5,
  //   name: "JORDAN",
  //   rate: 8,
  //   price: 200,
  //   unit: 1
  //   },
  //   {
  //   id: 6,
  //   name: "FENDI",
  //   rate: 7,
  //   price: 200,
  //   unit: 1
  //   }
  // ];
  count: any;
  constructor(private requestsService: RequestsService, private store: Store<any>) {
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
  ngOnInit() {
    // this.requestsService.getCart().subscribe(
    //   data => {
    //     this.store.dispatch(new ProductsActions.initializeStateAction(data))
    //   }
    //   )
    this.requestsService.getAll().subscribe(
      (resProducts: any) => {
        this.products = resProducts.map((productData: { id: number; title: string; price: number; images: string[] | undefined; description: string | undefined; category: { id: number; name: string; image: string; } | undefined; }) =>
          new Product(
            productData.id,
            productData.title,
            productData.price,
            1,
            productData.images,
            productData.description,
            productData.category
          )
        );;
        this.productsLen = this.products.length;
      }

    )
      this.store.subscribe(
        data => {
          // console.log(data);

        }
    )
  }
  onAddToWishlist() {
    // this.requestsService.addToWishlist()
  }
  onAddToCart() {
    // this.requestsService.addToCart()
  }
  onGetAllCategories() {
    this.requestsService.getAll().subscribe(
      (resProducts: any) => {
        this.products = resProducts.map((productData: { id: number; title: string; price: number; images: string[] | undefined; description: string | undefined; category: { id: number; name: string; image: string; } | undefined; }) =>
          new Product(
            productData.id,
            productData.title,
            productData.price,
            1,
            productData.images,
            productData.description,
            productData.category
          )
        );;
      }

    )
  }
  onGetCategory(id: number) {
    this.requestsService.getCategory(id).subscribe(
      (resProducts: any) => {
        this.products = resProducts.map((productData: { id: number; title: string; price: number; images: string[] | undefined; description: string | undefined; category: { id: number; name: string; image: string; } | undefined; }) =>
          new Product(
            productData.id,
            productData.title,
            productData.price,
            1,
            productData.images,
            productData.description,
            productData.category
          )
        );
        this.productsLen = this.products.length;
      }
      )
  }
}

