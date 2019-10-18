import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient
  ) { }

  sendTest(email: string) {
    // Email params
    // Requires
    const body = {
      name: 'James',
      corporation: 'Temp Industry',
      managerName: 'My Manager',
      campaignLength: 3,
      emailProvider: 'GSuite',
      employeeId: '1',
      campaignId: '1',
      domain: 'customdomain',
      email
    }

    return this.http.post(`${environment.apiUrl}/email/send`, body);
  }

  sendEmail(params: Object) {
    return this.http.post(`${environment.apiUrl}/email/sendtest`, params);
  }

  getTemplates() {
    return this.http.get(`${environment.apiUrl}/email/templates`);
  }

  getTemplate(id: string) {
    return this.http.get(`${environment.apiUrl}/email/template/${id}`);
  }
}
