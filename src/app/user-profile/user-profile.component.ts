import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { take, first } from 'rxjs/operators';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmailService } from '@app/_services/email.service';
import { UserService } from '@app/_services/user.service';
import { Router } from '@angular/router';

enum Display {
  Details,
  Verify,
  Whitelist,
  Test
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

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

  user: User;
  email: string;

  get progress() {
    let acc = 0;
    // Calc how many tasks completed
    [this.user.whitelisted, this.user.quizCompleted, this.user.emailTested, this.user.verified].forEach(res => {
      if (res) {
        acc += 1;
      }
    })
    return acc * 25;
  }

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit() {
    // Get latest user value
    this.authService.getCurrent().pipe(take(1)).subscribe(user => {
      this.user = user;
    })

    // Get current values stored by user

    let quiz = this.user.quiz;

    // Create Quiz form
    this.quizForm = this.formBuilder.group({
      companyName: new FormControl(quiz.companyName, Validators.required),
      companyDomain: new FormControl(quiz.companyDomain, Validators.required),
      managerName: new FormControl(quiz.managerName, Validators.required),
      businessSector: new FormControl(quiz.businessSector, Validators.required),
      emailProvider: new FormControl(quiz.emailProvider, Validators.required),
      difficulty: new FormControl(quiz.difficulty, Validators.required),
      officeHours: new FormControl(quiz.officeHours, Validators.required),
      employeeScammedBefore: new FormControl(quiz.employeeScammedBefore, Validators.required),
      employeeGoodTechnicalSkills: new FormControl(quiz.employeeGoodTechnicalSkills, Validators.required),
      smallBusiness: new FormControl(quiz.smallBusiness, Validators.required),
      techDepartment: new FormControl(quiz.techDepartment, Validators.required),
    });
  }

  sendTest() {
    // Fake dynamic data


    // Get quiz details to fill test
    const params = {
      email: this.email,
      domain: 'support@mycompany.com',
      templateId: 'd-43c472391f0c473e86b52fea734c6390',
      managerName: this.user.firstName,
      dynamic_template_data: {
        corporation: 'mycompany',
        managerName: this.user.firstName,
        length: 1,
        employeeName: 'Mark'
      }
    }

    console.log(params);
    this.emailService.sendEmail(params).pipe(first()).subscribe(res => {
      console.log(res);
    })
  }

  complete() {
    this.userService.emailTested(true).pipe(first()).subscribe(res => {
      // Update user object
      this.authService.getCurrent().pipe(first()).subscribe(user => {
        this.user = user;
      })
      // this.router.navigate(['/setup']);
    })
  }

  submitQuiz() {
    this.userService.updateQuiz(this.quizForm.value).pipe(first()).subscribe(res => {
      this.userService.quizCompleted(true).pipe(first()).subscribe(res => {
        // Update user object
        this.authService.getCurrent().pipe(first()).subscribe(user => {
          this.user = user;
        })
      })
    })
  }

  sendVerification() {
    this.userService.reverify().pipe(first()).subscribe(res => console.log(res));
  }
}
