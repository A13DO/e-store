import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { ProductService } from '../../../core/services/product.service';
import { CommentService } from '../../../core/services/comment.service';
import { Product } from '../../../shared/product.model';
import { Comment } from '../../../core/interfaces/comment.model';
import { selectComments } from '../../../store/selectors';

import * as ProductsActions from '../../../store/actions';
import * as CommentsActions from '../../../shared/components/comment/store/comment.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  statusCartText = 'Add to cart';
  product: Product = new Product('', '', 0, 0, [], '', '');
  catId: number = 0;
  uid: string | undefined;
  CommentsObrsv$: Observable<any>;
  rateValue: number = 0;
  commentText: string = '';
  commentExists: boolean = false;
  editCommentMode: boolean = false;
  cartToggle: boolean = false;
  wishToggle: boolean = false;
  images: any[] = [];
  productId: string = '';
  comments: Comment[] = [];
  recommendedProducts: Product[] = [];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private productService: ProductService,
    private commentService: CommentService,
    private sanitizer: DomSanitizer,
    private store: Store,
    private router: Router
  ) {
    this.CommentsObrsv$ = this.store.pipe(select(selectComments));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.getProductsDetails(this.productId);
      this.getComments(this.productId);
    });

    const user = window.localStorage.getItem('userData');
    if (user) {
      this.uid = JSON.parse(user).id;
      this.commentService
        .getOneComment(this.productId, this.uid)
        .subscribe((res: any) => {
          this.commentExists = res.hasOwnProperty(this.uid as string);
        });
    }
  }

  getComments(id: string) {
    this.commentService.getComments(id).subscribe((res) => {
      this.comments = [];
      console.log(res.comments);

      for (let key of Object.keys(res.comments[0].comments)) {
        this.comments.push(
          new Comment(
            res.comments[0].comments[key].uid,
            res.comments[0].comments[key].username,
            res.comments[0].comments[key].comment,
            res.comments[0].comments[key].rating
          )
        );
      }
      this.store.dispatch(
        new CommentsActions.initializeCommentsAction(this.comments)
      );
    });
  }

  addComment() {
    this.store.dispatch(
      new CommentsActions.AddCommentAction({
        productID: this.productId,
        comment: {
          uid: this.uid,
          username: 'Unknown',
          comment: this.commentText,
          rating: this.rateValue,
        },
      })
    );
  }

  switchToEdit() {
    this.editCommentMode = true;
  }

  updateComment() {
    this.store.dispatch(
      new CommentsActions.UpdateCommentAction({
        productID: this.productId,
        uid: this.uid,
        comment: {
          username: 'Abdelrhman',
          comment: this.commentText,
          rating: this.rateValue,
        },
      })
    );
    this.editCommentMode = false;
  }

  getProductsDetails(id: any) {
    this.productService.getProduct(id).subscribe((resProduct: any) => {
      this.product = resProduct.data;
      this.images = this.product.images;
      this.getRecommendations(this.product.category);
    });
  }

  toSafeUrl(url: any): SafeResourceUrl {
    url = url.replace(/["\[\]]/g, '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onAddToCart() {
    if (!this.cartToggle) {
      this.cartToggle = true;
    }
    this.store.dispatch(new ProductsActions.addToCartAction(this.product));
  }

  onAddToWishlist() {
    if (!this.wishToggle) {
      this.wishToggle = true;
    }
    this.store.dispatch(new ProductsActions.addToWishlistAction(this.product));
  }

  getRecommendations(category: string) {
    this.productService
      .getCategory(category)
      .subscribe((resProducts: Product[]) => {
        this.recommendedProducts = resProducts.filter(
          (p) => p._id !== this.product._id
        );
      });
  }
}
