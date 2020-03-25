import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './_guard/auth.guard';
import { AppMenuComponent } from './layout/app-menu/app-menu.component';
import { ChangeAdminPasswordComponent } from './components/change-admin-password/change-admin-password.component';
import { UserComponent } from './components/user/user.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { ChangeUserPasswordComponent } from './components/change-user-password/change-user-password.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentAddComponent } from './components/department/department-add/department-add.component';
import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';
import { CounterComponent } from './components/counter/counter.component';
import { CounterAddComponent } from './components/counter/counter-add/counter-add.component';
import { CounterEditComponent } from './components/counter/counter-edit/counter-edit.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { TokenAddComponent } from './components/token/token-add/token-add.component';
import { PrintLayoutComponent } from './components/token/print-layout/print-layout.component';
import { TokenComponent } from './components/token/token.component';
import { CallComponent } from './components/call/call.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { UploadProfileImageComponent } from './components/user/upload-profile-image/upload-profile-image.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'forgot',component: ForgotpasswordComponent },
    { path: 'reset', component: RecoverPasswordComponent},
    { path: '', component: LayoutComponent, canActivate: [AuthGuard] ,
        children: [
            { path: 'menu', component: AppMenuComponent, canActivate: [AuthGuard] },
            { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
            { path: 'cngpass', component: ChangeAdminPasswordComponent, canActivate: [AuthGuard] },
            { path: 'user/list', component: UserComponent,canActivate: [AuthGuard] },
            { path: 'user/add', component: UserAddComponent,canActivate: [AuthGuard]},
            { path: 'user/edit/:id', component: UserEditComponent,canActivate: [AuthGuard]},
            { path: 'user/changepwd/:id', component: ChangeUserPasswordComponent,canActivate: [AuthGuard]},
            { path: 'department/list', component: DepartmentComponent,canActivate: [AuthGuard]},
            { path: 'department/add', component: DepartmentAddComponent,canActivate: [AuthGuard]},
            { path: 'department/edit/:id', component: DepartmentEditComponent,canActivate: [AuthGuard]},
            { path: 'counter/list', component: CounterComponent,canActivate: [AuthGuard]},
            { path: 'counter/add', component: CounterAddComponent,canActivate: [AuthGuard]},
            { path: 'counter/edit/:id', component: CounterEditComponent,canActivate: [AuthGuard]},
            { path: 'customer/list', component: CustomerComponent,canActivate: [AuthGuard]},
            { path: 'customer/add', component: CustomerAddComponent,canActivate: [AuthGuard]},
            { path: 'customer/edit/:id', component: CustomerEditComponent,canActivate: [AuthGuard]},
            { path: 'token/add', component: TokenAddComponent,canActivate: [AuthGuard]},
            { path: 'token/:id', component: TokenComponent,canActivate: [AuthGuard]},
            { path: 'call', component: CallComponent,canActivate: [AuthGuard]},
            { path: 'upload/image', component: UploadProfileImageComponent,canActivate: [AuthGuard]},
            { path: 'profile', component: UserProfileComponent,canActivate: [AuthGuard]},
            // otherwise redirect to home
            { path: '**', redirectTo: '' }
        ]
    }
];

export const routing = RouterModule.forRoot(appRoutes, {
    onSameUrlNavigation: 'reload'
});