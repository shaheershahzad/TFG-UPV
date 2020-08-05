import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackofficeComponent } from './pages/Backoffice/backoffice/backoffice.component';
import { UserManagementComponent } from './pages/Backoffice/user-management/user-management.component';
import { ProjectManagementComponent } from './pages/Backoffice/project-management/project-management.component';
import { DonateComponent } from './pages/donate/donate.component';
import { NewsletterManagementComponent } from './pages/Backoffice/newsletter-management/newsletter-management.component';
import { FileManagementComponent } from './pages/Backoffice/file-management/file-management.component';
import { WebdataManagementComponent } from './pages/Backoffice/webdata-management/webdata-management.component';
import { DonationManagementComponent } from './pages/Backoffice/donation-management/donation-management.component';
import { EventManagementComponent } from './pages/Backoffice/event-management/event-management.component';
import { NewsManagementComponent } from './pages/Backoffice/news-management/news-management.component';

//Material
/*import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';*/

//Materialize

// Services
import { AuthService } from '../app/services/auth.service';
import { DataSharingService } from './services/data-sharing.service';
import { UploadService } from './services/upload.service';
import { FileDeleteConfirmationComponent } from './components/Modals/file-delete-confirmation/file-delete-confirmation.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { MapComponent } from './components/map/map.component';
import { ProfileComponent } from './pages/profile/profile.component';

/*const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatBadgeModule
]*/

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    BackofficeComponent,
    UserManagementComponent,
    ProjectManagementComponent,
    DonateComponent,
    NewsletterManagementComponent,
    FileDeleteConfirmationComponent,
    ProjectDetailsComponent,
    MapComponent,
    FileManagementComponent,
    WebdataManagementComponent,
    DonationManagementComponent,
    EventManagementComponent,
    NewsManagementComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    DataSharingService,
    Title,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
