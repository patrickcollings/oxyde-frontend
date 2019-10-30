import { Employee } from './employee';

export class User {
    _id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    employees: Employee[];
    whitelistingSetup: boolean;
    emailTest: boolean;
    verified: boolean;
}