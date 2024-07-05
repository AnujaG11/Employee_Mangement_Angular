import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
   name = 'Employee name = Anuja';
   age = 'Employee Age = 26';

   isDisabled: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  handleClick(){}

}
