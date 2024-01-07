import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { LoginComponent } from './login/login.component';
import { SellerDataComponent } from './seller-data/seller-data.component';
import { AuthSellerGuard } from './auth-seller.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyorderComponent } from './myorder/myorder.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'seller', component: SellerComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'seller-data', component: SellerDataComponent,
    canActivate: [AuthSellerGuard]
  },
  {
    path: 'seller-add-product', component: SellerAddProductComponent,
    canActivate: [AuthSellerGuard]
  },
  {
    path: 'seller-update-product/:id', component: SellerUpdateProductComponent,
    canActivate: [AuthSellerGuard]
  },
  {
    path: 'search/:query', component: SearchComponent
    
  },
  {
    path:'details/:productId',component:ProductDetailsComponent
  },
  {
    path:'cart-page' , component:CartPageComponent
  },
  {
    path:'checkout',component:CheckoutComponent
  },
  {
    path:'myorder',component:MyorderComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
