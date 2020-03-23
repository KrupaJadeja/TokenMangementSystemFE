import { RoleName } from '../_models/role';

export class SignupRequest{
	name: string;
	userName: string;
	email: string;
	role: RoleName;
	password: string;
}