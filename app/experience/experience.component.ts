import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ExperienceDetail } from 'src/types/ExperienceDetail';
import { ExperienceDetailsService } from '../services/experience-details.service';
import { PersonalDetailsService } from '../services/personal-details.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  experienceDetail: ExperienceDetail = {
    empId: '',
    lastCompany: '',
    lastRole: '',
    lastTenure: 1,
    secondLastCompany: '',
    secondLastRole: '',
    secondLastTenure: 1,
    experienceDetails: ''
  };
  editExperienceDetail: ExperienceDetail = { ...this.experienceDetail };
  empIds: string[] = [];
  private sub: any;

  constructor(
    private experienceDetailsService: ExperienceDetailsService,
    private personalDetailsService: PersonalDetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.empIds = this.personalDetailsService.getEmpIds();

    this.sub = this.route.params.subscribe(params => {
      const empId = params['empId'];
      if (empId) {
        this.loadExperienceData(empId);
      } else {
        this.resetForm();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.experienceDetailsService.saveExperienceDetail(this.editExperienceDetail);
      alert("New data added");
      this.resetForm();
      this.router.navigate(['/home/experience']); 
    } else {
      alert('Please fill out all required fields.');
    }
  }

  resetForm() {
    this.experienceDetail = {
      empId: '',
      lastCompany: '',
      lastRole: '',
      lastTenure: 1,
      secondLastCompany: '',
      secondLastRole: '',
      secondLastTenure: 1,
      experienceDetails: ''
    };
    this.editExperienceDetail = { ...this.experienceDetail };
  }

  private loadExperienceData(empId: string) {
    const detail = this.experienceDetailsService.getExperienceDetailById(empId);
    if (detail) {
      this.experienceDetail = detail;
      this.editExperienceDetail = { ...detail };
    } else {
      this.resetForm();
    }
  }
}
