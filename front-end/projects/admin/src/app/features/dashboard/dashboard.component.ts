import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  productsNum!: number;
  ordersNum!: number;
  ngOnInit(): void {
    this.productsService.getAll().subscribe(
      products => {
        this.productsNum = products.length;
      }
    )
    this.productsService.getOrders().subscribe(
      orders => {
        console.log(orders);
        this.ordersNum = orders.length
      }
    )
  }





}
