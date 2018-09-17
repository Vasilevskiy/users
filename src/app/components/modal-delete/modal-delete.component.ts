import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomersModel} from '../../models/customers.model';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})

export class ModalDeleteComponent {
  @Output() onModalClose = new EventEmitter<any>();
  @Output() deleteCustomer = new EventEmitter<any>();
  @Input() customer: any;

  constructor() {}

  delete(): void {
    this.deleteCustomer.emit(this.customer);
  }

  closeModal(): void {
    this.onModalClose.emit();
  }
}
