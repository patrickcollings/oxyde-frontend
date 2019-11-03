import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Employee, Campaign } from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class CampaignService {

    constructor(
        private http: HttpClient,
    ) { }

    public create(name: string, length: number, employees: Employee[], startTime: moment.Moment, domain: string, fromName: string, templateId: string, dynamic_template_data: object, endTime: moment.Moment) {
        return this.http.post<Campaign>(`${environment.apiUrl}/campaign`, {name, length, employees, domain, startTime, fromName, templateId, dynamic_template_data, endTime});
    } 

    /**
     * Returns the managers current campaign
     */
    public getCampaign() {
        return this.http.get<Campaign>(`${environment.apiUrl}/manager/campaign`);
    }  

    public getCampaignById(id) {
        return this.http.get<Campaign>(`${environment.apiUrl}/campaign/${id}`);
    }

    public getPastCampaigns() {
        return this.http.get<Campaign[]>(`${environment.apiUrl}/manager/campaign/past`);
    }

    public removeCampaign(id: number) {
        console.log('Removing campaign:' + id);
        return this.http.delete(`${environment.apiUrl}/campaign/${id}`);
    }

}