import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { CartComponent } from './core/nav-cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './feature/checkout/checkout.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffect } from './store/effects';
import { ProductDetailsComponent } from './feature/products/product-details/product-details.component';
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
import { AuthEffect } from './core/auth/store/auth.effects';
import { CommentComponent } from './shared/components/comment/comment.component';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpInterceptproviders } from './core/interceptors';
import { LoadingModule } from './shared/loading/loading.module';
import { RatingModule } from 'primeng/rating';
import { CommentsEffect } from './shared/components/comment/store/comment.effects';
import { ProductsComponent } from './feature/products/products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // HomeComponent,
    // WishlistComponent,
    // ProductCardComponent,
    // CheckoutComponent,
    // ProductDetailsComponent,
    // CartPageComponent,
    // AuthComponent,
    CommentComponent,
    // ProductsComponent
  ],
  // imports: [
  //   BrowserModule,
  //   HttpClientModule,
  //   AppRoutingModule,  // Main routing module
  //   BrowserAnimationsModule,

  //   // Feature Modules
  //   StoreModule.forRoot(appReducers),
  //   EffectsModule.forRoot([ProductsEffect, wishlistEffect, AuthEffect, CommentsEffect]),
  //   StoreDevtoolsModule.instrument({ maxAge: 25 }),
  // ],
  imports: [
    BrowserModule,
    CoreModule,        // For core components like Header, Auth, etc.
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    LoadingModule,
    RouterModule, // Add RouterModule here

    // StoreModule.forRoot(appReducers),
    StoreModule.forRoot({
      wishlist: appReducers.wishlist,
      cart: appReducers.cart,
      auth: appReducers.auth,
      comments: appReducers.comments
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([ProductsEffect, wishlistEffect, AuthEffect, CommentsEffect]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpInterceptproviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
