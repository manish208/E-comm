import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    title: "Home"
  },
  {
    path:"seller-auth",
    component:SellerAuthComponent,
    title: "Seller's Authorization"
  },
  {
    path:"seller-home",
    component:SellerHomeComponent,
    title: "Welcome Seller's",
    canActivate: [AuthGuard]
  },
  {
    path:"seller-add-product",
    component:SellerAddProductComponent,
    title: "Add your products",
    canActivate: [AuthGuard]
  },
  {
    path:"seller-update-product/:id",
    component:SellerUpdateProductComponent,
    title: "Update your product",
    canActivate: [AuthGuard]
  },
  {
    path:"search/:query",
    component:SearchComponent
  },
  {
    path:"details/:productID",
    component:ProductDetailsComponent
  },
  {
    path:"user-auth",
    component:UserAuthComponent
  },
  {
    path:"cart-page",
    component:CartPageComponent,
    title:"Cart Details"
  },
  {
    path:"checkout",
    component:CheckoutComponent,
    title:"Checkout"
  },
  {
    path:"my-orders",
    component:MyOrdersComponent,
    title:"My Orders"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
