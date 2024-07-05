import { Injectable } from '@angular/core';
import { FamilyDetail } from 'src/types/FamilyDetail';

@Injectable({
  providedIn: 'root'
})
export class FamilyDetailsService {
  private storageKey = 'familyData';
  private familyDetails: FamilyDetail[] = [];
  private editingDetail: FamilyDetail | null = null;

  constructor() {
    this.loadFamilyDetailsFromStorage();
  }

  private loadFamilyDetailsFromStorage() {
    this.familyDetails = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    console.log('Loaded family details from storage:', this.familyDetails);
  }

  getFamilyDetails(): FamilyDetail[] {
    console.log('Fetching family details:', this.familyDetails);
    return this.familyDetails;
  }

  getFamilyDetailById(empId: string): FamilyDetail | undefined {
    console.log('Fetching family detail for empId:', empId);
    return this.familyDetails.find(detail => detail.empId === empId);
  }

  saveFamilyDetail(familyDetail: FamilyDetail) {
    const index = this.familyDetails.findIndex(detail => detail.empId === familyDetail.empId);
    if (index !== -1) {
      console.log('Updating family detail for empId:', familyDetail.empId);
      this.familyDetails[index] = { ...familyDetail }; 
    } else {
      console.log('Adding new family detail:', familyDetail);

      this.familyDetails.push({ ...familyDetail });
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.familyDetails));
    console.log('Family details saved to storage:', this.familyDetails);
    this.editingDetail = null;
  }

  deleteFamilyDetail(empId: string) {
    console.log('Deleting family detail for empId:', empId);
    this.familyDetails = this.familyDetails.filter(detail => detail.empId !== empId);
    localStorage.setItem(this.storageKey, JSON.stringify(this.familyDetails));
    console.log('Family details after deletion:', this.familyDetails);
    this.editingDetail = null;
  }

  setEditingDetail(detail: FamilyDetail | null): void {
    console.log('Setting editing detail:', detail);
    this.editingDetail = detail;
  }

  getEditingDetail(): FamilyDetail | null {
    console.log('Fetching editing detail:', this.editingDetail);
    return this.editingDetail;
  }

  getEmpIds(): string[] {
    const empIds = this.familyDetails.map(detail => detail.empId);
    console.log('Employee IDs in family details:', empIds);
    return [...new Set(empIds)];
  }
}
