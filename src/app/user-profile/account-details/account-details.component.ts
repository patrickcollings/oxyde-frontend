import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication.service';
import { User } from '@app/_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  sliderOptions: Options = {
    floor: 5,
    ceil: 21,
    step: 1,
    showTicks: true,
    stepsArray: [
      { value: 5, legend: '5am' },
      { value: 6 },
      { value: 7, legend: '7am' },
      { value: 8 },
      { value: 9, legend: '9am' },
      { value: 10 },
      { value: 11, legend: '11am' },
      { value: 12 },
      { value: 13, legend: '1pm' },
      { value: 14 },
      { value: 15, legend: '3pm' },
      { value: 16 },
      { value: 17, legend: '5pm' },
      { value: 18 },
      { value: 19, legend: '7pm' },
      { value: 20 },
      { value: 21, legend: '9pm' }
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
      { value: 1, legend: 'Easy' },
      { value: 2 },
      { value: 3, legend: 'Medium' },
      { value: 4 },
      { value: 5, legend: 'Hard' }
    ],
  }

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

  quizForm: FormGroup;

  @Input() user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) { 

  }

  ngOnInit() {
    // Get current values stored by user

    let quiz = this.user.quiz;

    // Create Quiz form
    this.quizForm = this.formBuilder.group({
      companyName: new FormControl(quiz.companyName, Validators.required),
      companyDomain: new FormControl(quiz.companyDomain, Validators.required),
      managerName: new FormControl(quiz.managerName, Validators.required),
      sector: new FormControl(quiz.businessSector, Validators.required),
      emailProvider: new FormControl(quiz.emailProvider, Validators.required),
      difficulty: new FormControl(quiz.difficulty, Validators.required),
      officeHours: new FormControl(quiz.officeHours, Validators.required),
      scammedBefore: new FormControl(quiz.employeeScammedBefore, Validators.required),
      technicalSkills: new FormControl(quiz.employeeGoodTechnicalSkills, Validators.required),
      sme: new FormControl(quiz.smallBusiness, Validators.required),
      techDepartment: new FormControl(quiz.techDepartment, Validators.required),
    });
  }

}
