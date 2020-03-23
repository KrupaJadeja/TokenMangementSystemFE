import { Customer } from './customer';
import { Department } from './department';
import { Counter } from './counter';

export class Token {
    id: number;
    customer: Customer;
    department: String;
    priority: Boolean;
    createdDate: Date;
    counter: String;
    called: String;
    tokenNumber: String;
    recall: Boolean;
}