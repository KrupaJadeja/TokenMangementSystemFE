import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from "@angular/http";
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UpdateUserPasswordRequest } from '../_payload/updateUserPasswordRequest';

@Injectable()
export class UserService {
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

  getUserById(id: number): Promise<any> {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/user/' + id, { headers: headers })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  getUserbyToken(token: String): Promise<any> {
    this.token = token;
    sessionStorage.setItem('token', JSON.stringify(token));
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.baseUrl + '/user/find', { headers: headers })
      .toPromise()
      .then(response => this.user = response.json() as User);
  }

  getusers(): Promise<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/user/findAll', { headers: headers })
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getOnlyUsers(): Promise<User[]> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/user/getOnlyUsres', { headers: headers })
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  addUsers(userData: User): Promise<User> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.baseUrl + '/user', userData,{ headers: headers })
      .toPromise().
      then(response => response.json() as User)
      .catch(this.handleError);
  }

  editUsers(userData: User) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put(this.baseUrl + '/user', userData,{ headers: headers })
      .toPromise().
      then(response => response)
      .catch(this.handleError);
  }

  changePassword(data: UpdateUserPasswordRequest) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.baseUrl + '/user/changepassword', data, { headers: headers })
      .toPromise().then(response => response)
      .catch(this.handleError);
  }

  deleteUser(user: User) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete(this.baseUrl + '/user/' + user.id, { headers: headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}