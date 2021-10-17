import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { SurveysService } from './services/surveys.service';
import { AuthService } from './services/auth.service';
import { SurveysComponent } from './surveys/surveys.component';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    AdminComponent,
    SurveysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
  ],
  providers: [
    SurveysService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
