import { RequestsService } from './../shared/requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  wishListLen!: number;
  cartLen!: number;
  cartStatus: boolean = true
  constructor(private requestsService: RequestsService) {

  }
  ngOnInit(): void {
    this.requestsService.itemsNumbers$.subscribe(
      data => {
        this.cartLen = data[0];
        this.wishListLen = data[1];
        console.log(this.cartLen, this.wishListLen);
      }
    )
  }
  cartToggle() {
    this.requestsService.isCartOpen$.next(true)
  }
}
