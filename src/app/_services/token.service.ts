import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from "@angular/http";
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UpdateUserPasswordRequest } from '../_payload/updateUserPasswordRequest';
import { Counter } from '../_models/counter';
import { Customer } from '../_models/customer';
import { Token } from '../_models/token';
import { CallTokenRequest } from '../_payload/CallTokenRequest';

@Injectable()
export class TokenService {
  private baseUrl = 'http://localhost:8080';
  user: User;
  token: String;
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http,
    private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.token = JSON.parse(sessionStorage.getItem('token'));
  }

  getTokenById(id: number): Promise<any> {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/token/' + id, { headers: headers })
      .toPromise()
      .then(response => response.json() as Customer)
      .catch(this.handleError);
  }

  getTokens(): Promise<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/token/findAll', { headers: headers })
      .toPromise()
      .then(response => response.json() as Customer[])
      .catch(this.handleError);
  }

  getTokensByPriority(): Promise<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/token/getByPriority', { headers: headers })
      .toPromise()
      .then(response => response.json() as Customer[])
      .catch(this.handleError);
  }
  
  addToken(token: Token): Promise<Token> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.baseUrl + '/token', token,{ headers: headers })
      .toPromise().
      then(response => response.json() as Token)
      .catch(this.handleError);
  }

  printDocument(documentName: string, documentData) {
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, documentData]
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }

  editToken(token: Token) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put(this.baseUrl + '/token', token ,{ headers: headers })
      .toPromise().
      then(response => response)
      .catch(this.handleError);
  }

  editCalledToken(callTokenRequest: CallTokenRequest) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put(this.baseUrl + '/token/call', callTokenRequest ,{ headers: headers })
      .toPromise().
      then(response => response)
      .catch(this.handleError);
  }

  deleteToken(token: Token) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete(this.baseUrl + '/token/' + token.id, { headers: headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  deleteTokenByDepartment(callTokenRequest: CallTokenRequest){
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.baseUrl + '/token/stop' ,callTokenRequest , { headers: headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  private handleError(error: any) {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}