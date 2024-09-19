import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './feature/checkout/checkout.component';
import { ProductDetailsComponent } from './feature/products/product-details/product-details.component';
import { CartPageComponent } from './feature/cart-page/cart-page.component';
import { AuthComponent } from './core/auth/auth.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SignedInGuard } from './core/guards/signedin.guard';
import { ProductsComponent } from './feature/products/products.component';

// const routes: Routes = [
//   {path: "", redirectTo: "/home", pathMatch: "full"},
//   {path: "auth", component: AuthComponent, canActivate: [SignedInGuard]},
//   {path: "home", component: HomeComponent},
//   {path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard]},
//   {path: "wishlist", component: WishlistComponent, canActivate: [AuthGuard]},
//   {path: "cart", component: CartPageComponent, canActivate: [AuthGuard]},
//   {path: "products", component: ProductsComponent},
//   {path: "products/:id", component: ProductDetailsComponent}
// ];

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./feature/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./feature/cart-page/cart-page.module').then(m => m.CartPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./feature/products/products.module').then(m => m.ProductsModule)
  },
  { path: '**', redirectTo: 'home' }  // Optional: Redirect unknown routes to home
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


