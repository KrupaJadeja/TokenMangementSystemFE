import { Component, OnInit } from '@angular/core';
import { RoleName } from 'src/app/_models/role';
import { RouterEvent, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { Subject, Subscription } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  user: User = {
    id: undefined,
    name: undefined,
    userName: undefined,
    role: undefined,
    email: undefined,
    resetToken : undefined
  };
  token: String;
  dtTrigger: Subject<any> = new Subject();
  name: String;
  navlink: boolean = false;
  public imgsrc: any;

  constructor(private userService: UserService,
    private router: Router
  ) {
    this.ngOnInit();
  }

  ngOnInit() {
    this.token = this.userService.token;
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {

      this.userService.getUserbyToken(this.token)
        .then(data => {
          this.user = data;
          this.name = data.name;
        });
    });
    this.userService.getUserbyToken(this.token)
    .then(data => {
      this.user = data;
      this.name = data.name;
    });
  }
  get isAdmin() {
    return this.user && this.user.role === RoleName.Admin;
  }

  get isStaff() {
    return this.user && this.user.role === RoleName.Staff;
  }

  get isTokenist(){
    return this.user && this.user.role === RoleName.Token;
  }

  clickEvent() {
    this.navlink = !this.navlink;
  }
}
