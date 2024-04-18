import { RequestsService } from '../../shared/requests.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  wishListLen!: number;
  cartLen!: number;
  cartStatus: boolean = true
  isSignedIn: boolean = false;
  user!: User | any;
  constructor(private requestsService: RequestsService) {

  }
  ngOnInit(): void {
    let user = localStorage.getItem('userData');
    if (user) {
      this.isSignedIn = true;
    }
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
  Login() {
    // this.isSignedIn = true;
  }
  Logout() {
    localStorage.setItem('userData', "")
    this.isSignedIn = false;
  }
}
