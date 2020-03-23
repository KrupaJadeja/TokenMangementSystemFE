import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from "@angular/http";
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UpdateUserPasswordRequest } from '../_payload/updateUserPasswordRequest';
import { Counter } from '../_models/counter';

@Injectable()
export class CounterService {
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

  getCounterById(id: number): Promise<any> {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/counter/' + id, { headers: headers })
      .toPromise()
      .then(response => response.json() as Counter)
      .catch(this.handleError);
  }

  getCounters(): Promise<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/counter/findAll', { headers: headers })
      .toPromise()
      .then(response => response.json() as Counter[])
      .catch(this.handleError);
  }

  addCounter(counter: Counter): Promise<Counter> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.baseUrl + '/counter', counter,{ headers: headers })
      .toPromise().
      then(response => response.json() as Counter)
      .catch(this.handleError);
  }

  editCounter(counter: Counter) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put(this.baseUrl + '/counter', counter ,{ headers: headers })
      .toPromise().
      then(response => response)
      .catch(this.handleError);
  }

  deleteCounter(counter: Counter) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete(this.baseUrl + '/counter/' + counter.id, { headers: headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}