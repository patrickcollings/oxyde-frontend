import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User, Employee, Campaign } from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { environment } from 'environments/environment';

import * as FileSaver from 'file-saver';

import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class CampaignService {

    constructor(
        private http: HttpClient,
    ) { }

    public create(name: string, length: number, employees: Employee[], startTime: moment.Moment, domain: string, fromName: string, templateId: string, dynamic_template_data: object, endTime: moment.Moment) {
        return this.http.post<Campaign>(`${environment.apiUrl}/campaign`, { name, length, employees, domain, startTime, fromName, templateId, dynamic_template_data, endTime });
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

    /**
     * 
     * @param campaignId pass campaign object id and receive the corresponding report
     */
    public getReport(campaignId: string) {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');
        return this.http.get(`${environment.apiUrl}/campaign/report/${campaignId}`, { headers: headers, responseType: 'blob' });
    }

    public removeCampaign(id: string) {
        console.log('Removing campaign:' + id);
        return this.http.delete(`${environment.apiUrl}/campaign/${id}`);
    }

    public downloadReport(campaignId) {
        this.getReport(campaignId).pipe(first()).subscribe(
          reportBlob => {
            let filename = 'report.pdf';
            FileSaver.saveAs(reportBlob, filename);
          },
          err => {
            console.log(err);
          })
      }

}