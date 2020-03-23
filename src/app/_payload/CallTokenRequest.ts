import { User } from '../_models/user';

export class CallTokenRequest{
    department: String;
    counter: String;
    assigned_user: User; 
}