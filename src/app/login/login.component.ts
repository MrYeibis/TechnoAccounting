import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService, private notifications: HotToastService, private router: Router) { }

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
      this.router.navigate(['/landing']);
    })
  }

}
