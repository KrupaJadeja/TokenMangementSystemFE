import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';


@Injectable({ providedIn: 'root' })
export class 
AuthGuard implements CanActivate {
    user : User [] = [];
    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currantUser = sessionStorage.getItem('user');
        if(currantUser){
            return true;
        }else{
            this.router.navigate(["login"]);
            return false;
        }
       }
}