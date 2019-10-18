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
import { EmailService } from '@app/_services/email.service';
import { Template } from '@app/_models/template';
import * as Handlebars from 'handlebars/dist/cjs/handlebars';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ITemplate {
  id: string;
  name: string;
  versions: [
    {
      id: string;
      name: string;
      subject: string;
      template_id: string;
      test_data: Object;
    }
  ]
}

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  currentUser: User;
  employees = [];

  templates: Template[];
  selectedTemplate: Template;
  templateHTML: SafeHtml;
  compiledTemplate: any;

  testEmail: string;

  objectkeys = Object.keys;

  employeeForm: FormGroup;
  detailForm: FormGroup;
  lengthForm: FormGroup;
  quizForm: FormGroup;
  templateForm: FormGroup;

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

  employeeSelection = [];

  // convenience getter for easy access to form fields
  // get f() { return this.form.controls; }

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private campaignService: CampaignService,
    private alertService: AlertService,
    private router: Router,
    private emailService: EmailService,
    private sanitizer: DomSanitizer
  ) {

    this.currentUser = this.authenticationService.currentUserValue;
    this.selectedTemplate = new Template();
    console.log(this.selectedTemplate);

    this.testEmail = this.currentUser.username;

    // Create Employee Form
    this.employeeForm = this.formBuilder.group({
      employees: new FormControl([], Validators.required),
    });

    // Create detail form
    this.detailForm = this.formBuilder.group({
      campaignName: new FormControl('', Validators.required),
      length: new FormControl(1, Validators.required),
      templateId: new FormControl('', Validators.required)
    });

    // Create length form
    this.lengthForm = this.formBuilder.group({

    });

    this.templateForm = this.formBuilder.group({
      domain: new FormControl('', Validators.required),
      fromName: new FormControl('', Validators.required)
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
    // Get templates
    this.emailService.getTemplates().pipe(first()).subscribe(res => {
      this.templates = res['templates'].templates;
      console.log(this.templates);
    })
  }

  selectTemplate(id) {
    console.log(id);
    this.detailForm.controls.templateId.setValue(id);
    // Get template
    this.emailService.getTemplate(id).pipe(first()).subscribe(res => {
      // let tempString = JSON.parse(res['template'].versions[0].test_data);
      this.selectedTemplate = res['template'];
      this.selectedTemplate.versions[0].test_data = JSON.parse(res['template'].versions[0].test_data);
      // Remove old form controls
      Object.keys(this.templateForm.controls).forEach(control => {
        if (control !== 'domain' && control !== 'fromName') {
          this.templateForm.removeControl(control);
        }
      })
      // Update template form controls
      Object.keys(this.selectedTemplate.versions[0].test_data).forEach(key => {
        this.templateForm.addControl(key, new FormControl('', Validators.required));
      });
      // Compile email template
      this.compiledTemplate = Handlebars.compile(this.selectedTemplate.versions[0].html_content);
      this.templateHTML = this.sanitizer.bypassSecurityTrustHtml(this.compiledTemplate(this.selectedTemplate.versions[0].test_data));
    })
  }

  refreshHTMLPreview() {
    // Create new context
    let context = {};
    Object.keys(this.templateForm.value).forEach(value => {
      context[value] = this.templateForm.value[value];
    });
    // Compile handlebar into safe html with new context
    this.templateHTML = this.sanitizer.bypassSecurityTrustHtml(this.compiledTemplate(context));
  }

  sendTest() {
    // Get quiz details to fill test
    let quiz = this.quizForm.value;
    console.log(quiz);
    const params = {
      email: this.testEmail,
      domain: quiz.companyDomain,
      templateId: this.selectedTemplate.id,
      managerName: quiz.managerName,
      dynamic_template_data: this.selectedTemplate.versions[0].test_data
    }

    console.log(params);
    this.emailService.sendEmail(params).pipe(first()).subscribe(res => {
      console.log(res);
    })
  }

  submit() {
    this.alertService.clear();
    // Get form values
    const employeeValue = this.employeeForm.value;
    const detailValue = this.detailForm.value;
    const quizValue = this.quizForm.value;
    const templateValue = this.templateForm.value;

    console.log(employeeValue);
    console.log(detailValue);
    console.log(quizValue);
    console.log(templateValue);

    const testData = {
      name: "Patrick",
      link: "OpeningLink",
      corporation: "Oxyde",
      managerName: "Marcus",
      campaignLength: 2,
      emailProvider: "Outlook",
    }

    console.log('Creating campaign');

    // this.campaignService.create(detailValue.campaignName, detailValue.length, employeeValue.employees, quizValue.companyDomain, quizValue.emailProvider, quizValue.companyName)
    //   .pipe(first())
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //       if (Object.keys(res).length === 0) {
    //         this.router.navigateByUrl('/campaigns');
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //       this.alertService.error(error);
    //     }
    //   )
  }

}
