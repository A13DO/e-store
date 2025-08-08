import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { BaseComponent } from 'global/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(private productsService: ProductsService) {
    super();
  }
  productsNum!: number;
  ordersNum!: number;
  ngOnInit(): void {
    this.productsService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.productsNum = products.length;
      });
    this.productsService
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe((orders) => {
        console.log(orders);
        this.ordersNum = orders.length;
      });
  }
}
