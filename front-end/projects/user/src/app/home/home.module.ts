import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatChipsModule } from '@angular/material/chips';
import { LoadingModule } from '../shared/loading/loading.module';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../core/core.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
];


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    CoreModule,        // For core components like Header, Auth, etc.
    LoadingModule,
    RouterModule.forChild(routes)

  ]
})
export class HomeModule { }
