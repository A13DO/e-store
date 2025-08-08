import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(body: any) {
    return this.http.post<any>(
      'https://e-commerce-api-wvh5.onrender.com/api/v1/orders',
      body
    );
  }
}
