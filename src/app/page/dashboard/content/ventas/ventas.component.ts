import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbCrudService } from 'src/app/services/crud/db-crud.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  public data: any = [];

  public amount: number = 1;
  public unitPrice: number = 1;

  public employee: string = "";

  new = new FormGroup({
    billNumber: new FormControl(0, [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    unitPrice: new FormControl('', [Validators.required]),
    totalPrice: new FormControl('', [Validators.required]),
    seller: new FormControl('', [Validators.required])
  })

  editarForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)]))
  })

  constructor(public crud: DbCrudService) {}

  ngOnInit(): void {
    this.crud.getData$().subscribe( serviceData => {
      this.data = serviceData;
      console.log(this.data);
    })
    this.crud.getData('seller', this.crud.employee, '/business/' + this.crud.codeE + '/sells');
    this.employee = this.crud.employee;
  }

  addSell(){
    this.crud.addData(this.new.value, '/business/' + this.crud.codeE + '/sells')
    setTimeout(() => {this.crud.getData('seller', this.crud.employee, '/business/' + this.crud.codeE + '/sells');}, 200);
  }

  deleteSell(id:string) {
    console.log(id)
    this.crud.deleteData(id, '/business/' + this.crud.codeE + '/sells');
    setTimeout(() => {this.crud.getData('seller', this.crud.employee, '/business/' + this.crud.codeE + '/sells');}, 200);
  }

  select(id: string, productName: string, amount: number, unitPrice: number, totalPrice: number) {
    this.crud.id = id;
    this.crud.productName = productName;
    this.crud.amount = amount;
    this.crud.unitPrice = unitPrice;
    this.crud.totalPrice = totalPrice;
  }
}
