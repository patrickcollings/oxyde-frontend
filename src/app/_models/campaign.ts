import { Employee } from './employee';

export class Campaign { 
    name: String;
    length: Number;
    employees: [{
        id: Number,
        caught: Number
    }];
    phished: Number;
    avoided: Number;
    domain: String;
    emailProvider: String;
    _id: number;
}