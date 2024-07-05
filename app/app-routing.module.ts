import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { PersonalComponent } from './personal/personal.component';
import { FamilyComponent } from './family/family.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './auth.guard'; 

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'experience', component: ExperienceComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, 
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
      { path: 'personal', component: PersonalComponent, canActivate: [AuthGuard] },
      { path: 'personal/:empId', component: PersonalComponent, canActivate: [AuthGuard] },
      { path: 'family', component: FamilyComponent, canActivate: [AuthGuard] },
      { path: 'family/:empId', component: FamilyComponent },
      { path: 'education', component: EducationComponent, canActivate: [AuthGuard] },
      { path: 'education/:empId', component: EducationComponent, canActivate: [AuthGuard] },
      { path: 'experience', component: ExperienceComponent, canActivate: [AuthGuard] },
      { path: 'experience/:empId', component: ExperienceComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
