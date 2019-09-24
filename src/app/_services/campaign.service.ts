import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Employee, Campaign } from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class CampaignService {

    constructor(
        private http: HttpClient,
    ) { }

    public create(name: string, length: number, employees: Employee[]) {
        return this.http.post(`${environment.apiUrl}/campaign`, {name, length, employees});
    } 

    /**
     * Returns the managers current campaign
     */
    public getCampaign() {
        return this.http.get<Campaign>(`${environment.apiUrl}/manager/campaign`);
    }  

    public removeCampaign(id: number) {
        console.log('Removing campaign:' + id);
        return this.http.delete(`${environment.apiUrl}/campaign/${id}`);
    }

}