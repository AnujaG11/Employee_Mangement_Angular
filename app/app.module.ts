import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { DataComponent } from './data/data.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PersonalComponent } from './personal/personal.component';
import { ListComponent } from './list/list.component';
import { FamilyComponent } from './family/family.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { FormSubmitStatusDirective } from './directives/form-submit-status.directive';
import { SalutationPipe } from './pipes/salutation.pipe'; 

@NgModule({
  declarations: [	
    AppComponent,
    FirstComponent,
    DataComponent,
    NavbarComponent,
    HomeComponent,
    PersonalComponent,
    ListComponent,
    FamilyComponent,
    EducationComponent,
    ExperienceComponent,
    FormSubmitStatusDirective,
    SalutationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule
  ],
  providers: [AuthGuard], 
  bootstrap: [AppComponent]
})
export class AppModule { }
