import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CampaignsComponent } from 'app/campaigns/campaigns.component';
import { EmployeesComponent } from '@app/employees/employees.component';
import { ReportsComponent } from '@app/reports/reports.component';
import { TrainingComponent } from '@app/training/training.component';
import { CreateCampaignComponent } from '@app/create-campaign/create-campaign.component';
import { SetupComponent } from '@app/setup/setup.component';
import { WhitelistFormComponent } from '@app/setup/whitelist-form/whitelist-form.component';
import { WhitelistTestComponent } from '@app/setup/whitelist-test/whitelist-test.component';
import { WhitelistWizardComponent } from '@app/user-profile/whitelist-wizard/whitelist-wizard.component';

export const AdminLayoutRoutes: Routes = [
    { path: '',                             redirectTo: 'dashboard' },
    { path: 'dashboard',                    component: DashboardComponent },
    { path: 'campaigns',                    component: CampaignsComponent },
    { path: 'campaigns/create',             component: CreateCampaignComponent },
    { path: 'employees',                    component: EmployeesComponent },
    { path: 'reports',                      component: ReportsComponent },
    { path: 'training',                     component: TrainingComponent },
    { path: 'user-profile',                 component: UserProfileComponent },
    { path: 'table-list',                   component: TableListComponent },
    { path: 'typography',                   component: TypographyComponent },
    { path: 'icons',                        component: IconsComponent },
    { path: 'notifications',                component: NotificationsComponent },
    { path: 'upgrade',                      component: UpgradeComponent },
    { path: 'setup',                        component: SetupComponent },
    { path: 'setup/whitelist',              component: WhitelistFormComponent },
    { path: 'setup/test',                   component: WhitelistTestComponent },
    { path: 'user-profile/whitelist',       component: WhitelistWizardComponent },
];
