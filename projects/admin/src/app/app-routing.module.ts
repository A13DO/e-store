import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { ProductsComponent } from "./features/products/products.component";
import { OrdersComponent } from "./features/orders/orders.component";
import { CreateProductComponent } from "./features/create-product/create-product.component";
import { AuthComponent } from "./core/auth/auth.component";
import { SignedInGuard } from "./core/auth/guards/signedin.guard";
import { AuthGuard } from "./core/auth/guards/auth.guard";



const routes: Routes = [
  {path: "", redirectTo: "/dashboard", pathMatch: "full"},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/auth', component: AuthComponent},
  {path: 'dashboard/products', component: ProductsComponent},
  {path: 'dashboard/products/create', component: CreateProductComponent},
  {path: 'dashboard/products/create/:id', component: CreateProductComponent},
  {path: 'dashboard/orders', component: OrdersComponent}
  // {path: "", redirectTo: "/dashboard", pathMatch: "full"},
  // {path: 'dashboard', component: DashboardComponent},
  // {path: 'dashboard/auth', component: AuthComponent, canActivate: [SignedInGuard]},
  // {path: 'dashboard/products', component: ProductsComponent, canActivate: [AuthGuard]},
  // {path: 'dashboard/products/create', component: CreateProductComponent, canActivate: [AuthGuard]},
  // {path: 'dashboard/products/create/:id', component: CreateProductComponent, canActivate: [AuthGuard]},
  // {path: 'dashboard/orders', component: OrdersComponent, canActivate: [AuthGuard]}
]





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
