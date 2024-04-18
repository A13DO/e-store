import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './feature/checkout/checkout.component';
import { ProductDetailsComponent } from './feature/product-details/product-details.component';
import { CartPageComponent } from './feature/cart-page/cart-page.component';
import { AuthComponent } from './core/auth/auth.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SignedInGuard } from './core/guards/signedin.guard';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "auth", component: AuthComponent, canActivate: [SignedInGuard]},
  {path: "home", component: HomeComponent},
  {path: "wishlist", component: WishlistComponent, canActivate: [AuthGuard]},
  {path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: "cart", component: CartPageComponent, canActivate: [AuthGuard]},
  {path: "product/:id", component: ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
