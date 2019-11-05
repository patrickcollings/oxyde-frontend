import { Employee } from './employee';

export class User {
    _id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    employees: Employee[];
    whitelisted: boolean;
    emailTested: boolean;
    verified: boolean;
    quizCompleted: boolean;
    accountDetailsCompleted: boolean;
    completedCampaigns: string[];
    quiz: {
        companyName: String;
        companyDomain: String;
        managerName: String;
        businessSector: String;
        difficulty: String;
        officeHours: Array<any>;
        employeeScammedBefore: Boolean;
        employeeGoodTechnicalSkills: Boolean;
        smallBusiness: Boolean;
        mediumBusiness: Boolean;
        largeBusiness: Boolean;
        techDepartment: Boolean;
        emailProvider: Boolean;
    }
}