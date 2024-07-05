import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonalDetailsService } from '../services/personal-details.service';
import { FamilyDetailsService } from '../services/family-details.service';
import { EducationDetailsService } from '../services/education-details.service';
import { ExperienceDetailsService } from '../services/experience-details.service';
import { PersonalDetail } from 'src/types/PersonalDetail';
import { FamilyDetail } from 'src/types/FamilyDetail';
import { EducationDetail } from 'src/types/EducationDetail';
import { ExperienceDetail } from 'src/types/ExperienceDetail';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  personalDetails: PersonalDetail[] = [];
  familyDetails: FamilyDetail[] = [];
  educationDetails: EducationDetail[] = [];
  experienceDetails: ExperienceDetail[] = [];
  loggedInUserId: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private personalDetailsService: PersonalDetailsService,
    private familyDetailsService: FamilyDetailsService,
    private educationDetailsService: EducationDetailsService,
    private experienceDetailsService: ExperienceDetailsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('HomeComponent initialized');
    this.loggedInUserId = sessionStorage.getItem('loggedInUserId');
    console.log('Logged in user ID:', this.loggedInUserId);
    this.loadAllDetails();
  }

  loadAllDetails() {
    console.log('Loading all details...');
    this.loadPersonalDetails();
    this.loadFamilyDetails();
    this.loadEducationDetails();
    this.loadExperienceDetails();
  }

  loadPersonalDetails() {
    console.log('Loading personal details...');
    this.personalDetails = this.personalDetailsService.getPersonalDetails();
  }

  loadFamilyDetails() {
    console.log('Loading family details...');
    this.familyDetails = this.familyDetailsService.getFamilyDetails();
  }

  loadEducationDetails() {
    console.log('Loading education details...');
    this.educationDetails = this.educationDetailsService.getEducationDetails();
  }

  loadExperienceDetails() {
    console.log('Loading experience details...');
    this.experienceDetails = this.experienceDetailsService.getExperienceDetails();
  }

  editPersonalDetail(detail: PersonalDetail) {
    console.log('Editing personal detail:', detail);
    this.personalDetailsService.setEditingDetail(detail);
    this.router.navigate(['home','personal', detail.empId]);
  }

  deletePersonalDetail(id: string) {
    console.log('Deleting personal detail with ID:', id);
    this.personalDetailsService.deletePersonalDetail(id);
    this.familyDetailsService.deleteFamilyDetail(id);
    this.educationDetailsService.deleteEducationDetail(id);
    this.experienceDetailsService.deleteExperienceDetail(id);
    
    console.log('Reloading details after deletion...');
    this.loadAllDetails();
  }

  editFamilyDetail(detail: FamilyDetail) {
    console.log('Editing family detail:', detail);
    this.familyDetailsService.setEditingDetail(detail);
    this.router.navigate(['/home/family', detail.empId]);
  }

  deleteFamilyDetail(id: string) {
    console.log('Deleting family detail with ID:', id);
    this.familyDetailsService.deleteFamilyDetail(id);
    this.loadFamilyDetails();
  }
 
  editEducationDetail(detail: EducationDetail) {
    console.log('Editing education detail:', detail);
    this.educationDetailsService.setEditingDetail(detail);
    this.router.navigate(['/home/education', detail.empId]);
  }

  deleteEducationDetail(id: string) {
    console.log('Deleting education detail with ID:', id);
    this.educationDetailsService.deleteEducationDetail(id);
    this.loadEducationDetails();
  }

  editExperienceDetail(detail: ExperienceDetail) {
    console.log('Editing experience detail:', detail);
    this.experienceDetailsService.setEditingDetail(detail);
    this.router.navigate(['/home/experience', detail.empId]);
  }

  deleteExperienceDetail(id: string) {
    console.log('Deleting experience detail with ID:', id);
    this.experienceDetailsService.deleteExperienceDetail(id);
    this.loadExperienceDetails();
  }

  ngOnDestroy() {
    console.log('HomeComponent destroyed');
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
