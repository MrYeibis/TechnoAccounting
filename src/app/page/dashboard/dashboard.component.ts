import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { DbCrudService } from 'src/app/services/crud/db-crud.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public userAvaible: boolean = false;

  public email:any = '';
  public name: any = '';
  public surname: any = '';
  public profileImage:any = '';
  public data: any = [];
  public rank: any = "";
  public photoURLDefecto: any = "";
  public codeE: any = "";

  public employee: string = '';
  public productName: string = '';
  public amount: number = 1;
  public unitPrice: number = 1;

  public businessMoney: number = 0;

  editarFormUser = new FormGroup({
    rango: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)]))
  })

  editarFormVentas = new FormGroup({
    seller: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    unitPrice: new FormControl('', [Validators.required]),
    totalPrice: new FormControl('', [Validators.required])
  })

  editarFormCompras = new FormGroup({
    buyer: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    unitPrice: new FormControl('', [Validators.required]),
    totalPrice: new FormControl('', [Validators.required])
  })

  constructor(private observer: BreakpointObserver, public router: Router, public crud: DbCrudService, 
    private notifications: HotToastService, private auth: AuthService) {
    }

  ngOnInit(): void {

    this.crud.getData$().subscribe( serviceData => {
      this.data = serviceData;
      for(let item of this.data){
        if(this.email == ''){
          this.email = item.email
          this.name = item.name;
          this.surname = item.surname;
          this.crud.employee = item.name + ' ' + item.surname;
          this.employee = this.crud.employee;
          this.rank = item.rango;
          this.photoURLDefecto = item.photoURLDefecto;
          this.profileImage = getAuth().currentUser?.photoURL;
          this.codeE = item.codeE;
        }
      }
    }) 

    this.crud.getBusinessMoney$().subscribe( businessMoneyService => {
      this.data = businessMoneyService;
      for(let item of this.data){
        this.businessMoney = item.businessMoney;
      }
    }) 

    this.auth.newProfileImage$().subscribe( profileImage => {
      this.profileImage = profileImage;
      for(let item of this.data){
        this.photoURLDefecto = item.photoURLDefecto;
      }
    }) 

    this.crud.getData('email', String(getAuth().currentUser?.email), '/users')
    setTimeout(() => {this.crud.getBusinessMoney('/business/' + this.crud.codeE);}, 100) 
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

  changeRank(){
    this.crud.updateData(this.crud.idUser, this.editarFormUser.value, '/users');
    this.crud.getData('codeE', this.crud.codeE, '/users' );
  }

  changeSale(){
    this.crud.updateData(this.crud.id, this.editarFormVentas.value, '/business/' + this.crud.codeE + '/sells');
    setTimeout(() => {this.crud.getData('seller', this.crud.employee, '/business/' + this.crud.codeE + '/sells');}, 200)
  }

  changeBuy(){
    this.crud.updateData(this.crud.id, this.editarFormCompras.value, '/business/' + this.crud.codeE + '/buys');
    setTimeout(() => {this.crud.getData('buyer', this.crud.employee, '/business/' + this.crud.codeE + '/buys');}, 200)
  }
}
