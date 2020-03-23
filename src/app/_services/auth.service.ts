import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';
import { LoginRequest } from '../_payload/loginRequest';
import { JwtAuthenticationResponse } from '../_payload/jwtAuthenticationResponse';
import { Subject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';  
import { SignupRequest } from '../_payload/signupRequest';
import { ForgotPasswordRequest } from '../_payload/forgotPasswordRequest';
import { ResetPasswordRequest } from '../_payload/resetPasswordRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  user: User;

  _userActionOccured: Subject<void> = new Subject();
  get userActionOccured(): Observable<void> { return this._userActionOccured.asObservable() };

  headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  login(userData: LoginRequest): Promise<JwtAuthenticationResponse> {
    return this.http.post(this.baseUrl + '/signin', userData)
      .toPromise()
      .then(response => response.json() as JwtAuthenticationResponse);
  }

  createUser(userData: SignupRequest) {
    return this.http.post(this.baseUrl + '/signup', userData)
      .toPromise().then(response => response)
      .catch(this.handleError);
  }

  notifyUserAction() {
    this._userActionOccured.next();
  }

  forgotpassword(useremail: ForgotPasswordRequest): Promise<any> {
    return this.http.post(this.baseUrl + '/forgotpassword', useremail)
      .toPromise()
      .catch(this.handleError);
  }

  resetpassword(data: ResetPasswordRequest): Promise<void> {
    return this.http.post(this.baseUrl + '/reset', data)
      .toPromise().then(response => response)
      .catch(this.handleError);
  }

  isLoggedIn() {   
  
    // create an instance of JwtHelper class.  
    let jwtHelper = new JwtHelperService();  
  
    // get the token from the localStorage as we have to work on this token.  
    let token = sessionStorage.getItem('token')  
  
    // check whether if token have something or it is null.  
    if(!token)  
    {  
      return false;  
    }  
  
    // get the Expiration date of the token by calling getTokenExpirationDate(String) method of JwtHelper class. this method accepts a string value which is nothing but a token.  
  
    if(token)  
    {  
      let expirationDate = jwtHelper.getTokenExpirationDate(token);  
  
      // check whether the token is expired or not by calling isTokenExpired() method of JwtHelper class.  
  
      let isExpired = jwtHelper.isTokenExpired(token);  
  
      return !isExpired;      
    }     
  }  

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
  
}