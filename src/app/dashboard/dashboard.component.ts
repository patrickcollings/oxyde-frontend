import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { CampaignService } from '@app/_services/campaign.service';
import { EmployeeService } from '@app/_services/employee.service';
import { AuthenticationService } from '@app/_services/authentication.service';
import { User, Campaign, Employee } from '@app/_models';
import { first } from 'rxjs/operators';

import * as moment from 'moment';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Charts
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '% of Employees';

  // colorScheme = {
  // domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  // /Charts

  user: User;
  campaign: Campaign;
  employees = [];

  lastCampaign: Campaign;

  timeSinceUpdate: number;
  timeRemaining: number;

  constructor(
    private authService: AuthenticationService,
    private campaignService: CampaignService,
    private employeeService: EmployeeService
  ) {
    this.user = this.authService.currentUserValue;
    this.single = [];
  }

  ngOnInit() {

    this.authService.getCurrent().pipe(first()).subscribe(user => {
      this.user = user;

      if (user.completedCampaigns.length > 0) {
        // Get last completed campaign.
        let campaignId = user.completedCampaigns[user.completedCampaigns.length - 1];
        this.campaignService.getCampaignById(campaignId).pipe(first()).subscribe(campaign => this.lastCampaign = campaign);
      }
    })

    this.campaignService.getCampaign().pipe(first()).subscribe(campaign => {
      this.campaign = campaign;

      // If campaign found then create charts
      if (this.campaign) {
        // Create bar charts
        console.log(this.campaign);
        this.single = [{
          "name": "No Engagement",
          "value": this.campaign.report.percentageNoEngagement
        },
        {
          "name": 'Link Opened',
          "value": this.campaign.report.percentageLinksOpened
        },
        {
          "name": 'Caught',
          "value": this.campaign.report.percentageCaught
        }]

        console.log(this.campaign.report.updated);

        // Get timeSinceUpdate
        let lastUpdate = moment(this.campaign.report.updated);
        let now = moment(new Date());
        let duration = moment.duration(now.diff(lastUpdate));
        let hours = duration.asHours();
        console.log(hours);
        this.timeSinceUpdate = Math.floor(hours);

        // Get time remaining
        let endTime = moment(this.campaign.endTime);
        duration = moment.duration(endTime.diff(now));
        let days = duration.asHours();
        console.log(days);
        this.timeRemaining = Math.floor(days); 
      }
    })

    this.employeeService.getEmployees().pipe(first()).subscribe(res => {
      this.employees = res;
      console.log(this.employees);
    })

  }

  onResize(event) {
    const containerWidth = document.getElementById("chart-container").offsetWidth;
    this.view = [event.target.innerWidth, 400];
  }

}
