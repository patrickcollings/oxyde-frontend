import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Employee } from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

    private currentEmployeeSubject: BehaviorSubject<Employee[]>;
    public currentEmployee: Observable<Employee[]>;

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService    
    ) { }

    public get currentEmployeeValue(): Employee[] {
        return this.currentEmployeeSubject.value;
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/employee/${id}`);
    }

    getEmployees() {
        return this.http.get<Employee[]>(`${environment.apiUrl}/manager/employees`)
            .pipe(map(employees => {
                // this.currentEmployeeSubject.next(employees);
                return employees;
            }));
    }

    /**
     * Add an employee
     */
    add(firstName: string, lastName: string, email: string) {
        return this.http.post(`${environment.apiUrl}/employee`, {firstName, lastName, email});
    }
}