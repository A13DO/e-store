import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from '../guards/signedin.guard';
import { MatIconModule } from "@angular/material/icon";

const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [SignedInGuard] }
];


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RouterModule.forChild(routes),
    MatIconModule
]
})
export class AuthModule { }
