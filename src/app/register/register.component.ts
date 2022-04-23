import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { AuthService } from '../services/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { DbCrudService } from '../services/crud/db-crud.service';
import { Router } from '@angular/router';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  }
}

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public information:string = "";
  public ruta:string = "";

  RegisterForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    surname: new FormControl('', Validators.compose([Validators.required])),
    tipDocu: new FormControl('', Validators.compose([Validators.required])),
    numDocu: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    codeE: new FormControl('', Validators.compose([Validators.required]))
  }, { validators: passwordsMatchValidator() })

  toDbForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    tipDocu: new FormControl(''),
    numDocu: new FormControl(''),
    email: new FormControl(''),
    codeE: new FormControl(''),
    rango: new FormControl('Por Asignar')
  })

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

  constructor(private authService: AuthService, private crud: DbCrudService, 
    private notifications: HotToastService, private router: Router) {}

  ngOnInit(): void {
  }

  public register(){
      this.authService.register(this.RegisterForm.controls['email'].value, this.RegisterForm.controls['password'].value).pipe(
        this.notifications.observe({
          loading: 'Registrando Usuario',
          error: 'Ha occurido un error'
        })
      ).subscribe(() => {
        this.toDbForm.controls['name'].setValue(this.RegisterForm.controls['name'].value);
        this.toDbForm.controls['surname'].setValue(this.RegisterForm.controls['surname'].value);
        this.toDbForm.controls['tipDocu'].setValue(this.RegisterForm.controls['tipDocu'].value);
        this.toDbForm.controls['numDocu'].setValue(this.RegisterForm.controls['numDocu'].value);
        this.toDbForm.controls['email'].setValue(this.RegisterForm.controls['email'].value);
        this.toDbForm.controls['codeE'].setValue(this.RegisterForm.controls['codeE'].value);
        this.crud.addData(this.toDbForm.value, "/users")
        this.router.navigate(['/login']);
      });
    }
}
