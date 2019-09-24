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
import { ReportsComponent } from '../../reports/reports.component';
import { TrainingComponent } from '../../training/training.component';
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
    MatStepperModule
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
  ]
})

export class AdminLayoutModule {}
