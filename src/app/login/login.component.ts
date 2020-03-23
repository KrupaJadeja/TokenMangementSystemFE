import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RoleName } from '../_models/role';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  public Formdata: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this._cookieService.get('remember')) {
      this.Formdata.username = this._cookieService.get('username');
      this.Formdata.password = this._cookieService.get('password');
      this.Formdata.rememberme = this._cookieService.get('remember');
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  getCookie() {
    if (this.Formdata.rememberme != false) {
      this._cookieService.set('username', this.Formdata.username);
      this._cookieService.set('password', this.Formdata.password);
      this._cookieService.set('remember', this.Formdata.rememberme);
    } else {
      this._cookieService.deleteAll();
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value)
      .then(
        data => {
          if (data != null) {
            this.getUserInfobyLogin(data.accessToken);
          }
        },
        error => {
          this.loading = false;
          window.confirm('Password not matched! Please enter correct paasword');
        });
  }

  private getUserInfobyLogin(token) {
    this.userService.getUserbyToken(token)
      .then(
        data => {
          if (data != null) {
            if (data.role === RoleName.Admin) {
              //set data in session 
              sessionStorage.setItem('user', JSON.stringify(data));
              this.router.navigate(['/admin']);
            } else if (data.role === RoleName.Token) {
              sessionStorage.setItem('user', JSON.stringify(data));
              this.router.navigate(['/customer/list']);
            } else {
              sessionStorage.setItem('user', JSON.stringify(data));
              this.router.navigate(['/staff']);
            }
          }
        },
        error => {
          this.loading = false;
          window.confirm('Password not matched! Please enter correct paasword');
        });
  }

}
