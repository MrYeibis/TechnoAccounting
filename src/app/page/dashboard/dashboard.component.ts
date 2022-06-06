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

  eliminarFormUser = new FormGroup({
    rango: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    codeE: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)]))
  })

  editarFormVentas = new FormGroup({
    seller: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    unitPrice: new FormControl('', [Validators.required]),
    totalPrice: new FormControl('', [Validators.required])
  })

  deleteForm = new FormGroup({
    confirmation: new FormControl('', [Validators.required])
  })

  editarFormCompras = new FormGroup({
    buyer: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    unitPrice: new FormControl('', [Validators.required]),
    totalPrice: new FormControl('', [Validators.required]),
    provider: new FormControl('', [Validators.required])
  })

  constructor(private observer: BreakpointObserver, public router: Router, public crud: DbCrudService, 
    private notifications: HotToastService, public auth: AuthService) {
    }

  ngOnInit(): void {

    this.crud.getData$().subscribe( serviceData => {
      this.data = serviceData;
      for(let item of this.data){
        if(this.email == ''){
          this.crud.idDelete = item.id.id;
          console.log('ID Delete:' + this.crud.idDelete)
          this.email = item.email
          this.name = item.name;
          this.surname = item.surname;
          this.crud.employee = item.name + ' ' + item.surname;
          this.employee = this.crud.employee;
          this.rank = item.rango;
          this.crud.rank = this.rank
          this.photoURLDefecto = item.photoURLDefecto;
          this.profileImage = getAuth().currentUser?.photoURL;
          this.codeE = item.codeE;
        }
      }
    }) 

    this.auth.newProfileImage$().subscribe( profileImage => {
      this.profileImage = profileImage;
      for(let item of this.data){
        this.photoURLDefecto = item.photoURLDefecto;
      }
    }) 

    this.crud.getData('email', String(getAuth().currentUser?.email), '/users')
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
    this.auth.logout().pipe(
      this.notifications.observe({
        success: 'Sesión Finalizada Exitosamente',
        loading: 'Cerrando Sesión',
        error: 'Ha occurido un error'
      })
    ).subscribe(() => {
      this.router.navigate(['/landing'])
    });
  }

  getDataSale(){
    if(this.crud.rank == "Administrador"){
      this.crud.getAllData('/business/' + this.crud.codeE + '/sells');
    } else {
      this.crud.getData('buyer', this.crud.employee, '/business/' + this.crud.codeE + '/sells');
    }
  }

  getDataBuys(){
    if(this.crud.rank == "Administrador"){
      this.crud.getAllData('/business/' + this.crud.codeE + '/buys');
    } else {
      this.crud.getData('buyer', this.crud.employee, '/business/' + this.crud.codeE + '/buys');
    }
  }

  changeRank(){
    this.crud.updateData(this.crud.idUser, this.editarFormUser.value, '/users');
    this.crud.getData('codeE', this.crud.codeE, '/users' );
  }

  changeSale(){
    this.crud.updateData(this.crud.id, this.editarFormVentas.value, '/business/' + this.crud.codeE + '/sells');
    setTimeout(() => {this.getDataSale();}, 200)
  }

  changeBuy(){
    this.crud.updateData(this.crud.id, this.editarFormCompras.value, '/business/' + this.crud.codeE + '/buys');
    setTimeout(() => {this.getDataBuys();}, 200)
  }

  confirmationDelete() {
    if(this.deleteForm.controls['confirmation'].value == 'CONFIRMAR'){
      return false;
    } else {
      return true;
    }
  }

  deleteUser() {
    this.eliminarFormUser.controls['rango'].setValue('Eliminado');
    this.eliminarFormUser.controls['codeE'].setValue('Eliminado');
    this.crud.updateData(this.crud.idUser, this.eliminarFormUser.value, '/users');
    setTimeout(() => {this.crud.getData('codeE', this.crud.codeE, '/users');}, 200);
  }
}
