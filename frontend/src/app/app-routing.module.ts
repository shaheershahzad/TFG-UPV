import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BackofficeComponent } from './pages/Backoffice/backoffice/backoffice.component';
import { UserManagementComponent } from './pages/Backoffice/user-management/user-management.component';
import { ProjectManagementComponent } from './pages/Backoffice/project-management/project-management.component';

// Services
import { AuthService } from '../app/services/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'backoffice', component: BackofficeComponent, canActivate : [AuthService] },
  { path: 'backoffice/users', component: UserManagementComponent, canActivate : [AuthService] },
  { path: 'backoffice/projects-management', component: ProjectManagementComponent, canActivate : [AuthService] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
