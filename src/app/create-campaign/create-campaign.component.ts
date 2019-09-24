import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication.service';
import { EmployeeService } from '@app/_services/employee.service';
import { CampaignService } from '@app/_services/campaign.service';
import { AlertService } from '@app/_services/alert.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  currentUser: User;
  employees = [];

  employeeForm: FormGroup;
  detailForm: FormGroup;
  lengthForm: FormGroup;

  employeeSelection = [];

  // convenience getter for easy access to form fields
  // get f() { return this.form.controls; }

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private campaignService: CampaignService,
    private alertService: AlertService,
    private router: Router
  ) {

    this.currentUser = this.authenticationService.currentUserValue;

    // Create Employee Form
    this.employeeForm = this.formBuilder.group({
      employees: new FormControl([], Validators.required),
    });

    // Create detail form
    this.detailForm = this.formBuilder.group({
      campaignName: new FormControl('', Validators.required),
    });

    // Create length form
    this.lengthForm = this.formBuilder.group({
      length: new FormControl(12, Validators.required),
    });

    this.employeeService.getEmployees().pipe(first()).subscribe(employees => {
      this.employees = employees;
    })
  }

  ngOnInit() {
  }

  submit() {
    this.alertService.clear();
    // Get form values
    const employeeValue = this.employeeForm.value;
    const detailValue = this.detailForm.value;
    const lengthValue = this.lengthForm.value;

    console.log(employeeValue);
    console.log(detailValue);
    console.log(lengthValue);

    this.campaignService.create(detailValue.campaignName, lengthValue.length, employeeValue.employees)
      .pipe(first())
      .subscribe(
        res => {
          console.log(res);
          if (Object.keys(res).length === 0) {
            this.router.navigateByUrl('/campaigns');
          }
        },
        error => {
          console.log(error);
          this.alertService.error(error);
        }
      )
  }

}
