import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { CartComponent } from './core/nav-cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './feature/checkout/checkout.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffect } from './store/effects';
import { ProductDetailsComponent } from './feature/product-details/product-details.component';
import { wishlistEffect } from './wishlist/store/wishlist.effects';
import { CartPageComponent } from './feature/cart-page/cart-page.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthComponent } from './core/auth/auth.component';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    WishlistComponent,
    ProductCardComponent,
    CheckoutComponent,
    ProductDetailsComponent,
    CartPageComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // StoreModule.forRoot(appReducers),
    StoreModule.forRoot({
      wishlist: appReducers.wishlist,
      cart: appReducers.cart,
      auth: appReducers.auth
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([ProductsEffect, wishlistEffect]),
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatChipsModule,
    MatSelectModule,
    GalleriaModule,
    CarouselModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
