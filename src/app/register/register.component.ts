import { Component, OnInit } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  Select2Data = [
    {
      value: 'CC',
      label: 'CC'
    },
    {
      value: 'Pasaporte',
      label: 'Pasaporte'
    },
    {
      value: 'Cedula de extranjería',
      label: 'Cedula de extranjería',
    }  
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
