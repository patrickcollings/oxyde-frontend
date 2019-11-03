import { Component, OnInit } from '@angular/core';
import { CampaignService } from '@app/_services/campaign.service';
import { first } from 'rxjs/operators';
import { Campaign } from '@app/_models';

@Component({
  selector: 'app-past-campaigns',
  templateUrl: './past-campaigns.component.html',
  styleUrls: ['./past-campaigns.component.scss']
})
export class PastCampaignsComponent implements OnInit {

  campaigns: Campaign[];

  constructor(
    private campaignService: CampaignService
  ) { 
    this.campaigns = [];
  }

  ngOnInit() {
    this.campaignService.getPastCampaigns().pipe(first()).subscribe(campaigns => {
      this.campaigns = campaigns;
    })
  }

}
