import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../../shared/requests.service';
import { Product } from '../../shared/product.module';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../../store/actions';
import { Comment } from '../../core/interfaces/comment.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  statusCartText = "Add to cart"
  product!: Product;
  catId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestsService,
    private sanitizer: DomSanitizer,
    private store: Store,
    private router: Router
    ) {}
  cartToggle: boolean = false;
  wishToggle: boolean = false;
  images: any;
  productId!: number;
  comments: Comment[] = [];
  recommendedProducts: Product[] = [];;
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.productId = params['id'];
        console.log(params['id']);
        this.getProductsDetails(this.productId);
        this.getComments(this.productId)
      }
      )
  }
  addComment() {
    console.log("Nice Product!");
    this.requestService.saveComment(this.productId, "Nice Product!").subscribe()
  }
  getComments(id: number) {
    this.requestService.getComments(id).subscribe(
      comments => {
        this.comments = [comments]
        console.log(this.comments[0])
      }
    )
  }
  getProductsDetails(id: any) {
    this.requestService.getProduct(id).subscribe(
      (resProduct: any) => {
        this.product = new Product(
          resProduct.id,
          resProduct.title,
          resProduct.price,
          1,
          resProduct.images,
          resProduct.description,
          resProduct.category
        );
        this.catId = resProduct.category?.id;
        this.images = this.product.images
        this.getRecommendations(this.catId)
      }
    )
  }
  toSafeUrl(url: any) {
    url = url.replace(/["\[\]]/g, '');
    let safeUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return safeUrl;
  }
  // statusCartText = "Added to cart"
  onAddToCart() {
    if (this.cartToggle == false) {
      this.cartToggle = true;
      this.store.dispatch(new ProductsActions.addToCartAction(this.product))
    } else {
      this.store.dispatch(new ProductsActions.addToCartAction(this.product))
    }
  }
  onAddToWishlist() {
    if (this.wishToggle == false) {
      this.wishToggle = true;
      this.store.dispatch(new ProductsActions.addToWishlistAction(this.product))
    } else {
      this.store.dispatch(new ProductsActions.addToWishlistAction(this.product))
    }
  }
  getRecommendations(id: number) {
    this.requestService.getCategory(id)
    .subscribe(resProducts => {
      this.recommendedProducts = resProducts.map((productData: { id: number; title: string; price: number; images: string[] | undefined; description: string | undefined; category: { id: number; name: string; image: string; } | undefined; }) =>
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
  })}
}
