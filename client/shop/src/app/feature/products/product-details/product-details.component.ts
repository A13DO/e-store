import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../../../core/services/requests.service';
import { Product } from '../../../shared/product.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import * as ProductsActions from '../../../store/actions';
import * as CommentsActions from "../../../shared/components/comment/store/comment.actions";

import { Comment } from '../../../core/interfaces/comment.model';
import { Observable } from 'rxjs';
import { selectComments } from '../../../store/selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  statusCartText = "Add to cart"
  // product!: any;
    // Initialize product with default values
  product: any = new Product(
    '',           // _id
    '',           // title
    0,            // rating
    0,            // price
    [],           // images
    '',           // description
    ''            // category
  );

  catId: number = 0;
  uid: string | undefined;
  CommentsObrsv$: Observable<any>;
  storeSub: any;
  rateValue: any;
  commentText: any;
  commentExists!: boolean;
  editCommentMode: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private requestsService: RequestsService,
    private sanitizer: DomSanitizer,
    private store: Store,
    private router: Router
    ) {
      this.CommentsObrsv$ = this.store.pipe(select(selectComments))
      // this.storeSub = this.CommentsObrsv$.subscribe((stateComments: any) => {
      //   console.log(stateComments);
      //   this.comments = stateComments;
      // });
    }
  cartToggle: boolean = false;
  wishToggle: boolean = false;
  images: any;
  productId!: string;
  comments: Comment[] = [];
  recommendedProducts: any[] = [];;
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
        // this.requestsService.getComments(this.productId).subscribe(
        //   data => {
        //     console.log(data);
        //     this.store.dispatch(new ProductsActions.initializeCommentsAction(data))
        // })
        this.getComments(this.productId)
      }
      )
      const user = window.localStorage.getItem("userData");
      if (user) {
        this.uid = JSON.parse(user).id;
        console.log(this.uid);
        this.requestsService.getOneComment(this.productId, this.uid).subscribe(
          (res: Object) => {
            console.log(res.hasOwnProperty(this.uid as string));
            this.commentExists = res.hasOwnProperty(this.uid as string);
          }
        )
      }
    }
    getComments(id: string) {
      this.requestsService.getComments(id).subscribe(
        res => {
          console.log(res);
          for (let key of Object.keys(res.comments[0].comments)) {
            this.comments.push(new Comment(res.comments[0].comments[key].uid, res.comments[0].comments[key].username, res.comments[0].comments[key].comment, res.comments[0].comments[key].rating))
          }
          this.comments? this.comments : [];
          this.store.dispatch(new CommentsActions.initializeCommentsAction(this.comments))
        }
      )
    }
  addComment() {
    console.log(this.rateValue);
    console.log(this.commentText);
    // show the field only in (add new comment or update old comment)
    // -- check if the user commented already. and (switch between addComment and updateComment)
    this.store.dispatch(new CommentsActions.AddCommentAction(
      {
        productID: this.productId,
        comment: {
          uid: this.uid,
          username: "Unknown",
          comment: this.commentText,
          rating: this.rateValue
        }
      }
    ))
    // ========= delete ==============
    // this.requestsService.saveComment(this.productId,  {
    //   uid: this.uid,
    //   username: "Unknown",
    //   comment: this.commentText,
    //   rating: this.rateValue
    // }).subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // )
    // ========= delete ==============

    // window.location.reload()
  }
  switchToEdit() {
    this.editCommentMode = true;
  }
  updateComment() {
    this.store.dispatch(new CommentsActions.UpdateCommentAction(
      {
        productID: this.productId,
        uid: this.uid,
        comment: {
          username: "Abdelrhman",
          comment: this.commentText,
          rating: this.rateValue
        }
      }
    ))
    // this.requestsService.updateComment(this.productId, this.uid,  {
    //   username: "Abdo",
    //   comment: this.commentText,
    //   rating: this.rateValue
    // }).subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // )
    this.editCommentMode = false;
    // window.location.reload()
  }

  getProductsDetails(id: any) {
    this.requestsService.getProduct(id).subscribe(
      (resProduct: any) => {
        this.product = resProduct.data;
        console.log(this.product);

        // this.catId = resProduct.category?.id;
        this.images = this.product.images
        console.log("category", resProduct.data.category);
        this.getRecommendations(resProduct.data.category)
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
  getRecommendations(category: string) {

    this.requestsService.getCategory(category)
    .subscribe((resProducts: Product[]) => {
      this.recommendedProducts = resProducts
      this.recommendedProducts = this.recommendedProducts.filter((p) => p._id !== this.product._id);
  })}
}
