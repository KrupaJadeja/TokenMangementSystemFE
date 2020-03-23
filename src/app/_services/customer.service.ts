import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from "@angular/http";
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UpdateUserPasswordRequest } from '../_payload/updateUserPasswordRequest';
import { Counter } from '../_models/counter';
import { Customer } from '../_models/customer';

@Injectable()
export class CustomerService {
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

  getCustomerById(id: number): Promise<any> {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/customer/' + id, { headers: headers })
      .toPromise()
      .then(response => response.json() as Customer)
      .catch(this.handleError);
  }

  getCustomers(): Promise<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/customer/findAll', { headers: headers })
      .toPromise()
      .then(response => response.json() as Customer[])
      .catch(this.handleError);
  }

  addCustomer(customer: Customer): Promise<Customer> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.baseUrl + '/customer', customer,{ headers: headers })
      .toPromise().
      then(response => response.json() as Customer)
      .catch(this.handleError);
  }

  editCustomer(customer: Customer) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put(this.baseUrl + '/customer', customer ,{ headers: headers })
      .toPromise().
      then(response => response)
      .catch(this.handleError);
  }

  deleteCustomer(customer: Customer) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete(this.baseUrl + '/customer/' + customer.id, { headers: headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}