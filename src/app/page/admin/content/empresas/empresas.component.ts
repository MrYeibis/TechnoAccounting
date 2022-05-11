import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbCrudService } from 'src/app/services/crud/db-crud.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  public id: string = "";
  public name: string= "";
  public data: any = [];

  new = new FormGroup({
    name: new FormControl('', [Validators.required]),
    businessMoney: new FormControl(0)
  })

  editarForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)]))
  })

  constructor(public crud: DbCrudService) {
    this.crud.getAllData('business');
  }

  ngOnInit(): void {
    this.crud.getData$().subscribe( serviceData => {
      this.data = serviceData;
    }) 
  }

  addBusiness() {
    this.crud.addData(this.new.value, '/business');
    this.crud.getAllData('business');
    this.new.controls['name'].setValue('');
  }

  deleteBusiness(id:string) {
    this.crud.deleteData(id, '/business');
    this.crud.getAllData('business');
  }

  select(id: string, name: string){
    this.id = id;
    this.name = name;
  }

  editar(id: string){
    this.crud.updateData(id, this.editarForm.value, '/business');
    this.crud.getAllData('business');
  }
}
