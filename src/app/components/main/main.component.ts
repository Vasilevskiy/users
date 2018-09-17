import { CustomersModel } from './../../models/customers.model';
import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private _userService: UserService) {
    this.getCustomers();
  }

  deleteShow = false;
  addCustomer = false;
  isEdit = false;
  customers: CustomersModel[];
  filteredCustomers = [];
  customersAll = 0;
  customersPerPage = 10;
  currentPage = 0;
  buttonCount: any;
  searchVal = '';
  selectedCustomer: CustomersModel;

  getCustomers(): void {
    this._userService.getCustomers().subscribe((res: CustomersModel[]) => {
      this.customers = res;
      this.filteredCustomers = this.customers.slice(this.currentPage, this.customersPerPage);
      this.customersAll = this.customers.length;
      this.buttonCount = this.getButtonCount();
    });
  }

  getButtonCount(): Array<any> {
    return new Array(Math.ceil(this.customersAll / this.customersPerPage));
  }

  selectPage(num: number): void {
    if (num !== this.currentPage && this.buttonCount > 1) {
      this.currentPage = num;
    }
    const begin = this.currentPage * this.customersPerPage;
    const end = begin + this.customersPerPage;
    this.filteredCustomers = this.customers.slice(begin, end);
  }

  addNewCustomer(customer: CustomersModel): void {
    this.addCustomer = !this.addCustomer;
    if (customer) {
      this.filteredCustomers.push(customer);
      this.customers = this.filteredCustomers;
      this.customersAll = this.filteredCustomers.length;
    }
  }

  deleteModal(customer: CustomersModel): void {
    this.selectedCustomer = customer;
    this.deleteShow = !this.deleteShow;
  }

  delete(customer: CustomersModel): void {
    this.filteredCustomers.splice(this.filteredCustomers.indexOf(customer), 1);
    this.customers = this.filteredCustomers;
    this._userService.deleteCustomer(customer.id).subscribe(res => console.log(res));
    this.customersAll = this.filteredCustomers.length;
    this.deleteShow = !this.deleteShow;
    this.getButtonCount();
  }

  edit(): void {
    this.isEdit = !this.isEdit;
  }

  search(value: string): void {
    if (value !== '') {
      this.filteredCustomers = this.customers.filter((res: CustomersModel) => {
        if (res.name.toLowerCase().includes(value) ||
            res.email.toLowerCase().includes(value) ||
            res.tel.includes(value)) {
          return res;
        }
      });
    } else {
      this.getCustomers();
    }
  }
}
