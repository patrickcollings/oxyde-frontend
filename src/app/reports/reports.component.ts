import { Component, OnInit } from '@angular/core';
import { CampaignService } from '@app/_services/campaign.service';
import { first } from 'rxjs/operators';
import { Campaign } from '@app/_models';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  campaigns: Campaign[];

  constructor(
    private campaignService: CampaignService
  ) { 
  }

  ngOnInit() {
    this.campaignService.getPastCampaigns().pipe(first()).subscribe(campaigns => {
      this.campaigns = campaigns;
    })
  }

  download(campaignId) {
    this.campaignService.downloadReport(campaignId);
  }



}
