import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDetailsService } from 'src/app/services/personal-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = {
    email: '',
    password: ''
  };
  private readonly HARD_CODED_EMAIL = 'admin@gmail.com';
  private readonly HARD_CODED_PASSWORD = 'p';

  constructor(
    private router: Router,
    private personalDetailsService: PersonalDetailsService 
  ) { }

  ngOnInit(): void {}

  submit() {
    if (this.form.email === this.HARD_CODED_EMAIL && this.form.password === this.HARD_CODED_PASSWORD) {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      this.router.navigate(['home']);
      return;
    }
    const personalDetails = this.personalDetailsService.getPersonalDetails();
    const user = personalDetails.find(detail =>
      detail.name === this.form.email &&
      detail.dob === this.form.password
    );

    if (user) {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      sessionStorage.setItem('loggedInUserId', user.empId);
      this.router.navigate(['home']);
    } else {
      alert('Wrong credentials. Please try again.');
    }
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
