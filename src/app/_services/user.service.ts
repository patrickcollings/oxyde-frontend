﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@app/_models';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    constructor(private http: HttpClient) { }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/manager/register`, user);
    }

    updateWhitelistingSetup(whitelistingSetup: boolean) {
        return this.http.put(`${environment.apiUrl}/manager/current`, { whitelistingSetup });
    }

    updateEmailTesting(emailTest: boolean) {
        return this.http.put(`${environment.apiUrl}/manager/current`, { emailTest });
    }

    verify(token: string) {
        return this.http.post(`${environment.apiUrl}/manager/verify`, { token });
    }
}