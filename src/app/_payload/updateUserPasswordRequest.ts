import { User } from '../_models/user';

export class UpdateUserPasswordRequest{
    newpassword: string;
    user: User;
}