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

    whitelistingComplete(whitelisted: boolean) {
        return this.http.put(`${environment.apiUrl}/manager/current`, { whitelisted });
    }

    emailTested(emailTested: boolean) {
        return this.http.put(`${environment.apiUrl}/manager/current`, { emailTested });
    }

    quizCompleted(quizCompleted: boolean) {
        return this.http.put(`${environment.apiUrl}/manager/current`, { quizCompleted });
    }

    verify(token: string) {
        return this.http.post(`${environment.apiUrl}/manager/verify`, { token });
    }

    updateQuiz(quiz: object) {
        return this.http.put(`${environment.apiUrl}/manager/current`, { quiz });
    }
}