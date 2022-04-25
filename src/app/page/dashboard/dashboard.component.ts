import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { DbCrudService } from 'src/app/services/crud/db-crud.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public email:any = '';

  public profileImage:any = '';

  public data: any = [];

  constructor(private observer: BreakpointObserver, public router: Router, private crud: DbCrudService, 
    private notifications: HotToastService, private auth: AuthService) {
    }

  ngOnInit(): void {
    this.crud.getData$().subscribe( serviceData => {
      this.data = serviceData;
    }) 

    this.auth.getPicture$().subscribe( picture => {
      this.profileImage = picture;
    })

    this.profileImage = getAuth().currentUser?.photoURL;
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logout(){
    getAuth().signOut();
    this.router.navigate(['/landing']);
    this.notifications.success('Cerrado De Sesión Exitoso');
  }

  check() {
    this.crud.getData('email', String(getAuth().currentUser?.email), '/users' );
    console.log(this.profileImage);
  }
}
