import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationDetail } from 'src/types/EducationDetail';
import { EducationDetailsService } from '../services/education-details.service'; // Corrected the import path
import { NgForm } from '@angular/forms';
import { PersonalDetailsService } from '../services/personal-details.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, OnDestroy {
  educationDetail: EducationDetail = {
    empId: '',
    highestDegree: '',
    highestStream: '',
    highestMarks: '',
    highestUniversity: '',
    secondDegree: '',
    secondStream: '',
    secondMarks: '',
    secondUniversity: ''
  };
  editEducationDetail: EducationDetail = { ...this.educationDetail };
  empIds: string[] = [];
  private sub: any;

  constructor(
    private educationDetailsService: EducationDetailsService,
    private personalDetailsService: PersonalDetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('EducationComponent initialized');
    
    this.empIds = this.personalDetailsService.getEmpIds();
    console.log('Employee IDs:', this.empIds);

    this.sub = this.route.params.subscribe(params => {
      const empId = params['empId'];
      console.log('Route params:', params);
      if (empId) {
        console.log('Loading education data for empId:', empId);
        this.loadEducationData(empId);
      } else {
        console.log('No empId found. Resetting form.');
        this.resetForm();
      }
    });
  }

  ngOnDestroy(): void {
    console.log('EducationComponent destroyed');
    this.sub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form is valid. Submitting education detail:', this.editEducationDetail);
      alert("New data added");
      this.educationDetailsService.saveEducationDetail(this.editEducationDetail);
      console.log('Education detail saved successfully.');
            this.resetForm();
      this.router.navigate(['/home/education']); 
    } else {
      console.log('Form is invalid. Displaying error message.');
      alert('Please fill out all required fields.');
    }
  }

  resetForm() {
    console.log('Resetting form to initial state.');
    this.educationDetail = {
      empId: '',
      highestDegree: '',
      highestStream: '',
      highestMarks: '',
      highestUniversity: '',
      secondDegree: '',
      secondStream: '',
      secondMarks: '',
      secondUniversity: ''
    };
    this.editEducationDetail = { ...this.educationDetail };
  }

  private loadEducationData(empId: string) {
    console.log('Loading education data for empId:', empId);
    const detail = this.educationDetailsService.getEducationDetailById(empId);
    if (detail) {
      console.log('Education detail found:', detail);
      this.educationDetail = detail;
      this.editEducationDetail = { ...detail };
    } else {
      console.log('No education detail found for empId:', empId);
      this.resetForm();
    }
  }
}
