import { Component } from '@angular/core';
import { Product } from '../../shared/product.model';
import { RequestsService } from '../../core/services/requests.service';
import { ProductsService } from 'client/admin/src/app/core/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'global/base/base.component';
import { takeUntil } from 'rxjs';

interface SortByOption {
  name: string;
  code: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent extends BaseComponent {
  products!: Product[];
  productsLen: number = 0;
  rangeValues: number[] = [1, 670];
  productsStatus: string = 'all';

  count: any;
  sortByOptions: SortByOption[] = [
    { name: 'Avg. Customer Review', code: '-rating' },
    { name: 'Price: Low to High', code: 'price' },
    { name: 'Price: High to Low', code: '-price' },
    { name: 'Newest Arrivals', code: 'createdAt' },
  ];

  selectedSortByOption: SortByOption = {
    name: 'Avg. Customer Review',
    code: '-rating',
  };
  currentCategory: string | undefined;
  categories: any;
  category: string = '';
  searchValue: any;
  isNavOpen: boolean = false;
  constructor(
    private requestsService: RequestsService,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {
    super();
    // this.requestsService.getWishlist().pipe(takeUntil(this.destroy$)).subscribe(
    //   data => {
    //     this.products = data;
    //     if (this.products == null) {
    //       this.products = []
    //     }
    //   }
    // )
    // this.store.pipe(takeUntil(this.destroy$)).subscribe(data => {
    //   this.count = data.counter.n
    // })
  }

  ngOnInit() {
    this.category = history.state.category;
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.searchValue = params['search'] || ''; // Get the 'search' query param, or empty string if not present

        // Call your search logic based on the searchValue
        this.onGetAll(
          this.searchValue,
          this.category,
          this.selectedSortByOption.code
        );
      });
    this.onGetAll(
      this.searchValue,
      this.category,
      this.selectedSortByOption.code
    );
    this.productsService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.categories = res.categories;
        console.log(this.categories);
      });
  }
  convertRangeToCurrency(range: number[]): string {
    if (range[1] == 670) {
      return [`$${range[0]}`, `$${range[1]}+`].join(' - ');
    }
    return [`$${range[0]}`, `$${range[1]}`].join(' - ');
  }
  onSortOptionChange(event: any) {
    this.selectedSortByOption = event.value;
    this.onGetAll(
      undefined,
      this.currentCategory,
      this.selectedSortByOption.code
    );
  }
  getProductswithRangePrice(range: number[]) {
    console.log(range.join(','));
    this.onGetAll(
      undefined,
      this.currentCategory,
      this.selectedSortByOption.code,
      range.join(',')
    );
  }
  onAddToWishlist() {
    // this.requestsService.addToWishlist()
  }
  onAddToCart() {
    // this.requestsService.addToCart()
  }
  clothes: string = 'clothes';
  furniture: string = 'furniture';
  electronics: string = 'electronics';
  onGetAll(
    search?: string,
    category?: string,
    sortOption: string = this.selectedSortByOption.code,
    numericFilter?: string
  ) {
    this.currentCategory = category;
    console.log(sortOption);
    console.log(search, category, sortOption, numericFilter);
    this.requestsService
      .getAll(search, category, sortOption, numericFilter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resProducts: Product[]) => {
        const data: Product[] = resProducts;
        this.products = data;
        this.productsLen = this.products.length;
      });
  }
  get noSelectedCategory(): boolean {
    return this.category === ''; // Returns true if "All" should be selected
  }
  toggleNav() {
    this.isNavOpen = !this.isNavOpen; // Toggle the nav state
  }
}
