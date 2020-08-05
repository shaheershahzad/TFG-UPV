import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DonateComponent } from './pages/donate/donate.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BackofficeComponent } from './pages/Backoffice/backoffice/backoffice.component';
import { UserManagementComponent } from './pages/Backoffice/user-management/user-management.component';
import { ProjectManagementComponent } from './pages/Backoffice/project-management/project-management.component';
import { NewsletterManagementComponent } from './pages/Backoffice/newsletter-management/newsletter-management.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { NewsManagementComponent } from './pages/Backoffice/news-management/news-management.component';
import { EventManagementComponent } from './pages/Backoffice/event-management/event-management.component';
import { FileManagementComponent } from './pages/Backoffice/file-management/file-management.component';
import { WebdataManagementComponent } from './pages/Backoffice/webdata-management/webdata-management.component';
import { DonationManagementComponent } from './pages/Backoffice/donation-management/donation-management.component';

// Services
import { AuthService } from '../app/services/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'my-profile', component: ProfileComponent, canActivate : [AuthService] },
  { path: 'project/details/:id', component: ProjectDetailsComponent },
  { path: 'backoffice', component: BackofficeComponent, canActivate : [AuthService] },
  { path: 'backoffice/users', component: UserManagementComponent, canActivate : [AuthService] },
  { path: 'backoffice/projects', component: ProjectManagementComponent, canActivate : [AuthService] },
  { path: 'backoffice/newsletter', component: NewsletterManagementComponent, canActivate : [AuthService] },
  { path: 'backoffice/news', component: NewsManagementComponent, canActivate : [AuthService] },
  { path: 'backoffice/events', component: EventManagementComponent, canActivate : [AuthService] },
  { path: 'backoffice/files', component: FileManagementComponent, canActivate : [AuthService] },
  { path: 'backoffice/webdata', component: WebdataManagementComponent, canActivate : [AuthService] },
  { path: 'backoffice/donations', component: DonationManagementComponent, canActivate : [AuthService] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
