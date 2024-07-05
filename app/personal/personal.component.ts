import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalDetail } from 'src/types/PersonalDetail';
import { PersonalDetailsService } from '../services/personal-details.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, OnDestroy {
  personalDetails: PersonalDetail[] = [];
  personal: PersonalDetail = {
    empId: '',
    name: '',
    dob: '',
    address: '',
    designation: '',
    gender: ''
  };
  
  editPersonal: PersonalDetail = { ...this.personal };
  private subscription: Subscription = new Subscription();
  loggedInUserId: string | null = null;

  constructor(
    private personalDetailsService: PersonalDetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loggedInUserId = sessionStorage.getItem('loggedInUserId');
    this.loadDetails();
    this.personalDetails = this.personalDetailsService.getPersonalDetails();
    this.subscription.add(
      this.route.params.subscribe(params => {
        if (params['empId']) {
          this.loadPersonalData(params['empId']);
        } else {
          this.resetForm();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personalDetailsService.savePersonalDetails(this.editPersonal);
      this.personal = { ...this.editPersonal };
      this.router.navigate(['/home/personal']);
      alert("New data added");
    } else {
      alert('Please fill out all required fields.');
    }
    
  }

  resetForm() {
    this.editPersonal = { ...this.personal };
    this.router.navigate(['/home/personal']);
  }

  loadDetails(): void {
    this.personalDetails = this.personalDetailsService.getPersonalDetails();
  }

  private loadPersonalData(id: string) {
    const detail = this.personalDetailsService.getPersonalDetailById(id);
    if (detail) {
      //this.personal = detail;
      this.editPersonal = { ...detail };
    } else {
      this.resetForm();
    }
  }

  deletePersonalDetail() {
    if (confirm('Are you sure you want to delete this record?')) {
      this.personalDetailsService.deletePersonalDetail(this.personal.empId);
      this.router.navigate(['/home/personal']);
    }
  }
}
 