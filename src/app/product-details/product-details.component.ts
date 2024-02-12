import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../shared/requests.service';
import { Product } from '../shared/product.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  statusCartText = "Add to cart"
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestsService,
    private sanitizer: DomSanitizer
    ) {}
  cartStatus: boolean = false;
  saveStatus: boolean = false;
  productId!: number;
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.productId = params['id'];
        console.log(params['id']);
      }
    )
    this.requestService.getProduct(this.productId).subscribe(
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
    this.cartStatus? this.cartStatus = false : this.cartStatus = true;
  }
  onSave() {
    this.saveStatus? this.saveStatus = false : this.saveStatus = true;
  }
}
