const { Observable } = require("rxjs");


// #1
// always use .unsubscribe

// #2
// Wrong X
this.ServiceProducts.subscribe((cartProducts) => {
  products = cartProducts;
})
// HTML: *ngFor="let movieEl of products"


// Use Streams: Right
ProductsObrsv$: Observable<any>

ProductsObrsv$ = this.ServiceProducts.getProducts();

// HTML: *ngFor="let movieEl of trendMovies$ | async"


// NOTE: dont have to use .subscribe and .unsubscribe cause Anguler do this for you.
// NOTE: when write it on constructor it solve the "undefined" error cause we start w/ default value.
// NOTE: less code

// #3
// Create Module


// 5 Angular Mistakes: https://www.youtube.com/watch?v=ejjln8hI14M&t=2s
