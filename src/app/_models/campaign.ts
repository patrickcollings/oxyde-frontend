import { Employee } from './employee';

export class Campaign { 
    name: string;
    length: Number;
    employees: [{
        id: Number,
        caught: Boolean,
        linkOpened: Number
    }];
    phished: Number;
    avoided: Number;
    domain: string;
    emailProvider: string;
    _id: string;
    report: {
        percentageNoEngagement: Number;
        percentageLinksOpened: Number;
        percentageCaught: Number;
        updated: Date;
    };
    startTime: Date;
    endTime: Date;
}