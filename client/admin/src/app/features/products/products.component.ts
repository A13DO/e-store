import { Component, ElementRef, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product.model';
import { BaseComponent } from 'global/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  titleArrowUp: boolean = false;
  priceArrowUp: boolean = false;
  newestArrowUp: boolean = false;
  titleSort!: string;
  priceSort!: string;
  newestSort!: string;
  constructor(private productsService: ProductsService) {
    super();
  }
  products!: Product[];
  ngOnInit() {
    this.onGetAll();
  }
  onUpdateProduct(id: string) {
    // this.productsService.updateProduct(id, body)
    console.log(`Product's ID: ${id}`);
  }
  // onDeleteProduct(id: string, name: string) {
  onDeleteProduct(event: Event, product: Product) {
    if (confirm('Are you sure to delete ' + product.title)) {
      (event.target as HTMLElement).parentElement?.parentElement?.remove();
      this.productsService.deleteProduct(product._id);
    }
  }
  titleSorting() {
    if (this.titleArrowUp) {
      this.titleArrowUp = false;
      this.titleSort = 'title';
      this.onGetAll(undefined, this.titleSort);
    } else {
      this.titleArrowUp = true;
      this.titleSort = '-title';
      this.onGetAll(undefined, this.titleSort);
    }
  }
  priceSorting() {
    if (this.priceArrowUp) {
      this.priceArrowUp = false;
      this.priceSort = 'price';
      this.onGetAll(undefined, this.priceSort);
    } else {
      this.priceArrowUp = true;
      this.priceSort = '-price';
      this.onGetAll(undefined, this.priceSort);
    }
  }
  newestSorting() {
    if (this.newestArrowUp) {
      this.newestArrowUp = false;
      this.newestSort = 'createdAt';
      this.onGetAll(undefined, this.newestSort);
    } else {
      this.newestArrowUp = true;
      this.newestSort = '-createdAt';
      this.onGetAll(undefined, this.newestSort);
    }
  }
  onGetAll(category?: string, sortOption: string = 'createdAt') {
    this.productsService
      .getAll(category, sortOption)
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        console.log(products);
        this.products = products;
      });
  }
  transform(
    value: string,
    limit: number = 100,
    ellipsis: string = '...'
  ): string {
    if (!value) return '';
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
