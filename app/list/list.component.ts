import { Component, OnInit } from '@angular/core';
import { PersonalDetailsService } from '../services/personal-details.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  employeeNames: string[] = [];
  employeeDesignations: string[] = [];

  constructor(private personalDetailsService: PersonalDetailsService) {}

  ngOnInit(): void {
    this.employeeNames = this.personalDetailsService.getAllEmployeeNames();
    this.employeeDesignations = this.personalDetailsService.getAllEmployeeDesignations();
  }
}
