import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { NotAuthorizedMainComponent } from './components/notAuth/not-authorized-main/not-authorized-main.component';
import { AuthorizedMainComponent } from './components/auth/authorized-main/authorized-main.component';
import { LoginModalComponent } from './components/notAuth/login-modal/login-modal.component';
import { FormsModule } from '@angular/forms';
import { ShoeRepairComponent } from './components/auth/shoe-repair/shoe-repair.component';
import { ShoesOnOrderComponent } from './components/auth/shoes-on-order/shoes-on-order.component';
import { AboutShoesComponent } from './components/auth/about-shoes/about-shoes.component';
import { AccountComponent } from './components/auth/account/account.component';
import { CartAuthComponent, ServicesResponse } from "./components/auth/cart-auth/cart-auth.component";
import { AccountOrdersComponent } from './components/auth/account-orders/account-orders.component';
import { NotAuthShoeRepairComponent } from './components/notAuth/not-auth-shoe-repair/not-auth-shoe-repair.component';
import { NotAuthShoesOnOrderComponent } from './components/notAuth/not-auth-shoes-on-order/not-auth-shoes-on-order.component';
import { AccountDataComponent } from './components/auth/account-data/account-data.component';
import { ModalBeforeAfterComponent } from './components/auth/modal-before-after/modal-before-after.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ModalInfoComponent } from './components/auth/modal-info/modal-info.component';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from "@angular/common";
import { ShoesResponse } from "./models/ShoeResponse";
import { UserService } from 'src/app/services/User/user.service';
import { AuthGuard } from "./services/Auth/AuthGuard";
import {AuthInterceptor} from "./services/Auth/auth.interceptor";


const ROUTES:Routes=[
  {path:'not-authorized-main',component:NotAuthorizedMainComponent},
  {path:'not-auth-shoe-repair',component:NotAuthShoeRepairComponent},
  {path:'not-auth-shoes-on-order',component:NotAuthShoesOnOrderComponent},
  {path:'login-modal',component:LoginModalComponent},
  {path:'authorized-main',component:AuthorizedMainComponent, canActivate: [AuthGuard]},
  {path:'shoe-repair',component:ShoeRepairComponent, canActivate: [AuthGuard]},
  {path:'shoes-on-order',component:ShoesOnOrderComponent, canActivate: [AuthGuard]},
  {path:'product/:id',component:AboutShoesComponent, canActivate: [AuthGuard]},
  {path:'account',component:AccountComponent, canActivate: [AuthGuard]},
  {path:'cart-auth',component:CartAuthComponent, canActivate: [AuthGuard]},
  {path:'account-orders',component:AccountOrdersComponent, canActivate: [AuthGuard]},
  {path:'account-data',component:AccountDataComponent, canActivate: [AuthGuard]},
  {path:'modal-before-after',component:ModalBeforeAfterComponent},
  {path:'modal-info',component:ModalInfoComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    NotAuthorizedMainComponent,
    AuthorizedMainComponent,
    LoginModalComponent,
    ShoeRepairComponent,
    ShoesOnOrderComponent,
    AboutShoesComponent,
    AccountComponent,
    CartAuthComponent,
    AccountOrdersComponent,
    NotAuthShoeRepairComponent,
    NotAuthShoesOnOrderComponent,
    AccountDataComponent,
    ModalBeforeAfterComponent,
    ModalInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export type ItemWithPhotos = ShoesResponse | ServicesResponse;
