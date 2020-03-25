import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { routing } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { LayoutComponent } from './layout/layout.component';
import { AppHeaderComponent } from './layout/app-header/app-header.component';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { AppMenuComponent } from './layout/app-menu/app-menu.component';
import { AppDashboardComponent } from './layout/app-dashboard/app-dashboard.component';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guard/auth.guard';
import { MaterialModule } from './material/material.module';
import { DepartmentService } from './_services/department.service';
import { CounterService } from './_services/counter.service';
import { ComponentsComponent } from './components/components.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { UserComponent } from './components/user/user.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { ChangeUserPasswordComponent } from './components/change-user-password/change-user-password.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { ChangeAdminPasswordComponent } from './components/change-admin-password/change-admin-password.component';
import { DepartmentComponent } from './components/department/department.component';
import { CounterComponent } from './components/counter/counter.component';
import { DepartmentAddComponent } from './components/department/department-add/department-add.component';
import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';
import { CounterEditComponent } from './components/counter/counter-edit/counter-edit.component';
import { CounterAddComponent } from './components/counter/counter-add/counter-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerService } from './_services/customer.service';
import { TokenComponent } from './components/token/token.component';
import { TokenAddComponent } from './components/token/token-add/token-add.component';
import { TokenService } from './_services/token.service';
import { PrintLayoutComponent } from './components/token/print-layout/print-layout.component';
import { CallComponent } from './components/call/call.component';
import { TokenNumberService } from './_services/tokennumber.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagesService } from './_services/message.service';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { UploadProfileImageComponent } from './components/user/upload-profile-image/upload-profile-image.component';
import { UserProfileService } from './_services/userProfile.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmService } from './_services/confirm.service';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    LayoutComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppDashboardComponent,
    UserComponent,
    UserAddComponent,
    ChangeUserPasswordComponent,
    UserEditComponent,
    ChangeAdminPasswordComponent,
    DepartmentComponent,
    CounterComponent,
    DepartmentAddComponent,
    DepartmentEditComponent,
    CounterEditComponent,
    CounterAddComponent,
    CustomerComponent,
    ComponentsComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    TokenComponent,
    TokenAddComponent,
    PrintLayoutComponent,
    CallComponent,
    MessagesComponent,
    ForgotpasswordComponent,
    RecoverPasswordComponent,
    UploadProfileImageComponent,
    ConfirmDialogComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    CookieService,
    UserService,
    AuthGuard,
    DepartmentService,
    CounterService,
    CustomerService,
    TokenService,
    TokenNumberService,
    MessagesService,
    UserProfileService,
    ConfirmService
   ],
  bootstrap: [AppComponent],
  entryComponents: [
    MessagesComponent,
    ConfirmDialogComponent,
    UploadProfileImageComponent
  ],
})
export class AppModule { }
