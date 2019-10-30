import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

// Components
import { CampaignsComponent } from 'app/campaigns/campaigns.component';
import { CreateCampaignComponent } from 'app/create-campaign/create-campaign.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { EmployeesComponent } from '../../employees/employees.component';
import { SetupComponent } from '@app/setup/setup.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatListModule,
  MatSliderModule,
  MatStepperModule,
  MatDatepickerModule,
  MatSlideToggleModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { Ng5SliderModule } from 'ng5-slider';
import { ReportsComponent } from '../../reports/reports.component';
import { TrainingComponent } from '../../training/training.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WhitelistFormComponent } from '../../setup/whitelist-form/whitelist-form.component';
import { WhitelistTestComponent } from '../../setup/whitelist-test/whitelist-test.component';
import { AccountDetailsComponent } from '../../user-profile/account-details/account-details.component';
import { WhitelistWizardComponent } from '../../user-profile/whitelist-wizard/whitelist-wizard.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatListModule,
    MatSliderModule,
    MatStepperModule,
    Ng5SliderModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSlideToggleModule
  ],
  declarations: [
    CampaignsComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    EmployeesComponent,
    ReportsComponent,
    TrainingComponent,
    CreateCampaignComponent,
    SetupComponent,
    WhitelistFormComponent,
    WhitelistTestComponent,
    AccountDetailsComponent,
    WhitelistWizardComponent
  ],
  providers: [
  ]
})

export class AdminLayoutModule { }
