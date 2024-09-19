import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page.component';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: CartPageComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  declarations: [
    CartPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartPageModule { }
