import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {

  RecoveryForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
  })

  constructor(private authService: AuthService, private notifications: HotToastService) { }

  ngOnInit(): void {
  }
 
  reset(){
    const email = this.RecoveryForm.controls['email'].value
    this.authService.resetPassword(email);
    this.notifications.success('Si el correo es correcto, se envío un link de recuperación');
  }
}
