import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth/auth.service';
import { DbCrudService } from '../services/crud/db-crud.service';
import { Auth } from '@angular/fire/auth';
import { browserLocalPersistence } from 'firebase/auth';

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
    document: new FormControl(''),
    correctDocument: new FormControl(''),
  })

  emailForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
  })

  public popup: boolean = false;
  public data: any = ['EMPTY'];

  constructor(public authService: AuthService, private notifications: HotToastService, private router: Router, private auth: Auth,
    private crud: DbCrudService) { }

  ngOnInit(): void {
    this.crud.getData$().subscribe( serviceData => {
      this.data = serviceData;
      for(let item of this.data){
        this.authService.documentRecover = item.numDocu
        this.authService.documentRecoverCensored = this.censorWord(this.authService.documentRecover)
      }
    })
  }

  
  login(){
    const { email, password } = this.LoginForm.value;
    this.auth.setPersistence(browserLocalPersistence).then(() => {
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
      })
    });
  }

  censorWord(str: string){
    return str[0] + "*".repeat(str.length - 1) + str.slice(-3);
  }

  openPopup(){
    this.authService.emailRecover = this.emailForm.controls['email'].value
    this.crud.getData('email', this.emailForm.controls['email'].value, '/users')
    setTimeout(() => {
      if(this.authService.documentRecover == "1"){
      this.notifications.error('El correo digitado no es correcto');
      setTimeout(() => {location.reload()}, 1500)
    }
  }, 2000)
  }

  reset(){
    const email = this.authService.emailRecover;
    this.authService.resetPassword(email);
    this.notifications.success('Se envío un link de recuperación');
  }

  correctEmail(){
    if(this.RecoveryForm.controls['document'].value == this.authService.documentRecover){
      return true;
    } else {
      return false;
    }
  }
}
