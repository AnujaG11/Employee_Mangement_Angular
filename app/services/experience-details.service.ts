import { Injectable } from '@angular/core';
import { ExperienceDetail } from 'src/types/ExperienceDetail';

@Injectable({
  providedIn: 'root'
})
export class ExperienceDetailsService {
  private storageKey = 'experienceData';
  private experienceDetails: ExperienceDetail[] = [];
  private editingDetail: ExperienceDetail | null = null;

  constructor() {
    this.loadExperienceDetailsFromStorage();
  }

  private loadExperienceDetailsFromStorage() {
    this.experienceDetails = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    console.log('Loaded experience details from storage:', this.experienceDetails);
  }

  getExperienceDetails(): ExperienceDetail[] {
    console.log('Fetching experience details:', this.experienceDetails);
    return this.experienceDetails;
  }

  getExperienceDetailById(empId: string): ExperienceDetail | undefined {
    console.log('Fetching experience detail for empId:', empId);
    return this.experienceDetails.find(detail => detail.empId === empId);
  }

  saveExperienceDetail(experienceDetail: ExperienceDetail) {
    const index = this.experienceDetails.findIndex(detail => detail.empId === experienceDetail.empId);
    if (index !== -1) {
      console.log('Updating experience detail for empId:', experienceDetail.empId);
      this.experienceDetails[index] = { ...experienceDetail };
    } else {
      console.log('Adding new experience detail:', experienceDetail);
      this.experienceDetails.push({ ...experienceDetail });
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.experienceDetails));
    console.log('Experience details saved to storage:', this.experienceDetails);
    this.editingDetail = null;
  }

  deleteExperienceDetail(empId: string) {
    console.log('Deleting experience detail for empId:', empId);
    this.experienceDetails = this.experienceDetails.filter(detail => detail.empId !== empId);
    localStorage.setItem(this.storageKey, JSON.stringify(this.experienceDetails));
    console.log('Experience details after deletion:', this.experienceDetails);
    this.editingDetail = null;
  }

  setEditingDetail(detail: ExperienceDetail | null): void {
    console.log('Setting editing detail:', detail);
    this.editingDetail = detail;
  }

  getEditingDetail(): ExperienceDetail | null {
    console.log('Fetching editing detail:', this.editingDetail);
    return this.editingDetail;
  }

  getEmpIds(): string[] {
    const empIds = this.experienceDetails.map(detail => detail.empId);
    console.log('Employee IDs in experience details:', empIds);
    return [...new Set(empIds)];
  }
}
