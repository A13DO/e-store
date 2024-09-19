import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './core/header/header.component';
import { CreateProductComponent } from './features/create-product/create-product.component';
import { ProductsComponent } from './features/products/products.component';
import { OrdersComponent } from './features/orders/orders.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './core/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';

import { LoadingModule } from './shared/loading/loading.module';
import { HttpInterceptproviders } from './core/interceptors';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CategoryEffect } from './features/create-product/category store/category.effects';
import { StoreModule } from '@ngrx/store';
import { categoriesReducer } from './features/create-product/category store/category.store';
import { TruncatePipe } from './features/products/truncate.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ProductsComponent,
    CreateProductComponent,
    OrdersComponent,
    AuthComponent,
    TruncatePipe
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    LoadingModule,
    StoreModule.forRoot({ category: categoriesReducer }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([CategoryEffect]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpInterceptproviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
