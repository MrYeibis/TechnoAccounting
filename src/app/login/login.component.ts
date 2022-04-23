import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth/auth.service';
import { DbCrudService } from '../services/crud/db-crud.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
  })

  RecoveryForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
  })

  public popup: boolean = false;

  constructor(private authService: AuthService, private notifications: HotToastService, private router: Router,
    private crud: DbCrudService) { }

  ngOnInit(): void {
  }

  
  login(){
    const { email, password } = this.LoginForm.value;
    this.authService.login(email, password).pipe(
      this.notifications.observe({
        success: 'Inicio de sesión exitoso',
        loading: 'Iniciando sesión',
        error: 'Ha occurido un error'
      })
    ).subscribe(() => {
      if(email == "yeibisrojas@hotmail.com"){
        this.router.navigate(['/admin/inicio']);
      }else if(email == "fersungfloo@gmail.com"){
        this.router.navigate(['/admin/inicio']);
      }else if(email == "angiesofiaespinosa@gmail.com"){
        this.router.navigate(['/admin/inicio']);
      }else{
        this.router.navigate(['/dashboard/inicio']);
      }
      this.crud.getData('email', email, '/users' )
    })
  }

  reset(){
    const email = this.RecoveryForm.controls['email'].value
    this.authService.resetPassword(email);
    this.notifications.success('Si el correo es correcto, se envío un link de recuperación');
  }

}
