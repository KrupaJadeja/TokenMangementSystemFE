import { Component, OnInit } from '@angular/core';
import { RoleName } from 'src/app/_models/role';
import { RouterEvent, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { Subject, Subscription } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/_services/user.service';
import { UserProfileService } from 'src/app/_services/userProfile.service';

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
    private router: Router,
    private userProfileService: UserProfileService,
    public _DomSanitizationService: DomSanitizer
  ){ this.ngOnInit(); }

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
        this.userProfileService.getUserProfileById(this.userService.user.id)
        .then(data => {
          this.imgsrc = data._body
        });
    });
    this.userService.getUserbyToken(this.token)
    .then(data => {
      this.user = data;
      this.name = data.name;
    });
    this.userProfileService.getUserProfileById(this.userService.user.id)
    .then(data => {
      this.imgsrc = data._body
    });
  }

  transform() {
    return this._DomSanitizationService.bypassSecurityTrustResourceUrl(this.imgsrc);
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
