import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSidenavModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HomeChildComponent } from './components/home-child/home-child.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ChildrenComponent } from './components/settings/children/children.component';
import { CategoryComponent } from './components/settings/category/category.component';
import { ProfileComponent } from './components/settings/profile/profile.component';
import { RegisterChildComponent } from './components/register-child/register-child.component';

import { DialogComponent } from './services/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HomeChildComponent,
    LoginComponent,
    SettingsComponent,
    RegisterComponent,
    ChildrenComponent,
    CategoryComponent,
    ProfileComponent,
    RegisterChildComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,

    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
