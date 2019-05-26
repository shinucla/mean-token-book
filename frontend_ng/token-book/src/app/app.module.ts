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
import { HomeComponent, NgbdSortableHeader } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { RegisterFamilyMemberComponent } from './components/register-family-member/register-family-member.component';

import { DialogComponent } from './services/modal.service';
import { FormFieldComponent } from './services/dialog.service';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { FamilyComponent } from './components/family/family.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';

import { AddTokenEventComponent } from './components/home/add-token-event.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent, NgbdSortableHeader, AddTokenEventComponent,
    LoginComponent,
    RegisterComponent,
    RegisterFamilyMemberComponent,
    DialogComponent,
    FormFieldComponent,
    SidebarMenuComponent,
    FamilyComponent,
    CategoriesComponent,
    FooterComponent,
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
  bootstrap: [AppComponent],
  entryComponents: [ FormFieldComponent, DialogComponent, AddTokenEventComponent ]
})
export class AppModule { }
