import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { LoadingModule } from '../shared/loading/loading.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CoreModule } from '../core/core.module';

const routes: Routes = [
  { path: '', component: WishlistComponent, canActivate: [AuthGuard]  }
];


@NgModule({
  declarations: [
    WishlistComponent,

  ],
  imports: [
    CommonModule,
    CoreModule,
    LoadingModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WishlistModule { }
