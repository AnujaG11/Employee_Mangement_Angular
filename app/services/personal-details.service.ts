import { Injectable } from '@angular/core';
import { PersonalDetail } from 'src/types/PersonalDetail';
import { FamilyDetailsService } from './family-details.service';
import { EducationDetailsService } from './education-details.service';
import { ExperienceDetailsService } from './experience-details.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {
  private personalDetails: PersonalDetail[] = [];
  private editingDetail: PersonalDetail | null = null;

  constructor(
    private familyDetailsService: FamilyDetailsService,
    private educationDetailsService: EducationDetailsService,
    private experienceDetailsService: ExperienceDetailsService 
  ) {
    this.loadPersonalDetails();
  }

  private loadPersonalDetails() {
    const storedDetails = localStorage.getItem('personalData');
    if (storedDetails) {
      this.personalDetails = JSON.parse(storedDetails);
      console.log('Loaded personal details from storage:', this.personalDetails);
    } else {
      console.log('No personal details found in storage.');
    }
  }

  getPersonalDetails(): PersonalDetail[] {
    console.log('Fetching personal details:', this.personalDetails);
    return this.personalDetails;
  }

  savePersonalDetails(personal: PersonalDetail): void {
    const index = this.personalDetails.findIndex(detail => detail.empId === personal.empId);
    if (index !== -1) {
      console.log('Updating personal detail for empId:', personal.empId);
      this.personalDetails[index] = { ...personal };
    } else {
      personal.empId = new Date().getTime().toString();
      console.log('Adding new personal detail:', personal);
      this.personalDetails.push(personal);
    }
    this.updateLocalStorage();
  }

  deletePersonalDetail(empId: string): void {
    alert("Are you sure you want to delete the details?")
    console.log('Deleting personal detail for empId:', empId);
    this.personalDetails = this.personalDetails.filter(detail => detail.empId !== empId); 
    this.updateLocalStorage();
    this.familyDetailsService.deleteFamilyDetail(empId);
    this.educationDetailsService.deleteEducationDetail(empId);
    this.experienceDetailsService.deleteExperienceDetail(empId);
  }

  setEditingDetail(detail: PersonalDetail | null): void {
    console.log('Setting editing detail:', detail);
    this.editingDetail = detail;
  }

  getEditingDetail(): PersonalDetail | null {
    console.log('Fetching editing detail:', this.editingDetail);
    return this.editingDetail; 
  }

  getPersonalDetailById(empId: string): PersonalDetail | undefined {
    console.log('Fetching personal detail for empId:', empId);
    return this.personalDetails.find(detail => detail.empId === empId);
  }

  getEmpIds(): string[] {
    const empIds = this.personalDetails.map(detail => detail.empId);
    console.log('Employee IDs:', empIds);
    return empIds;
  }

  getAllEmployeeNames(): string[] {
    const names = this.personalDetails.map(detail => detail.name);
    console.log('All employee names:', names);
    return names;
  }

  getAllEmployeeDesignations(): string[] {
    const designations = this.personalDetails.map(detail => detail.designation);
    console.log('All employee designations:', designations);
    return designations;
  }

  private updateLocalStorage(): void {
    localStorage.setItem('personalData', JSON.stringify(this.personalDetails));
    console.log('Personal details saved to storage:', this.personalDetails);
  }
}
