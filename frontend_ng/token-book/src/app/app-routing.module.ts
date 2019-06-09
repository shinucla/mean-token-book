import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { ParentGuard } from './services/parent.guard';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterFamilyMemberComponent } from './components/register-family-member/register-family-member.component';
import { FamilyComponent } from './components/family/family.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerFamilyMember', component: RegisterFamilyMemberComponent, canActivate: [AuthGuard, ParentGuard] },
  { path: 'family', component: FamilyComponent, canActivate: [AuthGuard, ParentGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard, ParentGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard, ParentGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
