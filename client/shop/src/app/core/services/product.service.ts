import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../../shared/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(
    search?: string,
    category?: string,
    sortOption?: string,
    numericFilter?: string,
    limit?: number
  ) {
    let apiUrl: string = `https://e-commerce-api-wvh5.onrender.com/api/v1/products`;
    // ?numericFilter=150,670
    let sign = '?';
    if (search) {
      apiUrl = apiUrl + `${sign}search=${search}`;
      sign = '&';
      console.log(apiUrl);
    }
    if (category) {
      apiUrl = apiUrl + `${sign}category=${category}`;
      sign = '&';
      console.log(apiUrl);
    }
    if (sortOption) {
      apiUrl = apiUrl + `${sign}sort=${sortOption}`;
      sign = '&';
      console.log(apiUrl);
    }
    if (numericFilter) {
      apiUrl = apiUrl + `${sign}numericFilter=${numericFilter}`;
      sign = '&';
      console.log(apiUrl);
    }
    if (limit) {
      apiUrl = apiUrl + `${sign}limit=${limit}`;
      console.log(apiUrl);
    }
    return this.http.get<{ success: boolean; data: Product[] }>(apiUrl).pipe(
      map((res) => {
        const products: Product[] = res.data.map((product) => {
          return { ...product, unit: 1 };
        });
        return products;
      })
    );
  }

  getProduct(productId: number) {
    return this.http.get(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/products/${productId}`
    );
  }

  getAllCategories() {
    return this.http
      .get<{ success: boolean; data: Product[] }>(
        `https://e-commerce-api-wvh5.onrender.com/api/v1/categories`
      )
      .pipe(map((res) => res.data));
  }

  addNewCategory(category: string) {
    return this.http.post<any>(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/categories`,
      { category: category }
    );
  }

  getCategory(category: string, sortOption?: string, numericFilter?: string) {
    // ?numericFilter=150,670
    let apiUrl: string = `https://e-commerce-api-wvh5.onrender.com/api/v1/products?category=${category}`;
    if (sortOption) {
      apiUrl = apiUrl + `&sort=${sortOption}`;
      console.log(apiUrl);
    }
    if (numericFilter) {
      apiUrl = apiUrl + `&numericFilter=${numericFilter}`;
      console.log(apiUrl);
    }
    return this.http
      .get<{ success: boolean; data: Product[] }>(apiUrl)
      .pipe(map((res) => res.data));
  }
}
