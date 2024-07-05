import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form = {
    email: '',
    password: '',
    retypePassword: '',
    firstName: '',
    lastName: '',
    gender: '',
    country: '',
    terms: false,
    newsletter: false
  };
  constructor() { }

  ngOnInit(): void {
  }
  submit() {
    console.log('Form submitted', this.form);
  }

}
