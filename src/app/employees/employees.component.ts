import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication.service';
import { UserService } from '@app/_services/user.service';
import { EmployeeService } from '@app/_services/employee.service';
import { AlertService } from '@app/_services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  currentUser: User;
  employees = [];
  form: FormGroup;

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl()
    });

    // Get managers employees
    this.employeeService.getEmployees().pipe(first()).subscribe(employees => {
      this.employees = employees;
      console.log(employees);
    })
  }

  ngOnInit() {
    // this.loadAllUsers();
    // this.employeeService.employees
  }

  /**
   * Add an employee, requires full Name and email
   */
  addEmployee(firstName: string, lastName: string, email) {
    this.employeeService.add(firstName, lastName, email)
      .pipe(first())
      .subscribe(
        res => {
          this.employeeService.getEmployees().pipe(first()).subscribe(employees => {
            this.employees = employees;
          });
        },
        error => {
          this.alertService.error(error);
        }
      )
  }

  deleteEmployee(id) {
    this.employeeService.delete(id).pipe(first()).subscribe(res => {
      this.employeeService.getEmployees().pipe(first()).subscribe(employees => {
        this.employees = employees;
      });
    })
  }

  submit() {
    // reset alerts on submit
    this.alertService.clear();

    console.log(this.form.value);
    const val = this.form.value;
    this.addEmployee(val.firstName, val.lastName, val.email);
  }

}
