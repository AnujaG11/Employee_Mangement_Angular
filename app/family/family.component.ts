import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyDetail } from 'src/types/FamilyDetail';
import { FamilyDetailsService } from '../services/family-details.service';
import { NgForm } from '@angular/forms';
import { PersonalDetailsService } from '../services/personal-details.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit, OnDestroy {
  familyDetail: FamilyDetail = {
    empId: '',
    fatherName: '',
    fatherDob: new Date(),
    motherName: '',
    motherDob: new Date(),
    spouseName: '',
    spouseDob: new Date()
  };
  editFamilyDetail: FamilyDetail = { ...this.familyDetail };
  empIds: string[] = [];
  private sub: any;

  constructor(
    private familyDetailsService: FamilyDetailsService,
    private personalDetailsService: PersonalDetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('FamilyComponent initialized');

    this.empIds = this.personalDetailsService.getEmpIds();
    console.log('Employee IDs:', this.empIds);
    this.sub = this.route.params.subscribe(params => {
      const empId = params['empId'];
      console.log('Route params:', params);
      if (empId) {
        console.log('Loading family data for empId:', empId);
        this.loadFamilyData(empId);
      } else {
        console.log('No empId found. Resetting form.');
        this.resetForm();
      }
    });
  }

  ngOnDestroy(): void {
    console.log('FamilyComponent destroyed');
    this.sub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form is valid. Submitting family detail:', this.editFamilyDetail);
      alert("New data added");
      this.editFamilyDetail.fatherDob = new Date(this.editFamilyDetail.fatherDob);
      this.editFamilyDetail.motherDob = new Date(this.editFamilyDetail.motherDob);
      if (this.editFamilyDetail.spouseDob) {
        this.editFamilyDetail.spouseDob = new Date(this.editFamilyDetail.spouseDob);
      }

      this.familyDetailsService.saveFamilyDetail(this.editFamilyDetail);
      console.log('Family detail saved successfully.');
      
      this.resetForm();
      this.router.navigate(['/home/family']); 
    } else {
      console.log('Form is invalid. Displaying error message.');
      alert('Please fill out all required fields.');
    }
  }

  resetForm() {
    console.log('Resetting form to initial state.');
    this.familyDetail = {
      empId: '',
      fatherName: '',
      fatherDob: new Date(),
      motherName: '',
      motherDob: new Date(),
      spouseName: '',
      spouseDob: new Date()
    };
    this.editFamilyDetail = { ...this.familyDetail };
  }

  private loadFamilyData(empId: string) {
    console.log('Loading family data for empId:', empId);
    const detail = this.familyDetailsService.getFamilyDetailById(empId);
    if (detail) {
      console.log('Family detail found:', detail);
      this.familyDetail = detail;
      this.editFamilyDetail = { ...detail };
    } else {
      console.log('No family detail found for empId:', empId);
      this.resetForm();
    }
  }
}
