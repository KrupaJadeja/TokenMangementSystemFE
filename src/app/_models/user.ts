import { RoleName } from './role';

export class User {
    id: number;
    name: string;
    userName: string;
    role: RoleName;
    email: string;
    resetToken : string;
}