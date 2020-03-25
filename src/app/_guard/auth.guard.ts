import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    user: User[] = [];

    constructor(private router: Router,
        private authService: AuthService,
        private userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if ((this.authService.isLoggedIn())) {
            const currantUser = sessionStorage.getItem('user');
            if (currantUser) {
                return true;
            } else {
                sessionStorage.removeItem("user");
                this.userService.user = null;
                this.router.navigate(['/login']);
                return false;
            }
        }
        else {
            sessionStorage.removeItem("user");
            this.userService.user = null;
            this.router.navigate(['/login']);
            return false;
        }


    }

}