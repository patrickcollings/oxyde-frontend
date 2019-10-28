import { Component, OnInit } from '@angular/core';
import { CampaignService } from '@app/_services/campaign.service';
import { first } from 'rxjs/operators';
import { User, Campaign, Employee } from '@app/_models';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication.service';
import { EmployeeService } from '@app/_services/employee.service';
import { AlertService } from '@app/_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  campaign: Campaign;
  employees: [{id: Number, caught: Boolean}];

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private campaignService: CampaignService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.campaignService.getCampaign()
      .pipe(first())
      .subscribe(
        campaign => {
          console.log(campaign);
          this.campaign = campaign;
          this.employees = campaign.employees;
          console.log(this.employees);
        }
      );
  }

  removeCampaign() {
    this.campaignService.removeCampaign(this.campaign._id).pipe(first()).subscribe(res => {
      console.log(res);
      this.campaign = null;
    });
  }

  createCampaign() {
    this.router.navigateByUrl('campaigns/create');
  }

}
