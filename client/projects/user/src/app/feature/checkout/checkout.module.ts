import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SignedInGuard } from '../../core/guards/signedin.guard';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingModule } from '../../shared/loading/loading.module';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: CheckoutComponent, canActivate: [AuthGuard]  }
];


@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule,
    // Import Angular Material and PrimeNG modules
    LoadingModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthGuard, SignedInGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CheckoutModule { }
