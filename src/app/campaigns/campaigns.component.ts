import { Component, OnInit } from '@angular/core';
import { CampaignService } from '@app/_services/campaign.service';
import { first } from 'rxjs/operators';
import { User, Campaign, Employee } from '@app/_models';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication.service';
import { EmployeeService } from '@app/_services/employee.service';
import { AlertService } from '@app/_services/alert.service';
import { Router } from '@angular/router';
import { UserService } from '@app/_services/user.service';

import * as moment from 'moment';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  campaign: Campaign;
  employees: [{ id: Number, caught: Boolean }];
  user: User;

  timeRemaining: Number;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private campaignService: CampaignService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit() {

    this.authService.getCurrent().pipe(first()).subscribe(user => {
      this.user = user;
    })

    this.campaignService.getCampaign()
      .pipe(first())
      .subscribe(
        campaign => {
          console.log(campaign);
          this.campaign = campaign;
          this.employees = campaign.employees;
          console.log(this.employees);
          // Remaining time
          // Get time remaining
          let endTime = moment(this.campaign.endTime);
          let now = moment();
          let duration = moment.duration(endTime.diff(now));
          let days = duration.asHours();
          console.log(days);
          this.timeRemaining = Math.floor(days);
        }
      );
  }

  removeCampaign() {
    this.campaignService.removeCampaign(this.campaign._id).pipe(first()).subscribe(res => {
      console.log(res);
      this.campaign = null;
    });
  }

  endCampaign() {
    this.campaignService.endCampaign(this.campaign._id).pipe(first()).subscribe(res => {
      console.log(res);
      this.campaign = null;
    })
  }

  createCampaign() {
    this.router.navigateByUrl('campaigns/create');
  }

}
