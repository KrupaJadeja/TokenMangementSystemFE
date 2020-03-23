import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { RoleName } from 'src/app/_models/role';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  
  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  get isAdmin() {
    return this.userService.user && this.userService.user.role === RoleName.Admin;
  }

  get isStaff() {
    return this.userService.user && this.userService.user.role === RoleName.Staff;
  }

  logout() {
    sessionStorage.removeItem("user");
    this.userService.user = null;
    this.router.navigate(['/login']);
  }

}