import { CustomersModel } from './../models/customers.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class UserService {
  customersUrl = 'http://localhost:3000/customers/';

  constructor(private _http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this._http.get(this.customersUrl);
  }

  addCustomer(customer: CustomersModel): Observable<any> {
    return this._http.post(this.customersUrl, customer);
  }

  deleteCustomer(customerId: number): Observable<any> {
    console.log(customerId);
    return this._http.delete(this.customersUrl + customerId);
  }

}
