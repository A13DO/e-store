import { Component, OnInit } from '@angular/core';
import { RequestsService } from './shared/requests.service';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../app/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  constructor(private requestsService: RequestsService, private store: Store<any>) {}
  ngOnInit() {
    this.requestsService.getCart().subscribe(
      data => {
        this.store.dispatch(new ProductsActions.initializeStateAction(data))
    })
    this.requestsService.getWishlist().subscribe(
      data => {
        this.store.dispatch(new ProductsActions.initializeWishlistAction(data))
    })
  }
}
