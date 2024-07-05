export interface FamilyDetail {
  empId: string;
  fatherName: string;
  motherName: string;
  spouseName?: string;
  fatherDob: Date;
  motherDob: Date;
  spouseDob?: Date;
}
