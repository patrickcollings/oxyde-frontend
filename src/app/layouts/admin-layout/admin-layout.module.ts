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
  MatStepperModule
} from '@angular/material';
import { Ng5SliderModule } from 'ng5-slider';
import { ReportsComponent } from '../../reports/reports.component';
import { TrainingComponent } from '../../training/training.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
    MatButtonToggleModule
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
    SetupComponent
  ]
})

export class AdminLayoutModule { }
