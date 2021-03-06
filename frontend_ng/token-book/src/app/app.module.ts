import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// angular material
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { RegisterFamilyMemberComponent } from './components/register-family-member/register-family-member.component';

import { FormFieldComponent } from './services/dialog.service';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { FamilyComponent } from './components/family/family.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecordFormComponent } from './components/record-form/record-form.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterFamilyMemberComponent,
    FormFieldComponent,
    SidebarMenuComponent,
    FamilyComponent,
    CategoriesComponent,
    DashboardComponent,
    FooterComponent,
    RecordFormComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatNativeDateModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,

    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ FormFieldComponent ]
})
export class AppModule { }
