import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'navbarAdmin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private notifications: HotToastService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().pipe(
      this.notifications.observe({
        success: 'Sesión Finalizada Exitosamente',
        loading: 'Cerrando Sesión',
        error: 'Ha occurido un error'
      })
    ).subscribe(() => {
      this.router.navigate(['/landing'])
    });
  }
}
