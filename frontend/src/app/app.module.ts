import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './components/footer/footer.component';

//Material
import { MatSliderModule } from '@angular/material/slider';

// Services
import { AuthService } from '../app/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataSharingService } from './services/data-sharing.service';
import { BackofficeComponent } from './pages/Backoffice/backoffice/backoffice.component';

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
    BackofficeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [
    AuthService,
    DataSharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
