import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../shared/loading/loading.module';  // Adjust path as needed

import { HeaderComponent } from './header/header.component';
import { CartComponent } from './nav-cart/cart.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ButtonModule } from 'primeng/button';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthGuard } from './guards/auth.guard';
import { SignedInGuard } from './guards/signedin.guard';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    CartComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ButtonModule,
    LoadingModule,
    RouterModule, // Add RouterModule here
    MatBadgeModule
  ],
  exports: [
    HeaderComponent,
    CartComponent,
    ProductCardComponent  // Export components so they can be used in other modules
  ],
  providers: [AuthGuard, SignedInGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule { }
