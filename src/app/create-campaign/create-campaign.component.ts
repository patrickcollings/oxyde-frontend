import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication.service';
import { EmployeeService } from '@app/_services/employee.service';
import { CampaignService } from '@app/_services/campaign.service';
import { AlertService } from '@app/_services/alert.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';

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
  quizForm: FormGroup;

  sectorOptions = [
    'Accountancy, banking and finance',
    'Business, consulting and management',
    'Charity and voluntary work',
    'Creative arts and design',
    'Energy and utilities',
    'Engineering and manufacturing',
    'Environment and agriculture',
    'Healthcare',
    'Hospitality and events management',
    'Information technology',
    'Law',
    'Law enforcement and security',
    'Leisure, sport and tourism',
    'Marketing, advertising and PR',
    'Media and internet',
    'Property and construction',
    'Public services and administration',
    'Recruitment and HR',
    'Retail',
    'Sales',
    'Science and pharmaceuticals',
    'Social care',
    'Teacher training and education',
    'Transport and logistics',
  ]

  emailProviderOptions = [
    'Gsuite',
    'Outlook'
  ]

  sliderOptions: Options = {
    floor: 5,
    ceil: 21,
    step: 1,
    showTicks: true,
    stepsArray: [
      {value: 5, legend: '5am'},
      {value: 6},
      {value: 7, legend: '7am'},
      {value: 8},
      {value: 9, legend: '9am'},
      {value: 10},
      {value: 11, legend: '11am'},
      {value: 12},
      {value: 13, legend: '1pm'},
      {value: 14},
      {value: 15, legend: '3pm'},
      {value: 16},
      {value: 17, legend: '5pm'},
      {value: 18},
      {value: 19, legend: '7pm'},
      {value: 20},
      {value: 21, legend: '9pm'}
    ],
    hideLimitLabels: true,
    hidePointerLabels: true
  }

  sliderDifficultyOptions: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    stepsArray: [
      {value: 1, legend: 'Easy'},
      {value:2},
      {value:3, legend: 'Medium'},
      {value:4},
      {value:5, legend: 'Hard'}
    ],
  }

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
      length: new FormControl(1, Validators.required),
    });

    // Create length form
    this.lengthForm = this.formBuilder.group({

    });

    // Create Quiz form
    this.quizForm = this.formBuilder.group({
      companyName: new FormControl('', Validators.required),
      companyDomain: new FormControl('', Validators.required),
      managerName: new FormControl('', Validators.required),
      sector: new FormControl('', Validators.required),
      emailProvider: new FormControl('', Validators.required),
      difficulty: new FormControl(2, Validators.required),
      officeHours: new FormControl([9, 17], Validators.required),
      scammedBefore: new FormControl('false', Validators.required),
      technicalSkills: new FormControl('false', Validators.required),
      sme: new FormControl('false', Validators.required),
      techDepartment: new FormControl('false', Validators.required),
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
    const quizValue = this.quizForm.value;

    console.log(employeeValue);
    console.log(detailValue);
    console.log(quizValue);

    const testData = { 
      name: "Patrick",
      link: "OpeningLink",
      corporation: "Oxyde",
      managerName: "Marcus",
      campaignLength: 2,
      emailProvider: "Outlook",

    }



    this.campaignService.create(detailValue.campaignName, detailValue.length, employeeValue.employees, quizValue.companyDomain, quizValue.emailProvider, quizValue.companyName)
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
