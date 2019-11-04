import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '@app/_services/campaign.service';
import { first } from 'rxjs/operators';
import { Campaign, Employee } from '@app/_models';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.scss']
})
export class CampaignViewComponent implements OnInit {

  campaign: Campaign;
  employees: Object[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignService: CampaignService
  ) { 
    // this.campaign = new Campaign();
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(first()).subscribe(params => {
      this.campaignService.getCampaignById(params['id']).pipe(first()).subscribe(campaign => {
        console.log(campaign);
        this.campaign = campaign;
        this.employees = campaign.employees;
      })
    })
  }

  download() {
    this.campaignService.downloadReport(this.campaign._id);
  }

}
