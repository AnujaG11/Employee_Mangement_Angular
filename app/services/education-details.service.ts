import { Injectable } from '@angular/core';
import { EducationDetail } from 'src/types/EducationDetail';

@Injectable({
  providedIn: 'root'
})
export class EducationDetailsService {
  private storageKey = 'educationData';
  private educationDetails: EducationDetail[] = [];
  private editingDetail: EducationDetail | null = null;

  constructor() {
    this.loadEducationDetailsFromStorage();
  }

  private loadEducationDetailsFromStorage() {
    this.educationDetails = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    console.log('Loaded education details from storage:', this.educationDetails);
  }

  getEducationDetails(): EducationDetail[] {
    console.log('Fetching education details:', this.educationDetails);
    return this.educationDetails;
  }

  getEducationDetailById(empId: string): EducationDetail | undefined {
    console.log('Fetching education detail for empId:', empId);
    return this.educationDetails.find(detail => detail.empId === empId);
  }

  saveEducationDetail(educationDetail: EducationDetail) {
    const index = this.educationDetails.findIndex(detail => detail.empId === educationDetail.empId);
    if (index !== -1) {
      console.log('Updating education detail for empId:', educationDetail.empId);
      this.educationDetails[index] = { ...educationDetail };
    } else {
      console.log('Adding new education detail:', educationDetail);
      this.educationDetails.push({ ...educationDetail });
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.educationDetails));
    console.log('Education details saved to storage:', this.educationDetails);
    this.editingDetail = null;
  }

  deleteEducationDetail(empId: string) {
    console.log('Deleting education detail for empId:', empId);
    this.educationDetails = this.educationDetails.filter(detail => detail.empId !== empId);
    localStorage.setItem(this.storageKey, JSON.stringify(this.educationDetails));
    console.log('Education details after deletion:', this.educationDetails);
    this.editingDetail = null;
  }

  setEditingDetail(detail: EducationDetail | null): void {
    console.log('Setting editing detail:', detail);
    this.editingDetail = detail;
  }

  getEditingDetail(): EducationDetail | null {
    console.log('Fetching editing detail:', this.editingDetail);
    return this.editingDetail;
  }

  getEmpIds(): string[] {
    const empIds = this.educationDetails.map(detail => detail.empId);
    console.log('Employee IDs in education details:', empIds);
    return [...new Set(empIds)];
  }
}
